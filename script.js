const navBtns = document.getElementsByClassName("scroll-link");
const scrollElements = document.getElementsByClassName("scroll-element");

for (let i=0; i<navBtns.length; i++) {
    navBtns[i].addEventListener('click', function (e) {
        e.preventDefault();
        scrollToElement(i);
    });
}

function scrollToElement(instance) {
    if (scrollElements.length > instance) {
        scrollElements[instance].scrollIntoView({ behavior: "smooth"});
    }
    console.log(scrollElements[instance]);
}