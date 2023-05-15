import { createCountry, showDefaultCountries, createCountryByCode } from "./countryManager.js";

export const declareEvents = () => {
    let parent = document.querySelector("#id_parent");
    let home_btn = document.querySelector("#home_btn");
    let select_box = document.querySelector("#id_select_country");
    let search_form = document.querySelector("#id_search_form");
    let search_input = document.querySelector("#id_input");
   

    let navCountries = document.querySelectorAll("li");
    navCountries.forEach(item => {
        item.addEventListener('click', () => {
            parent.innerHTML = "";
            createCountryByCode(item.getAttribute('value'));
        });
    });


    select_box.addEventListener("change", () => {
        if (select_box.value != "0") {

            parent.innerHTML = "";
            createCountry(select_box.value);
            search_input.value = select_box.value;
        }
    })

    search_form.addEventListener("submit", e => {
        e.preventDefault();
        createCountry(search_input.value);
    })


    home_btn.addEventListener("click", () => {
        parent.innerHTML = "";
        showDefaultCountries();
    })





}
