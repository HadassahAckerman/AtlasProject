import { createCountry, getCountriesArr,createSelectList,showDefaultCountries } from "./countryManager.js";
import { declareEvents } from "./declareEvents.js";

const init = () => {
    doApi();
     declareEvents();
}



const doApi = async () => {
    let url = "https://restcountries.com/v3.1/all";
    let resp = await fetch(url);
    console.log(resp);
    let data= await resp.json();
    console.log(data);
    getCountriesArr(data);
    createSelectList();
    showDefaultCountries();
}


init();
