let urlVary = window.location.pathname

let sortButtons = document.querySelectorAll("[data-sort]")

sortButtons.forEach(button =>{
    if(button.getAttribute("href") === urlVary){
        button.classList.add("active")
    }
})