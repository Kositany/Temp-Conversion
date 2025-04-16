const tempBox= document.getElementById("temp_box");
const toFahrenheit= document.getElementById("toFahrenheit");
const toCelsius= document.getElementById("toCelsius");
const result= document.getElementById("result");
let temp;

function convert(){

    if(toFahrenheit.checked){
        temp= Number (tempBox.value);
        temp= temp *9 / 5+32;
        result.textContent = temp + "F";
    }
    else if(toCelsius.checked){
        temp= Number (tempBox.value);
        temp= (temp-32) *(5/9);
        result.textContent = temp + "C";
    }
    else{
        result.textContent="Please select a unit";
    }

}