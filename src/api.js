let url = "https://restcountries.com/v3.1/all";


window.onload = function(){
    ApiRequest(url);
    
}


//Function to get the data with ajax from countrys
function ApiRequest(url){ 
    let xhtpp  = new XMLHttpRequest();

    xhtpp.open("GET", url);
    xhtpp.send();
  
    xhtpp.onreadystatechange = () => {
       if(xhtpp.readyState === 4 && xhtpp.status === 200 ){
        let data = JSON.parse(xhtpp.responseText);
        //let dataToShow = orderDataFromApi(data);
        render(data);
       }
        
      }
}

//Function to get the data with ajax from wikipedia
function ApiRequestWikipedia(url){ 
    let xhtpp  = new XMLHttpRequest();

    xhtpp.open("GET", url);
    xhtpp.send();
  
    xhtpp.onreadystatechange = () => {
       if(xhtpp.readyState === 4 && xhtpp.status === 200 ){
        let data = JSON.parse(xhtpp.responseText);
        //let dataToShow = orderDataFromApi(data);
        bootboxAlert(data.extract_html);
       }
        
      }
}

//function to create bootbox alert
function bootboxAlert(data){
    let text = data;
    bootbox.alert(text);
}

//code to handle the event listener 
let country_table = document.getElementById("table_country");
country_table.addEventListener("click",(e)=>{
    if(e.target.tagName == "BUTTON"){
        let Child_id = e.target.id;
        country_id = document.getElementById(Child_id).parentNode.parentNode.id; 
        renderLanguages(country_id);
    }
    else{
        let Child_id = e.target.id;
        let country_id = document.getElementById(Child_id).parentNode.id;
        console.log(Child_id);
        let url = "https://en.wikipedia.org/api/rest_v1/page/summary/"+country_id+""
        ApiRequestWikipedia(url);
    }


})


//render languages
function renderLanguages(id){
    let CountyLanguage = id;
    

}

//Function to render the rows and columns with the data
function render(dataCountries){
 let dataShow = dataCountries;
 //For to render the row
    for(i in dataShow){
        let table = document.getElementById("table_country");
        var row = document.createElement("tr");
        let id = String(dataShow[i].name.official);
        row.setAttribute("id",id);
//In this for the data from de json will be recorded in the rows
        for(j in dataShow){
            if(i == j){
                let ColunmOficialName = document.createElement("td");
                ColunmOficialName.textContent = dataShow[j].name.official;
                ColunmOficialName.setAttribute("id", ColunmOficialName.textContent);
                row.appendChild(ColunmOficialName);
    
               
                let CapitalElement = document.createElement("td");
                CapitalElement.innerText = dataShow[j].capital;
                CapitalElement.setAttribute("id", CapitalElement.innerText);
                row.appendChild(CapitalElement);
    
                let RegionlElement = document.createElement("td");
                RegionlElement.innerText = dataShow[j].region;
                RegionlElement.setAttribute("id", RegionlElement.innerText);
                row.appendChild(RegionlElement);
    
                let LanguageElement = document.createElement("td");
                let SeeLanguages = document.createElement("button");
                SeeLanguages.className = 'btn btn-info';
                SeeLanguages.textContent = "See Languages";
                SeeLanguages.id = j;
                LanguageElement.appendChild(SeeLanguages); 
                row.appendChild(LanguageElement);
            
                let PopulationElement = document.createElement("td");
                PopulationElement.innerText = dataShow[j].population;
                PopulationElement.setAttribute("id", PopulationElement.innerText);
                row.appendChild(PopulationElement);
    
                let FlaglElement = document.createElement("td");
                let FlaglImg = document.createElement('img');
                FlaglImg.src = String(dataShow[j].flags.png);
                FlaglElement.appendChild(FlaglImg);
                row.appendChild(FlaglElement);
            }
        }
        
        table.appendChild(row);
        
     }
}

