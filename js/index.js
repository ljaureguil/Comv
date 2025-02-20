var link="https://jsonblob.com/api/1342186332981747712"
var arn=[];


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
   //if(r!=undefined){
   //  alert(JSON.stringify(arn))
   //}
  if(arn.length>0){
    allA=allA.concat(arn);
  //  alert(allA)
  }
  


  const navbar = document.querySelector(".navbar");
  for (let i = 0; i < allA.length; i++) {
    const button = document.createElement("button");
    button.classList.add("nav-item");
    button.textContent = allA[i][0][0];
    button.onclick = () => {
      currentAIndex = i;
      handleActiveNavItem();
      createSelect();
      calculateUnit();
      tequiv.value=JSON.stringify(allA[i]);
    };
    navbar.appendChild(button);
  }
  handleActiveNavItem();


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
  alert(allA[currentAIndex][selectFromId][1]+"\n"+stdVal+"\n"+iv+"\n"+value)
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
  if(tequiv.value!=""){
    var a=JSON.parse(tequiv.value);
if(Array.isArray(a)){
 arn.push(a);
 //alert(arn);
 if(confirm("New equivalence will be added, ok to procede")){
   UpdateJ(link,arn,function(r){alert("all done,app will be restarted...");window.location.reload()})
 }
}
else alert("It is not an array")
}
}

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




