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
});

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// When click on the button "Delete" the img will be deleted
function deletePhoto(id) {
    let elem = document.getElementById(id);
    elem.remove();
}

//Adding images by url in input
function displayImage() {
    const container = document.getElementById('picture-container');

    // Get the URL input from user
    const imgUrl = document.getElementById('AddPicture').value;

    //Creating elements for support new pictures
    let columnElement = document.createElement('div');
    columnElement.classList.add('col-12', 'col-md-6', 'col-lg-3');
    columnElement.id = String(new Date().getTime());

    let pictureElement = document.createElement('div');
    pictureElement.classList.add('picture');
    pictureElement.style.backgroundImage = `url(${imgUrl})`;
    columnElement.appendChild(pictureElement);

    let buttonElement = document.createElement('button');
    buttonElement.classList.add('btn', 'btn-dark', 'btn-custom', 'mt-2');
    buttonElement.onclick = function () {
        deletePhoto(columnElement.id);
    };
    buttonElement.innerText = "X";
    pictureElement.appendChild(buttonElement);

    //Put the new image at the top of the list
    container.insertBefore(columnElement, container.firstChild);

    //After executing the request, I remove the url from the input
    document.getElementById('AddPicture').value = "";
}


