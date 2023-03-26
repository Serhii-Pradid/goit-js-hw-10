import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list')
const countryWrapperEl = document.querySelector('.country-info');


searchForm.addEventListener('input' , onInputCountryName)

  function onInputCountryName(event) {
      
      const countryValue = event.target.value.trim();
      console.log(countryValue)
  
  fetchCountries(countryValue)
        }