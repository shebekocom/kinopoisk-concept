// version with Promise

const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=942cf276adefa306549de647ce5a6e18&language=ru&query=' + searchText;
    movie.innerHTML = 'Загрузка';

    fetch(server)
        .then(function(value){
            return value.json();
        })
        .then(function(output){
             let inner = '';
            output.results.forEach(function (item) {
                let nameItem = item.name || item.title;
                let dateItem = item.first_air_date || item.release_date;
                inner += '<div class="col-5">' + nameItem + '</div>';
                inner += '<div class="alert alert-primary" role="alert"> Дата релиза: ' + dateItem + '</div>';
            });
            movie.innerHTML = inner;
        })
        .catch(function(reason){
            movie.innerHTML = 'Упс, что то пошо не так!';
            console.log('error: ' + reason.status);
        });
    
}

searchForm.addEventListener('submit', apiSearch);

