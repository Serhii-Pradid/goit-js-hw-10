import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import {fetchCountries} from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list')
const countryWrapperEl = document.querySelector('.country-info');

searchForm.addEventListener('input' , debounce(onInputCountryName, DEBOUNCE_DELAY));

  function onInputCountryName(event) {
           const countryValue = event.target.value.trim();
      
      if(countryValue === '') {
        countryListEl.innerHTML = '';
        countryWrapperEl.innerHTML = '';
      }
    
  
  fetchCountries(countryValue)
  .then(country => {
    console.log(country);
    if(country.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name."
        );
        return;
    }
createMarkup(country);
})
.catch(error => {
    Notify.failure("Oops, there is no country with that name")
    console.log(error);
})
}



function createMarkup(data) {
if(data.length === 1) {
    const markupInfo = createCountryInfo(data);
    countryWrapperEl.innerHTML = markupInfo;
    countryListEl.innerHTML = '';
} else {
    const markupList = createCounrtyList(data);
    countryListEl.innerHTML = markupList;
    countryWrapperEl.innerHTML = '';
}
};

function createCounrtyList(data) {
    return data.map(
        ({ flags, name }) => 
        `<li><img src="${flags.svg}" alt="${name.official}">${name.official}</li>`
    )
    .join("");
};

function createCountryInfo(data) {
    return data.map(
      ({ flags, name, capital, population, languages }) => 
     `<div class = "field">
     <h1>
     <img src="${flags.svg}" alt="${name.official}">${name.official}
     </h1>
      <p><span class = "title">Capital:</span>${capital}</p>
      <p><span class = "title">Population:</span>${population}</p>
      <p><span class = "title">Languages:</span>${Object.values(languages)}</p>
      </div>`
    )
};


