function calculate(){

let type=document.getElementById("calculatorType").value;

let P=parseFloat(document.getElementById("amount").value);

let R=parseFloat(document.getElementById("rate").value);

let T=parseFloat(document.getElementById("time").value);

let answer=0;

switch(type){

case "si":

answer=(P*R*T)/100;

break;

case "ci":

answer=P*Math.pow((1+R/100),T)-P;

break;

case "emi":

let monthlyRate=(R/12)/100;

let months=T*12;

answer=(P*monthlyRate*Math.pow(1+monthlyRate,months))/

(Math.pow(1+monthlyRate,months)-1);

break;

case "gst":

answer=P+(P*R/100);

break;

case "discount":

answer=P-(P*R/100);

break;

}

if(isNaN(answer)){

document.getElementById("output").innerHTML="Enter valid values";

return;

}

document.getElementById("output").innerHTML=answer.toFixed(2);

}