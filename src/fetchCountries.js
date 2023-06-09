

export const fetchCountries = countryName =>  {

const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;

return fetch(url).then(response => {
    //console.log(response)

    if(!response.ok) {
        throw new Error(response.status);
    }
    return response.json();
 })
};
