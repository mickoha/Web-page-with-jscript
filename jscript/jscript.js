'use strict'


function tuoAlkuSivulle() {
    let tiedot = document.getElementById("maa-pohja");
    let otsikko = document.createElement("h1");
    otsikko.textContent = "Select initial starting country";
    let tier1 = document.createElement("h1");
    tier1.textContent = "Tier " + tier;
    tier++;
    tiedot.appendChild(otsikko);
    tiedot.appendChild(tier1);

    let enemmanKuinKaksiNaapuria = [];
    for (let i = 0; i < maat.length; i++) {
        if (maat[i].borders.length >= 2) {
            enemmanKuinKaksiNaapuria.push(maat[i]);
        }
    }
    
    var vietavatMaat = [];

    for (let i = 0; i < 3; i++) {
        var indeksi = Math.floor(Math.random() * enemmanKuinKaksiNaapuria.length + 1);
        while (kaydytMaat.includes(enemmanKuinKaksiNaapuria[indeksi])) {
            indeksi = Math.floor(Math.random() * enemmanKuinKaksiNaapuria.length + 1);
        }

        vietavatMaat.push(enemmanKuinKaksiNaapuria[indeksi]);
    }

    let maaRivi = document.createElement("div");
    maaRivi.setAttribute("class", "row");
    for (let i = 0; i < vietavatMaat.length; i++) {
        if (!kaydytMaat.includes(vietavatMaat[i])) {
            let vietava = vieMaa(vietavatMaat[i]);
            maaRivi.appendChild(vietava);
        }   
    }

    tiedot.appendChild(maaRivi);
}

function vieMaa(maa) {
    
    let maaTieto = maa;
    

    let lippu = document.createElement("img");
    lippu.setAttribute("src", maaTieto.flag);
    lippu.setAttribute("style", "width:170px;");
    
    let valtio = document.createElement("p");
    valtio.innerHTML = "<strong class='maa'> " + maaTieto.name + ": </strong>"
    + maaTieto.capital;
    
    let valuutta = document.createElement("p");
    valuutta.innerHTML = "<strong class='valuutta'> Currency: </strong>" + maaTieto.currencies[0].name + " (" 
    + maaTieto.currencies[0].code + ")";
    
    let naapurit = document.createElement("p");
    naapurit.innerHTML = "<strong class='naapurit'> Borders: </strong>" + maaTieto.borders;
    naapurit.innerHTML = naapurit.innerHTML.split(",").join(", ");
   
    let maaKoodi = maaTieto.alpha3Code;
    var yksiMaa = document.createElement("div1");
    yksiMaa.setAttribute("maaKoodi", maaKoodi);
    yksiMaa.appendChild(lippu);
    yksiMaa.appendChild(valtio);
    yksiMaa.appendChild(valuutta);
    yksiMaa.appendChild(naapurit);
    yksiMaa.setAttribute("class", "col-2");
    yksiMaa.addEventListener("click", function() {
        // Haetaan tieto naapurimaista
        vieMaaSuunnitelmaan(maaKoodi);
        kaydytMaat.push(maaTieto);
        yksiMaa.setAttribute("class", "col-2-kaytetty");
        let naapuriMaat = this.textContent.split("Borders:");
        nykyisetNaapurit = naapuriMaat[1].substring(1).split(", ");
        tuoUusiRivi();
    });
    return yksiMaa;
}

function vieMaaSuunnitelmaan(koodi) {
    let uusi = document.createElement("li");
    uusi.textContent = koodi;
    document.querySelector("ul").appendChild(uusi);
}

function tuoUusiRivi() {
    var tieto = [];
    for (let koodi of nykyisetNaapurit) {
        let apu = haeMaa(koodi);
        tieto.push(apu);

    }
    let uusiRivi = document.createElement("div");
    uusiRivi.setAttribute("class", "row");
    for (let i = 0; i < tieto.length; i++) {
        if (!kaydytMaat.includes(tieto[i][0])) {
            let vietava = vieMaa(tieto[i][0]);
            uusiRivi.appendChild(vietava);
        }
    }
    var pystyykoJatkamaan = false;
    for (let i = 0; i < tieto.length; i++) {
        if (!kaydytMaat.includes(tieto[i][0])) {
            pystyykoJatkamaan = true;
        }
    }

    let tiedot = document.getElementById("maa-pohja");
    let tierRivi = document.createElement("h1");
    if (pystyykoJatkamaan) {
        tierRivi.textContent = "Tier " + tier;
        tier++;
    } else {
        tierRivi.textContent = "No more tiers available";
    }
    tiedot.appendChild(tierRivi);

    if (pystyykoJatkamaan) {
        tiedot.appendChild(uusiRivi);
    }

}

function haeMaa(koodi) {
    return maat.filter(function(maat) {
        return maat.alpha3Code == koodi;
    });
}

function tieto() {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(function(vastausAika) {
            if (vastausAika.status !== 200) {
                console.log("Could not get the data. Status code : " + vastausAika.status);
                return;
            }

            vastausAika.json().then(function(data) {
                maat = data;
                tuoAlkuSivulle(data);
            })
            .catch(function(error) {
                console.log("Fetch Error :", error)
            });
        })
}



var tier = 0;
var nykyisetNaapurit = [];
var vietavaMaa;
var kaydytMaat = [];
var maat;
tieto();

