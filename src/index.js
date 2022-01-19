import './css/styles.css';
import {fetchCountries} from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', onInput);

function onInput(evt) {
    if (!evt.currentTarget.value) {
        list.innerHTML = '';
        countryInfo.innerHTML = '';
        return
    }

    fetchCountries(evt.currentTarget.value).then((data) => {
        markupList(data);
    }).catch((e) => { 
        console.log('404')
    });
}

function markupList(data) {
    if (data.length > 10) {
        return console.log("Пиши еще")
    }

    if (data.length === 1) {
        const markup = data.map((country) =>  `
        <h1>
        <img class = "main-svg" src = "${country.flags.svg}"/>${country.name.common}
        </h1>
        <ul class = "main-list">
        <li>Capital: ${country.capital}</li>
        <li>Population: ${country.population}</li>
        <li>Languages: ${Object.values(country.languages).join(', ')}</li>
        </ul>
        `);

        countryInfo.innerHTML = markup;
        list.innerHTML = '';
        return;
    }

    const markup = data.map((country) => `<li class = "country"><img class = "svg" src = "${country.flags.svg}"/> ${country.name.common}</li>`).join('');
    list.innerHTML = markup;
    countryInfo.innerHTML = '';
}




