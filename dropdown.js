console.log("running");

window.addEventListener("load", () => {
    let toggler = document.getElementsByClassName("caret");

    for (let i = 0; i < toggler.length; i++) {
        console.log(i);
        toggler[i].addEventListener("click", function() {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        });
    }
});