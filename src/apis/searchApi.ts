import axios from "axios";


const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        acces_token: 'pk.eyJ1IjoibXllcmJlcyIsImEiOiJjbHBxMG51aDgxZGFiMnZwNnVmaTl1OXUyIn0.wbf54OZTKuz_WK6WesEwBA',
    }
});


export default searchApi;
