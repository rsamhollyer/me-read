let currentPathname = window.location.pathname
console.log (currentPathname);
let sortButtons = document.querySelectorAll("[data-sort]")

sortButtons.forEach(button =>{
    if(button.getAttribute("href") === currentPathname){
        button.classList.add("active")
    }
})