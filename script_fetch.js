// version with Promise

const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    if(searchText.trim().length === 0) {
        movie.innerHTML = '<h2 class="col-12 text-center text-danger">Поле поиска не должно быть пустым</h2>';
        return
    }
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=942cf276adefa306549de647ce5a6e18&language=ru&query=' + searchText;
    movie.innerHTML = '<div class="spinner"></div>';

    fetch(server)
        .then(function(value){
            if(value.status !==200){
                return Promise.reject(new Error(value.status));
            }
            return value.json();
        })
        .then(function(output){
             let inner = '';
            output.results.forEach(function (item) {
                let nameItem = item.name || item.title;
                let dateItem = item.first_air_date || item.release_date;
                const poster = item.poster_path ? urlPoster + item.poster_path : './img/noposter.png';
                 inner += `
                 <div class="col-12 col-md-6 col-xl-3 item">
                 <img src="${poster}" class="img_poster" alt="${nameItem}">
                 <p>${nameItem}</p>
                    <div class="alert alert-primary" role="alert">
                    Дата релиза: </br>${dateItem}
                    </div>
                 </div>`;
            });
            movie.innerHTML = inner;
        })
        .catch(function(reason){
            movie.innerHTML = 'Упс, что то пошо не так!';
            console.error('error: ' + reason);
        });
    
}

searchForm.addEventListener('submit', apiSearch);