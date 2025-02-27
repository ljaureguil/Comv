




var link="https://jsonblob.com/api/1342186332981747712";
var linkf='https://jsonblob.com/api/1337444300245622784';
var Formulas=[];
var arn=[];
obf={};
let currentAIndex = 0;
window.onload = () => createNavBar();
const handleActiveNavItem = () => {
  const navItems = document.querySelectorAll(".nav-item");
  const navItemValue = allA[currentAIndex][0][0];
  for (let navItem of navItems) {
    if (navItem.textContent === navItemValue) {
      navItem.classList.add("nav-item-active");
    } else {
      navItem.classList.remove("nav-item-active");
    }
  }
};
const createNavBar = () => {

  GetJ(link,function(r){
    arn=r;
   
  if(arn.length>0){
    allA=allA.concat(arn);
    }
  


  const navbar = document.querySelector(".navbar");
  for (let i = 0; i < allA.length; i++) {
    const button = document.createElement("button");
    button.classList.add("nav-item");
   // alert(i+"   "+allA[i][0])
    button.textContent = allA[i][0][0];
    button.eq=allA[i];
    button.onclick = () => {
      currentAIndex = i;
      handleActiveNavItem();
      createSelect();
      calculateUnit();
      tequiv.value=JSON.stringify(allA[i]).replace(/\[/g,"[\n");//.replace(/\]/g,"\n]\n");
      
        tequiv.eq=allA[i];
    };
    navbar.appendChild(button);
  }
  handleActiveNavItem();


})
GetJ(linkf,function(r){
  obf=r;
  Formulas=r.formulas;
 // alert(JSON.stringify(r))

 for(var i=0;i<Formulas.length;i++){
  f=Formulas[i].split("\n")[0].split("//")[1];
  
  sformulas.innerHTML+="<option>"+f+"</option>";
  
  }
})
};

const fromSelect = document.getElementById("from-select");
const toSelect = document.getElementById("to-select");
const createSelect = () => {
  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";
  const length = allA[currentAIndex].length;
  for (let i = 1; i < length; i++) {
    const option = new Option(allA[currentAIndex][i][0], i);
    fromSelect.appendChild(option);
    allA[currentAIndex][i][0];
  }
  for (let i = 1; i < length; i++) {
    const option = new Option(allA[currentAIndex][i][0], i);
    toSelect.appendChild(option);
    allA[currentAIndex][i][0];
  }
  fromSelect.options[0].selected = true;
  toSelect.options[1].selected = true;
};
createSelect();

function calVal(id, iv) {
  eval("rv = (" + allA[currentAIndex][id][2] + ");");
  return rv;
}

const calculateUnit = () => {
  const fromInput = document.getElementById("from");
  const toInput = document.getElementById("to");
  const result = document.querySelector(".result");
  let value = fromInput.value;
  if (value === "") {
    for (let i = 1; i < allA[currentAIndex].length; i++) {
      toSelect.options[i - 1].text = fromSelect.options[i - 1].text;
    }
    toInput.value = "";
    result.textContent = "";

    return;
  }
  let selectFromId, selectToId, selectFromValue, selectToValue;
  for (let i = 0; i < fromSelect.options.length; i++) {
    if (fromSelect.options[i].selected) {
      selectFromId = fromSelect.options[i].value;
      selectFromValue = fromSelect.options[i].text;
    }
  }
  for (let i = 0; i < toSelect.options.length; i++) {
    if (toSelect.options[i].selected) {
      selectToId = toSelect.options[i].value;
      selectToValue = toSelect.options[i].text;
    }
  }
  const iv = parseFloat(value);
  const stdVal = eval(allA[currentAIndex][selectFromId][1]);
 // alert(allA[currentAIndex][selectFromId][1]+"\n"+stdVal+"\n"+iv+"\n"+value)
  for (let i = 1; i < allA[currentAIndex].length; i++) {
    const temp = calVal(i, stdVal);
    toSelect.options[i - 1].text =
      allA[currentAIndex][i][0] + " (" + temp + ")";
    if (selectToId == i) {
      toInput.value = temp;
    }
  }

  result.innerHTML = `<p><b>Result: </b> ${fromInput.value} ${
    fromSelect.options[selectFromId - 1].text
  } = ${toInput.value} ${fromSelect.options[selectToId - 1].text}</p>`;
};


function addEq(){
 
setUpEq(function(e){
arn.push(e);
 if(confirm("New equivalence will be added, ok to procede")){
     UpdateJ(link,arn,function(r){alert("all done,app will be restarted...");window.location.reload()})
 }
})

}

function setUpEq(callback){
  var c=true;
  var t=prompt("Title?");
var u=prompt("Base Unit?");
var aru=[[t,t[0]+"A"],[u,"iv","iv"]];
while(c){
  var a=[];
var eu=prompt("Equals to 'Unit name'?")
if(eu===null){ c=false;break;}
var ev=prompt("1 "+u+" equals to 'Unit value'?");
if(ev===null){ c=false;break;}
else{
a=[eu,"iv/"+ev,"iv*"+ev];
aru.push(a);
//alert(JSON.stringify(aru))
}

}
//alert(aru);
if(callback) callback(aru);
else return aru;

}

function delEq(){
  
var i=allA.indexOf(tequiv.eq);
if(i<=5){alert("You can not delete base eqivalences");return}

if(confirm("Are you sure you want to delete actual equivalence?"))
{
  i=i-6;
arn.splice(i,1);

UpdateJ(link,arn,function(){alert("Equiv has been deleted, app wiil restart");window.location.reload()})

}
}
function updEq(){
  
  var i=allA.indexOf(tequiv.eq);
  if(i<=5){alert("You can not update base eqivalences");return}
  
  if(confirm("Are you sure you want to Update actual equivalence?"))
  {
 if(tequiv.value!=""){
    var a=JSON.parse(tequiv.value);
if(Array.isArray(a)){
 //alert(a)
    i=i-6;
  arn[i]=a;
  
  UpdateJ(link,arn,function(){alert("Equiv has been updated, app wiil restart");window.location.reload()})
  
  }
}}
  }

////////////////////////
function verifyF(f){
for(var i=0;i<Formulas.length;i++){
  var sf=Formulas[i].split("\n")[0];
 
  f=f.split("\n")[0];
  if(sf===f) return i;
 // alert(f+"\n\n"+sf)
}
return -1;

}

addf = function(){
  if(tequiv.value[0]!='/'){alert("You need to include Title: '//Title' in the first line");return}
  var vf=verifyF(tequiv.value)
 if(vf===-1){
    Formulas.push(tequiv.value);
   localStorage.setItem("formulas",JSON.stringify(Formulas));
  UpdateJ(linkf,obf,function(){alert("All done... app will restart");window.location.reload()})
  alert("Fourmula Saved");
  }
  else{
    if(confirm("Formula exist, do you want to updated?")){
      Formulas[vf]=tequiv.value;
      localStorage.setItem("formulas",JSON.stringify(Formulas));
     UpdateJ(linkf,obf,function(){alert("All done... app will restart");window.location.reload()})
     alert("Fourmula Updated");
    }
  }
  }
  
  selFormula = function(f){
  tequiv.value=Formulas[f-1];
  }
  
  updateFormula = function(){
  
  var f=sformulas.selectedIndex;
  if(confirm("Are you sure you want to modify "+sformulas.value+"?")){
  Formulas[f-1]=tequiv.value;
   localStorage.setItem("formulas",JSON.stringify(Formulas));
  
  alert("Formula "+sformulas.value+" has been updated");
  }
  
  }
  delFormula = function(){
  var f=sformulas.selectedIndex;
  if(confirm("Are you sure you want to DELETE "+sformulas.value+"?")){
  Formulas.splice(f-1,1);
  
   localStorage.setItem("formulas",JSON.stringify(Formulas));
  
  alert("Formula "+sformulas.value+" has been DELETED");
  }
  
  
  }
  
  
  









////////////////////////

function GetJ(url, callback) {

//var url  = "http://localhost:8080/api/v1/users";
var xhr = new XMLHttpRequest()
xhr.open('GET', url + '/1', true)
xhr.onload = function() {
    //         (xhr.responseText)
    var users = JSON.parse(xhr.responseText);
    //     var obb=decoding(users.prim);

    if (xhr.readyState == 4 && xhr.status == "200") {
        callback(users);
    } else {
        console.error(users);
    }
}
xhr.send(null);
}

function UpdateJ(url, ob, callback) {

json = JSON.stringify(ob);
var xhr = new XMLHttpRequest();
xhr.open("PUT", url + '/12', true);
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
xhr.onload = function() {
    var users = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "200") {
        //  alert("Tu Forma ha sido Enviada");
        if (callback != undefined) callback(users);
    } else {
        (users);
    }
}
xhr.send(json);
}








