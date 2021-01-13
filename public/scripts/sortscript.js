let currentPathname = window.location.pathname
let sortButtons = document.querySelectorAll("[data-sort]")

sortButtons.forEach(button =>{
    if(button.getAttribute("href") === currentPathname){
        button.classList.add("active")
    }
})