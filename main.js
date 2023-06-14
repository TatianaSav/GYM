// Empty list for URL of images
let urls = [];

// Checkin if list isn't empty
if (localStorage.getItem("images")) {
    urls = JSON.parse(localStorage.getItem("images"));
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
    // Looping in the list and generate images
    for (let url of urls) {
        displayImage(url);
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

    const index = urls.indexOf(url);
    if (index > -1) { // only splice array when item is found
        urls.splice(index, 1); // 2nd parameter means remove one item only
    }
    localStorage.setItem("images", JSON.stringify(urls));
}
// Add image and save in the LocalStorage
function addImage() {
    const imgUrl = document.getElementById('AddPicture').value;

    // Save new image url to LocalStorage
    urls.push(imgUrl);
    localStorage.setItem("images", JSON.stringify(urls));

    // Create image based on user's input
    displayImage(imgUrl);
}


// Adding images by url in input
function displayImage(url) {
    const container = document.getElementById('picture-container');

    // Creating elements for support new pictures
    let columnElement = document.createElement('div');
    columnElement.classList.add('col-12', 'col-md-6', 'col-lg-3');
    columnElement.id = Math.random().toString(16).slice(2);

    let pictureElement = document.createElement('div');
    pictureElement.classList.add('picture');
    pictureElement.style.backgroundImage = `url(${url})`;
    columnElement.appendChild(pictureElement);

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
}

