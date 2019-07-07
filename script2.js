// version with Promise

const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=942cf276adefa306549de647ce5a6e18&language=ru&query=' + searchText;
    movie.innerHTML = 'Загрузка';
    requestApi(server)
        .then(function (result) {
            const output = JSON.parse(result);
            let inner = '';
            output.results.forEach(function (item) {
                let nameItem = item.name || item.title;
                let dateItem = item.first_air_date || item.release_date;
                inner += '<div class="col-5">' + nameItem + '</div>';
                inner += '<div class="alert alert-primary" role="alert"> Дата релиза: ' + dateItem + '</div>';
            });
            movie.innerHTML = inner;
            console.log(output);
        })
        .catch();
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(url) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.open('GET', url);

        request.addEventListener('load', function () {
            if (request.status !== 200) {
                reject({
                    status: request.status
                });
                return;
            }
            resolve(request.response);
        });
        request.addEventListener('error', function () {
            reject({
                status: request.status
            });
        });
        request.send();
    });
}