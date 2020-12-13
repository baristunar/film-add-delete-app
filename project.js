// Selecting elements

const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

//Starting UI Object


const ui = new UI();

const storage = new Storage();

eventListeners();


function eventListeners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function () {
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });
    cardBody.addEventListener("click", deleteFilm);

    clear.addEventListener("click", clearAllFilms);
}





function addFilm(e) {
    const title = titleElement.value.trim();
    const director = directorElement.value.trim();
    const url = urlElement.value;
    const films = storage.getFilmsFromStorage();
    const filmExists = films.filter(film => film.title === title)
    


    if (title === "" || director === "" || url === "") {

        ui.displayMessages("Tüm Alanları Doldurun", "danger");

    }
    else if (filmExists != false){

        ui.displayMessages("Film önceden kaydedilmiş.", "danger");
    }


    else {
        const newFilm = new Film(title, director, url);
        ui.addFilmToUI(newFilm); // Adding films to UI
        storage.addFilmToStorage(newFilm);
        ui.displayMessages("Film Eklendi", "success")
    }

    ui.clearInputs(titleElement, urlElement, directorElement);

    e.preventDefault();
}



function deleteFilm(e) {


    if (e.target.id === "delete-film") {
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme İşlemi Başarılı", "success");
    }
}

function clearAllFilms() {
    if (confirm("Tüm Filmleri Silmek İstediğinizden Emin misiniz?")) {
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }

}