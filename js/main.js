const navbar = document.getElementById('navbar');
const openMenu = document.getElementById('open-menu');

openMenu.addEventListener('click', () => {
    navbar.classList.toggle('active');
})