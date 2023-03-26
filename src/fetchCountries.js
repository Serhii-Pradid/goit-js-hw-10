

function fetchCountries (countryName)  { 

const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;

return fetch(url).then(response => {
    console.log(response.json())

    if(!response.ok) {
        throw new Error(response.status);
    }

    return response.json();
 })
.then(country => {
    console.log(country)
})
.catch(error => {
    console.log(error);
})
}

export default { fetchCountries }