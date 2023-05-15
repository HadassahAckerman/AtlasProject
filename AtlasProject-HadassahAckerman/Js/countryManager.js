import Country from "./countryModule.js";
let countries_arr = [];
const defaultCountries_arr = [
    "israel",
    "united states",
    "france",
    "united kingdom",
    "thailand",
];

export const getCountriesArr = (_data) => {
    countries_arr = _data;
    sortToLowerCase();

}

const sortToLowerCase = () => {
    countries_arr.sort(function (a, b) {
        let x = a.name.common.toLowerCase();
        let y = b.name.common.toLowerCase();
        if (x < y) {
            return -1;
        }
        if (x > y) {
            return 1;
        }
        return 0;
    });
}

export const createCountry = (_input) => {
    document.querySelector("#id_parent").innerHTML = "";

    let arr = countries_arr.filter((item) =>
        item.name.common.toLowerCase().includes(_input.toLowerCase())
    );
    if (arr.length > 0) {
        arr.forEach((item) => {
            let country = new Country("#id_parent", item, showDefaultCountries, getCountryByCode, createCountryByCode);
            country.preRender();
        });
    } else {
        document.querySelector("#id_parent").innerHTML = `<h2 class="text-white" style="font-family: 'Quicksand', sans-serif;">Country ${_input} is  not found </h2>`;
    }

    document.querySelector("#id_load").classList.add("d-none");
    if (arr[0] != null) { return arr[0].name.common }
}


export const createSelectList = () => {
    let selectList = document.querySelector("#id_select_country");
    countries_arr.forEach((item) => {
        selectList.innerHTML += `
      <option value="${item.name.common}">${item.name.common}</option>`;
    });
};


export const showDefaultCountries = () => {
    document.querySelector("#id_load").classList.add("d-none");
    let arr = [];
    arr = countries_arr.filter((item) =>
        defaultCountries_arr.includes(item.name.common.toLowerCase())
    );
    console.log("default countries", arr)
    arr.forEach((item) => {
        let country = new Country("#id_parent", item, showDefaultCountries, getCountryByCode,createCountryByCode);
        country.preRender();
    });
};


export const getCountryByCode = async (_country_code) => {
    let url = `https://restcountries.com/v3.1/alpha/${_country_code}`;
    let resp = await fetch(url);
    console.log(resp);
    let data = await resp.json();
    console.log(data);
    return data[0].name.common;
}


export const createCountryByCode=(_country_code)=>{
    document.querySelector("#id_parent").innerHTML = "";
  
    let arr = countries_arr.filter((item) =>
      item.cca3.toLowerCase().includes(_country_code.toLowerCase())
    );
    if (_country_code === "" || _country_code === " ") {
      alert("There isn't code to this country");
    } else if (arr.length > 0) {
      arr.forEach((item) => {
        let country = new Country("#id_parent", item, showDefaultCountries, getCountryByCode, createCountryByCode);
        country.render();
      });
    } else {
      document.querySelector("#id_parent").innerHTML = `<h2 class="text-white" style="font-family: 'Quicksand', sans-serif;">The Country ${_country_code} is not found </h2>`;
    }
    document.querySelector("#id_load").classList.add("d-none");
  };



  