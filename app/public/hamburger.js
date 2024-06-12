



function toggleNav() { 
    let links = document.getElementById("navbar");
    links.classList.toggle("hideNav");
    console.log(links);
    
}
    
    
let hamburger = document.getElementById("hamburger");
hamburger.addEventListener('click',toggleNav);
