

export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages `).
        then((resp) => {
            if (!resp.ok) {
                return 404;
            }
            return resp.json()
        }).
        catch((error) => console.log(error));
}
