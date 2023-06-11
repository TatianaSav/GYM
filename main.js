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
    })
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