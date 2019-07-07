const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
function apiSearch(event){
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=942cf276adefa306549de647ce5a6e18&language=ru&query=' + searchText;
    requestApi(server);
}
searchForm.addEventListener('submit', apiSearch);
function requestApi(url){
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;
        if (request.status !== 200){
            console.log('error: ' + request.status);
            return;
        }
        const output = JSON.parse(request.responseText);
        let inner = '';

        output.results.forEach(function(item){
            let nameItem = item.name || item.title;
            let dateItem = item.release_date;
            inner += '<div class="col-5">' + nameItem + '</div>';
        })

        inner += '<div class="col-5"> Дата следующего релиза:<br> ' + output.results[output.results.length-1].release_date + '</div >';
        movie.innerHTML = inner;
        console.log(output);
    });
}