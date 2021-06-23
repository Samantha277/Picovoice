const searchBar = document.getElementById('searchBar');
let searchString = '';

//get list of all countries with alpha3code
function getListOfCountries(data){
    var listOfCountries = [];
    for (var i = 0; i < data.length; i++) {
        listOfCountries = {...listOfCountries, ...{[data[i].alpha3Code]: data[i].capital}}
    }

    return listOfCountries;
}

//get all neighbouring countries and cities
function getAllBorders(b, listOfCountries, mainContainer){
    for (var j=0; j<b.length; j++){
        var borders = document.createElement("borders");
        borders.innerHTML = "<ul>" + listOfCountries[b[j]]+ "</ul>" ;
        mainContainer.appendChild(borders);
        
    }
}


function findCountries(data, searchString, country){
    var div = document.createElement("div");
    var mainContainer = document.getElementById("myData");
    mainContainer.innerHTML = '';
    try{
        if (searchString){
            console.log("search: " + searchString);
            console.log(country);
            
            var listOfCountries = getListOfCountries(data);
            var b = country.borders;
            
            div.innerHTML = "borders: " + country.capital + ' <br>';
            mainContainer.appendChild(div);
            
            div.innerHTML = '<ul>' + country.capital + '</ul>';
            getAllBorders(b, listOfCountries, mainContainer);
           
        }
    }
    catch(e){
        div.innerHTML = 'Please enter a valid country';
    }
    
    mainContainer.appendChild(div);

}


function fetchData(searchString){
    fetch("https://restcountries.eu/rest/v2")
        .then(response => {
            return response.json();            
        })
        
        .then(data => {

            var country = data.find(e => e.name === searchString)
            findCountries(data, searchString, country);
        })
    }

    
searchBar.addEventListener('keyup', (e) => {
    searchString = e.target.value;

    if (e.key === "Enter") {
        e.preventDefault();
        console.log("Enter pressed")
        fetchData(searchString);
        return searchString;
    }})
