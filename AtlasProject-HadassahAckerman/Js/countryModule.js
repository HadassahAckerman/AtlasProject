export default class Country {
    constructor(_parent, _item, showDefaultCountries, getCountryByCode, createCountryByCode) {
        this.showDefaultCountries = showDefaultCountries;
        this.getCountryByCode = getCountryByCode;
        this.createCountryByCode = createCountryByCode;

        this.parent = _parent;
        this.name = _item.name.common;
        this.pop = `${(Math.floor((_item.population / 1000000) * 100) / 100).toLocaleString()}M`;
        this.capital = _item.capital ? _item.capital : "none";
        this.flag = _item.flags.png;
        this.languages = _item.languages ? Object.values(_item.languages).join() : "none";
        this.region = _item.region;
        this.coin = _item.currencies? (Object.keys(_item.currencies)) + ", " + Object.values(Object.values(_item.currencies)[0])[0]: "none";
        this.borders = _item.borders;
        //latitude&longitude - קווי רוחב ואורך במעלות
        this.lat = _item.latlng[0];
        this.lon = _item.latlng[1];


    }


    preRender() {
        let myDiv = document.querySelector(this.parent);
        myDiv.className = "row row-cols-lg-3 row-cols-md-2 justify-content-around";
        let countryDiv = document.createElement("div");
        countryDiv.className = "d-flex justify-content-center my-3 text-center";

        myDiv.append(countryDiv);
        countryDiv.innerHTML += `
        <div class="card preBox h-100"  data-aos="zoom-in-up" data-aos-duration="1500">
        <img src="${this.flag}" class="card-img-top preImg shadow" width="100%" alt="${this.name}">
        <div class="card-body">
        <p class="countryP card-text countryCard-text m-0 p-3"> ${this.name} </p>
        </div>
        </div>
        `;
        countryDiv.querySelector(".preBox").addEventListener("click", () => {
            document.querySelector("#id_parent").innerHTML = "";
            this.render();
        });


    }

    render() {

        let myDiv = document.querySelector(this.parent);
        myDiv.className =" ";
        let countryDiv = document.createElement("div");
        myDiv.append(countryDiv);

        countryDiv.innerHTML = `
        
        <div class="card bigbox" data-aos="zoom-out-down" data-aos-duration="1000">
        <div class="card-body countryCard-body d-md-flex p-0 justify-content-lg-between">
        <div class="card-text restCardBody bg-dark">
        <h1 class="card-header countryCard-header text-center">${this.name}</h1>
        <p class="card-text countryCard-text">Population : ${this.pop}</p>
        <p class="card-text countryCard-text">Region : ${this.region} </p>
        <p class="card-text countryCard-text">languages : ${this.languages} </p>
        <p class="card-text countryCard-text">Coin : ${this.coin} </p>

        <p class="card-text countryCard-text">Capital : ${this.capital} </p>
        <p class="card-text countryCard-text" id="id_borders"> My borders : </p>
        <button id="home_btn" class="btn btn-light my-3 ms-2">Back  
        <i class="fa fa-globe" aria-hidden="true"></i>
        </button>
        <div class="flagImg">
        <img src="${this.flag} " alt="${this.name}" style="width: 100%; height: 100%;">
        </div>
        </div>

        <div class="restCardBody">
        <div class="countryMap">
                  <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                  src="https://maps.google.com/maps?q=${this.lat},${this.lon}&hl=es&z=7&amp;output=embed">
                  </iframe>
        </div>
        </div>
        </div>
        </div>

        `;


        let myBorders = countryDiv.querySelector("#id_borders");
        if (this.borders) {
            this.borders.forEach(async (element) => {
                let fullCountryName = await this.getCountryByCode(element);
                let borderSpan = document.createElement("span");
                borderSpan.className="countryLink";
                borderSpan.innerHTML = `${fullCountryName} `;
                myBorders.append(borderSpan);
                borderSpan.addEventListener("click", () => {
                    this.createCountryByCode(element);
                })
            });
        } else { myBorders.innerHTML += "none"; }

        let home_btn = myDiv.querySelector("#home_btn");
        home_btn.addEventListener("click", () => {
            myDiv.innerHTML = ""
            this.showDefaultCountries();
        })



    }



}



