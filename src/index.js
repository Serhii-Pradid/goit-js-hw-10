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
      //console.log(countryValue)
  
  fetchCountries(countryValue)
  .then(country => {
    console.log(country);
    if(country.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name."
        );
        return;
    }
createCounrtyList(country);
})
.catch(error => {
    Notify.failure("Oops, there is no country with that name")
    console.log(error);
})
}

const createCounrtyList = data => {
    return data.map(
        ({ flags, name }) => 
    `<li><img src="${flags.svg}" alt="${name.official}">${name.official}</li>`
    )
    .join("");
};


//const createCountryInfo