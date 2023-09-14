const navbar = document.getElementById('navbar');
const openMenu = document.getElementById('open-menu');
const form = document.getElementById('form');
const input = document.getElementById('input');
const shortenItBtn = document.getElementById('shorten-it');
let linksList = document.getElementById('links-list');

let inputValue = '';

openMenu.addEventListener("click", () => {
    navbar.classList.toggle('active');
})

form.addEventListener("submit", e => {
    e.preventDefault();
})

input.addEventListener("input", () => {
    inputValue = input.value;
    console.log(inputValue);
})

shortenItBtn.addEventListener("click", () => {
    linksList.classList.add('active');
    showShortLinks(inputValue);
    input.value = "";
})

const showShortLinks = async inputValue => {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${inputValue}`);
    const data = await response.json();

    const linksData = data;
    console.log(linksData);

    linksList.innerHTML = `
                            <li class="result">
                                <a class="original-link" href="${linksData.result.original_link}" target="_blank">${linksData.result.original_link}</a>
                                <div class="container-link-button">
                                    <a class="short-link" href="${linksData.result.full_short_link}" target="_blank">${linksData.result.short_link}</a>
                                    <div class="container-shorten__button">
                                        <button class="button copy">Copy</button>
                                    </div>
                                </div>
                            </li>
                            <li class="result">
                                <a class="original-link" href="${linksData.result.original_link}" target="_blank">${linksData.result.original_link}</a>
                                <div class="container-link-button">
                                    <a class="short-link" href="${linksData.result.full_short_link2}" target="_blank">${linksData.result.short_link2}</a>
                                    <div class="container-shorten__button">
                                        <button class="button copy">Copy</button>
                                    </div>
                                </div>
                            </li>
                            <li class="result">
                                <a class="original-link" href="${linksData.result.original_link}" target="_blank">${linksData.result.original_link}</a>
                                <div class="container-link-button">
                                    <a class="short-link" href="${linksData.result.full_short_link3}" target="_blank">${linksData.result.short_link3}</a>
                                    <div class="container-shorten__button">
                                        <button class="button copy">Copy</button>
                                    </div>
                                </div>
                            </li>
                        `;
}