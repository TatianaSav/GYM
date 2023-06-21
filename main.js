// Empty list of objects for ID and Name of albums.
let albums = [];

// Empty list of objects for URL, labels and AlbumID of images.
let photos = [];

// Checkin if list of pictures isn't empty.
const dataImg = loadPictures();
if (dataImg) {
    photos = JSON.parse(dataImg);
}

// Checkin if list of albums isn't empty.
const dataAlbum = loadAlbums();
if (dataAlbum) {
    albums = JSON.parse(dataAlbum);
}

// listen for load event in the window.
window.addEventListener("load", function () {
    console.log("Everything is loaded");

    let fabElement = document.getElementById("myBtn");

    window.addEventListener("scroll", function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            fabElement.style.display = "block";
        } else {
            fabElement.style.display = "none";
        }
    });
    // Looping in the list and generate images and labels.
    for (let photo of photos) {
        photo.date = new Date(photo.date)
        displayImage(photo);
    }

    // Looping in the list and generate albums.
    for (let album of albums) {
        displayAlbum(album);
    }
});

// When the user clicks on the button, scroll to the top of the document.
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// When click on the button "X" the image will be deleted.
function deletePhoto(parentId, id) {
    let elem = document.getElementById(parentId);
    elem.remove();

    photos = photos.filter(photo => photo.id !== id);
    savePictures();
}

// When click on the button "X" the album will be deleted.
function deleteAlbum(id) {
    let albumElem = document.getElementById(id);
    albumElem.remove();

    albums = albums.filter(album => album.id !== id);
    saveAlbums();
}

// Add image with label and save in the LocalStorage.
function onSubmit() {
    const url = document.getElementById('add-picture').value;
    const label = document.getElementById('imgLabel').value;
    const albumId = document.getElementById('album-selector').value;

    // Stop add image if input is empty.
    if (!url.trim()) {
        return;
    }

    // Check if image has error, then use default image.
    const img = new Image();
    img.src = url;

    // If image loaded successfully continue.
    img.onload = function () {
        addImage(label, url, albumId);
    };

    // If image had error then set default local image.
    img.onerror = function () {
        addImage(label, './assets/img/default.png', albumId);

    };
}

function addImage(imgLabel, imgUrl, albumId) {
    // Save new image url with label to LocalStorage.
    const photo = {
        url: imgUrl,
        label: imgLabel,
        albumId: albumId,
        date: new Date(),
        id: Math.random().toString(16).slice(2),
    }

    photos.push(photo);
    savePictures();

    // Create image with label based on user's input.
    displayImage(photo);

}

// Add album and save in the LocalStorage.
function onCreate() {
    const name = document.getElementById('album-name').value;

    // Stop add album if input is empty.
    if (!name.trim()) {
        return;
    }
    // Save new album to LocalStorage.
    const album = {
        name: name,
        id: Math.random().toString(16).slice(2),
    }

    albums.push(album);
    saveAlbums();

    // Create image with label based on user's input.
    displayAlbum(album);
}

// Adding images by url and label.
function displayImage(photo) {
    const container = document.getElementById('picture-container');

    // Creating elements for support new pictures.
    let columnElement = document.createElement('div');
    columnElement.classList.add('col-12', 'col-md-6', 'col-lg-3');
    columnElement.id = Math.random().toString(16).slice(2);

    let pictureElement = document.createElement('div');
    pictureElement.classList.add('picture');
    pictureElement.style.backgroundImage = `url(${photo.url})`;
    columnElement.appendChild(pictureElement);

    let labelElement = document.createElement('p');
    labelElement.classList.add('text-center');
    labelElement.innerText = photo.label;
    columnElement.appendChild(labelElement);

    let dateElement = document.createElement('p');
    dateElement.classList.add('text-center');
    dateElement.innerText = photo.date.toDateString();
    columnElement.appendChild(dateElement);

    let buttonElement = document.createElement('button');
    buttonElement.classList.add('btn', 'btn-dark', 'btn-custom', 'mt-2');
    buttonElement.onclick = function () {
        deletePhoto(columnElement.id, photo.id);
    };
    buttonElement.innerText = "X";
    pictureElement.appendChild(buttonElement);

    // Put the new image at the top of the list.
    container.insertBefore(columnElement, container.firstChild);

    // After executing the request, I remove the url from the input.
    document.getElementById('add-picture').value = "";

    // After executing the request, I remove the label from the input.
    document.getElementById('imgLabel').value = "";
}

// Adding albums by name.
function displayAlbum(album) {
    const containerAlbums = document.getElementById('albums-container');

    // Creating elements for support new albums.
    let columnAlbumElement = document.createElement('div');
    columnAlbumElement.classList.add('col-12', 'col-md-6', 'col-lg-3');
    columnAlbumElement.id = album.id;

    let pictureAlbumElement = document.createElement('div');
    pictureAlbumElement.classList.add('picture');
    pictureAlbumElement.style.backgroundImage = `url(./assets/img/folder.png)`;
    pictureAlbumElement.onclick = function () {
        showAlbumPhotos(album.id);
    };
    columnAlbumElement.appendChild(pictureAlbumElement);

    let nameElement = document.createElement('p');
    nameElement.classList.add('text-center');
    nameElement.innerText = album.name;
    columnAlbumElement.appendChild(nameElement);

    let buttonAlbumElement = document.createElement('button');
    buttonAlbumElement.classList.add('btn', 'btn-dark', 'btn-custom', 'mt-2');
    buttonAlbumElement.onclick = function () {
        deleteAlbum(columnAlbumElement.id);
    };
    buttonAlbumElement.innerText = "X";
    pictureAlbumElement.appendChild(buttonAlbumElement);

    // Put the new album at the top of the list.
    containerAlbums.insertBefore(columnAlbumElement, containerAlbums.firstChild);

    // After executing the request, I remove the url from the input.
    document.getElementById('album-name').value = "";

    addOptions(album);
}

// Save URl in Local Storage.
function savePictures() {
    localStorage.setItem("images", JSON.stringify(photos));
}

// load URl in Local Storage.
function loadPictures() {
    return localStorage.getItem("images");
}

// Save URl in Local Storage.
function saveAlbums() {
    localStorage.setItem("albums", JSON.stringify(albums));
}

// load URl in Local Storage.
function loadAlbums() {
    return localStorage.getItem("albums");
}

// Adding albums options into the selector.
function addOptions(album) {
    let x = document.getElementById("album-selector");
    let option = document.createElement("option");
    option.value = album.id;
    option.text = album.name;
    x.add(option);
}

// Show photos for clicked album.
function showAlbumPhotos(albumId) {

    // Clear the display.
    const container = document.getElementById('picture-container');
    container.innerHTML = '';

    // Filter all photos by album ID.
    let albumPhotos = photos.filter(function (photo) {
        return photo.albumId === albumId;
    });

    // Generate filtered photos.
    for (let photo of albumPhotos) {
        displayImage(photo);
    }
}

// Show all photos
function showAll() {
    // Clear the display.
    const container = document.getElementById('picture-container');
    container.innerHTML = '';

    for (let photo of photos) {
        displayImage(photo);
    }
}



