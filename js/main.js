let inputValue = '';
const EMPTY = "";

const navbar = document.getElementById('navbar');
const openMenu = document.getElementById('open-menu');
const form = document.getElementById('form');
const input = document.getElementById('input');
const shortenItBtn = document.getElementById('shorten-it');
const inputEmpty = document.getElementById('input-empty');

let linksList = document.getElementById('links-list');

openMenu.addEventListener("click", () => {
    navbar.classList.toggle('active');
})

form.addEventListener("submit", e => {
    e.preventDefault();
})

input.addEventListener("input", () => {
    inputValue = input.value;
    if(inputValue === EMPTY) {
        shortenItBtn.disabled = true;
        input.classList.remove('grayish-violet'); 
        inputEmpty.classList.add('active');
    } else {
        shortenItBtn.disabled = false;
        input.classList.add('grayish-violet');
        inputEmpty.classList.remove('active');
    } 
})

shortenItBtn.addEventListener("click", () => {
    linksList.classList.add('active');
    showShortLinks(inputValue);
    input.value = EMPTY;
})

const showShortLinks = async inputValue => {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${inputValue}`);
    const data = await response.json();

    const linksData = data;
    
    if(linksData.ok){
        linksList.innerHTML = `
                            <li class="result">
                                <a class="original-link" href="${linksData.result.original_link}" target="_blank">${linksData.result.original_link}</a>
                                <div class="container-link-button">
                                    <a class="short-link" href="${linksData.result.full_short_link}" target="_blank">${linksData.result.short_link}</a>
                                    <div class="container-shorten__button">
                                        <button class="copy">Copy</button>
                                    </div>
                                </div>
                            </li>
                            <li class="result">
                                <a class="original-link" href="${linksData.result.original_link}" target="_blank">${linksData.result.original_link}</a>
                                <div class="container-link-button">
                                    <a class="short-link" href="${linksData.result.full_short_link2}" target="_blank">${linksData.result.short_link2}</a>
                                    <div class="container-shorten__button">
                                        <button class="copy">Copy</button>
                                    </div>
                                </div>
                            </li>
                            <li class="result">
                                <a class="original-link" href="${linksData.result.original_link}" target="_blank">${linksData.result.original_link}</a>
                                <div class="container-link-button">
                                    <a class="short-link" href="${linksData.result.full_short_link3}" target="_blank">${linksData.result.short_link3}</a>
                                    <div class="container-shorten__button">
                                        <button class="copy">Copy</button>
                                    </div>
                                </div>
                            </li>
                        `;

                        let copyBtns = document.querySelectorAll(".copy");

                        copyBtns.forEach((copyBtn, index) => {
                            copyBtn.addEventListener("click", event => {
                                copyBtns.forEach(btn => {
                                    btn.textContent = "Copy";
                                    btn.classList.remove('background-clicked');
                                })
                                event.target.textContent = "Copied!";
                                event.target.classList.add('background-clicked');
                                

                                // Copiado de links seleccionados en el portapapeles
                                const shortLinks = [linksData.result.full_short_link, linksData.result.full_short_link2, linksData.result.full_short_link3];

                                const shortLinkToCopy = shortLinks[index];

                                const tempText = document.createElement("textarea");      // Se crea un elemento de texto temporal para almacenar el link en el portapapeles
                                tempText.value = shortLinkToCopy;
                                document.body.appendChild(tempText);                      // Se agrega unicamente el elemento textarea con su valor correspondiente al documento HTML
                                tempText.select();                                        // Se selecciona el elemento que se encuentra en textarea (link seleccionado)
                                document.execCommand("copy");                             // Se copia el texto seleccionado al portapapeles
                                document.body.removeChild(tempText);                      // Se elimina unicamente el elemento temporal textarea
                            })
                        });
    } else {
        linksList.innerHTML = `
                                <li class="result">
                                    <p class="original-link">${linksData.error}</p>
                                </li>
                            `;
    }
    input.classList.remove('grayish-violet');
    inputEmpty.classList.add('active');
}

