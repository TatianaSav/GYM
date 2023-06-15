// Empty list of objects for URL and labels  of images
let photos = [];

// Checkin if list isn't empty
const data = load();
if (data) {
    photos = JSON.parse(data);
}

// listen for load event in the window
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
    // Looping in the list and generate images and labels
    for (let car of photos) {
        displayImage(car.label, car.url);
    }
});

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// When click on the button "Delete" the img will be deleted
function deletePhoto(parentId, url) {
    let elem = document.getElementById(parentId);
    elem.remove();

    photos = photos.filter(item => item.url !== url);
    save();
}

// Add image with label and save in the LocalStorage
function addImage() {
    const imgUrl = document.getElementById('AddPicture').value;
    const imgLabel = document.getElementById('imgLabel').value;

    // Stop add image if input is empty
    if (!imgUrl.trim()) {
       return;
    }

    // Save new image url with label to LocalStorage.
    const photo = {
        url: imgUrl,
        label: imgLabel,
    }
    photos.push(photo);
    save();

    // Create image with label based on user's input
    displayImage(photo.label, photo.url);
}


// Adding images by url and label
function displayImage(label, url) {
    const container = document.getElementById('picture-container');

    // Creating elements for support new pictures
    let columnElement = document.createElement('div');
    columnElement.classList.add('col-12', 'col-md-6', 'col-lg-3');
    columnElement.id = Math.random().toString(16).slice(2);

    let pictureElement = document.createElement('div');
    pictureElement.classList.add('picture');
    pictureElement.style.backgroundImage = `url(${url})`;
    columnElement.appendChild(pictureElement);

    let labelElement = document.createElement('p');
    labelElement.classList.add('text-center');
    labelElement.innerText = label;
    columnElement.appendChild(labelElement);

    let buttonElement = document.createElement('button');
    buttonElement.classList.add('btn', 'btn-dark', 'btn-custom', 'mt-2');
    buttonElement.onclick = function () {
        deletePhoto(columnElement.id, url);
    };
    buttonElement.innerText = "X";
    pictureElement.appendChild(buttonElement);


    // Put the new image at the top of the list
    container.insertBefore(columnElement, container.firstChild);

    // After executing the request, I remove the url from the input
    document.getElementById('AddPicture').value = "";

    // After executing the request, I remove the label from the input
    document.getElementById('imgLabel').value = "";
}
// Save URl in Local Storage
function save() {
  localStorage.setItem("images", JSON.stringify(photos));
}

// load URl in Local Storage
function load() {
    return localStorage.getItem("images");
}

