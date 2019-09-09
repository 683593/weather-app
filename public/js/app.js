console.log("Client Side JS LOADED!!")
let searchform = document.querySelector('form');
let search = document.querySelector('input')
searchform.addEventListener('submit', (e) => {
    let renderContent = "";
    let container = document.getElementById('contents');
    container.innerHTML = "";
    e.preventDefault();
    console.log(search.value);
    if (!search.value) return;
    renderContent = "Loading...";
    console.log("Form Submit hit");
    container.innerHTML = "<p>" + renderContent + "</p>"
    fetch('/api/forcast/' + search.value).then(response => {
        response.json().then(data => {
            if (data.error) {
                container.innerHTML = "<p>" + data.error + "</p>"
                console.log(data.error)
            } else {
                container.innerHTML = "<pre>" + JSON.stringify(data.reports) + "</pre>"
                console.log(data)
            }
        })
    })
});