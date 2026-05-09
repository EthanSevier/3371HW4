 function callDateTime() {
    var currentDate = (new Date()).toDateString();
    var currentTime = (new Date()).toLocaleTimeString();
    document.getElementById('date').innerHTML = `${currentDate} - ${currentTime}`;

}
setInterval(callDateTime, 1000);

const painSlider = document.getElementById('painLevel');
let painNumber = painSlider.value;
painSlider.addEventListener("input", painSliderUpdater);

function painSliderUpdater(){
painNumber = painSlider.value;
document.getElementById('painNumber').innerText = painNumber;
}




function openModal() {
    verifySubmit()
    displayReviewInfo();
    fillIn();
    saveLocStore();

}

var dateTracker=0;
function dateInputted(){
  dateTracker = 1;
  validateDob();
}

function displayReviewInfo(){
  let fname = document.getElementById('fname').value; 
  let lname = document.getElementById('lname').value; 
  let optin;
  if (document.getElementById('optYes').checked) {
    optin = "Yes";
  } else if (document.getElementById('optNo').checked) {
    optin = "No";
  }
  let add1 = document.getElementById('addLine1').value; 
  let add2 = document.getElementById('addLine2').value; 
  let painLevel = document.getElementById('painLevel').value; 
  let payment;
  if (document.getElementById('payOut').checked) {
   payment = "Out of pocket";
  } else if (document.getElementById('payIns').checked) {
  }
  let sex;
  if (document.getElementById('sexMale').checked) {
   sex = "Male";
  } else if (document.getElementById('sexFemale').checked) {
   sex = "Female";
  } 
  let userID = document.getElementById('UserID').value;
  let password = document.getElementById('password').value;

  document.getElementById("reviewModal").style.display = "block";

if (!validateName('fname')) {
  document.getElementById('fnameR').innerText = "First Name: Invalid";
  document.getElementById('fnameR').style.color = "red"
} 
else {
  document.getElementById('fnameR').innerText = "First Name: " + fname;
  document.getElementById('fnameR').style.color = "green"
}


if (!validateName('lname')) {
  document.getElementById('lnameR').innerText = "Last Name: Invalid";
  document.getElementById('lnameR').style.color = "red"
} 
else {
  document.getElementById('lnameR').innerText = "Last Name: " + lname;
  document.getElementById('lnameR').style.color = "green"
}

validateDob();

validateSSN();

validatePhone();

validateEmail();



if (optin == "Yes" || optin == "No"){
    document.getElementById('OptinR').innerText = "Opt-In for texts: "+ optin;
    document.getElementById('OptinR').style.color = "green"
} 
else {
  document.getElementById('OptinR').innerText = "Opt-In for texts: Missing";
  document.getElementById('OptinR').style.color = "red"
}

validateAdd1();

  document.getElementById('addLine2R').innerText = "Address Line 2: "+ add2;
if(add1.length > 0 && /[a-zA-Z0-9]/.test(add1)){
  document.getElementById('addLine2R').style.color = "green"
}

validateCity();

validateState();
  

validateZip();


  document.getElementById('painLevelR').innerText = "Pain Level: "+ painLevel;
  document.getElementById('painLevelR').style.color = "green"

if (!validateUserID()) {
  document.getElementById('userIDR').innerText = "UserID: Invalid";
  document.getElementById('userIDR').style.color = "red"
} 
else {
  document.getElementById('userIDR').innerText = "UserID: " + userID;
  document.getElementById('userIDR').style.color = "green"
}


if (sex != null){
    document.getElementById('sexR').innerText = "Sex: "+ sex;
    document.getElementById('sexR').style.color = "green"
} 
else {
  document.getElementById('sexR').innerText = "Sex: Missing";
  document.getElementById('sexR').style.color = "red"
}

if (payment != null){
    document.getElementById('paymentR').innerText = "Payment: "+ payment;
    document.getElementById('paymentR').style.color = "green"
} 
else {
  document.getElementById('paymentR').innerText = "Payment: Missing";
  document.getElementById('paymentR').style.color = "red"
}

if (!validatePassword()) {
  document.getElementById('passwordR').innerText = "Password: Invalid";
  document.getElementById('passwordR').style.color = "red"
} 
else {
  document.getElementById('passwordR').innerText = "Password: " + password;
  document.getElementById('passwordR').style.color = "green"
} 
}

function closeModal() {
    document.getElementById("reviewModal").style.display = "none";
}


  const nameCode = /^[A-Za-z]+(?:['-][A-Za-z]+)*$/;
  const emailCode = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateUserID() {
    let userIDV = document.getElementById('UserID').value;
    let letter1 = userIDV.charAt(0);
    let alertMessage = "";
    if (/^[0-9]$/.test(letter1)) {
      alertMessage += "The first character of your UserID should not be a number.\n";
    }
    if (userIDV.length <=5 || userIDV.length >=20){
      alertMessage += "The User ID should be between 5 and 20 characters.\n";
    }
    if(!/^[A-Za-z0-9_-]+$/.test(userIDV)){
      alertMessage +=  "The User ID should contain only numbers, letters, _ and -.\n";
    }
    if(alertMessage.length > 5){
      document.getElementById('UserIDError').innerText = alertMessage;  
    }
    else {
      document.getElementById('UserIDError').innerText = " ";
      return true;
    }

}

  function validatePassword() {
    let pwrd = document.getElementById('password').value;
    let alertMessage = "";
    if (pwrd.length < 8) {
      alertMessage += "The password must be longer than 8 characters.\n";
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(pwrd)){
      alertMessage += "The password must contain at least:\n- one uppercase letter\n- one lowercase leter\n- one digit\n";
    }
    if(pwrd == document.getElementById('UserID').value){
      alertMessage +=  "The password cannot match the User ID.\n";
    }
    if(pwrd != document.getElementById('repassword').value){
      alertMessage +=  "The passwords must match.\n";
    }
    if(alertMessage.length > 5){
      document.getElementById('passwordError').innerText = alertMessage;   
    }  
    else{
      document.getElementById('passwordError').innerText = " ";
      return true;
    }
}

  function validateRepassword() {
    let pwrd = document.getElementById('password').value;
    let alertMessage = "";
    validatePassword();
    if(pwrd != document.getElementById('repassword').value){
      alertMessage +=  "The passwords must match.\n";
    }
    if(alertMessage.length > 5){
      document.getElementById('repasswordError').innerText = alertMessage;
    }
    else{
      document.getElementById('repasswordError').innerText = " ";
      return true;
    }
}
  function validateName(type){
    const name = document.getElementById(type).value;
    const error = type +"Error";
    if(!nameCode.test(name)){
      document.getElementById(error).innerText = "Letters, Apostrophes and Dashes only";
    }
    else{
      document.getElementById(error).innerText = " ";
      return true;
    }
}    
    
  function validateEmail(){
    const emailV = document.getElementById('Email').value;
    if(!emailCode.test(emailV)){
      document.getElementById('EmailR').innerText = "Email: Invalid";
      document.getElementById('EmailR').style.color = "red";
      document.getElementById('EmailError').innerText = "Please fill out email in the format name@domain.tld";
      return false;
    }
    else{
      document.getElementById('EmailR').innerText = "Email: "+ emailV;
      document.getElementById('EmailR').style.color = "green";
      document.getElementById('EmailError').innerText = " ";
      return true;
    }
  } 


function validateMint(){
let mint = document.getElementById('mint').value; 
  if(mint == ""){
    document.getElementById('mintR').innerText = "Middle Int: ";
    return true;
}
else if (/^[a-zA-Z]$/.test(mint)){    
    document.getElementById('mintR').innerText = "Middle Int: "+ mint;
    document.getElementById('mintR').style.color = "green";
    document.getElementById('mintError').innerText = " ";
    return true;
}
else{
  document.getElementById('mintR').innerText = "Middle Int: Invalid";
  document.getElementById('mintR').style.color = "red";
  document.getElementById('mintError').innerText = "Middle Int should only be 1 letter";
}
 } 

function validateDob(){
  let dob = document.getElementById('dob').value;
  if(dateTracker > 0){
    document.getElementById('dobR').innerText = "Date of Birth: "+ dob;
    document.getElementById('dobR').style.color = "green"
    document.getElementById('dobError').innerText = " ";
    return true;
}
else{
  document.getElementById('dobR').innerText = "Date of Birth: Missing";
  document.getElementById('dobR').style.color = "red"
  document.getElementById('dobError').innerText = "Missing";
}
}

function validateSSN(){
  let ssn = document.getElementById('ssn').value; 
if(ssn.length == 11){
    document.getElementById('ssnR').innerText = "SSN: "+ ssn;
    document.getElementById('ssnR').style.color = "green"
    document.getElementById('ssnError').innerText = " ";
    return true;
}
else if(ssn.length == 0){
  document.getElementById('ssnR').innerText = "SSN: Missing";
  document.getElementById('ssnR').style.color = "red"
  document.getElementById('ssnError').innerText = "Missing";
}
else{
  document.getElementById('ssnR').innerText = "SSN: Invalid";
  document.getElementById('ssnR').style.color = "red"
  document.getElementById('ssnError').innerText = "Invalid";
}

}

function validatePhone() {
  let phone = document.getElementById('Phone').value; 
  if(phone.length == 12){
    document.getElementById('PhoneR').innerText = "Phone: "+ phone;
    document.getElementById('PhoneR').style.color = "green"
    document.getElementById('phoneError').innerText = " ";
    return true;
}
else if(phone.length == 0){
  document.getElementById('PhoneR').innerText = "Phone: Missing";
  document.getElementById('PhoneR').style.color = "red"
  document.getElementById('phoneError').innerText = "Missing";
}
else{
  document.getElementById('PhoneR').innerText = "Phone: Invalid";
  document.getElementById('PhoneR').style.color = "red"
  document.getElementById('phoneError').innerText = "Invalid";
}

}

function validateAdd1() {
let add1 = document.getElementById('addLine1').value;
if(add1.length > 0 && /[a-zA-Z0-9]/.test(add1)){
    document.getElementById('addLine1R').innerText = "Address Line 1: "+ add1;
    document.getElementById('addLine1R').style.color = "green"
    document.getElementById('addLine1Error').innerText = " ";
    return true;

}
else{
    document.getElementById('addLine1R').innerText = "Missing";
    document.getElementById('addLine1R').style.color = "red"
    document.getElementById('addLine1Error').innerText = "Missing";
}

}

function validateCity(){
let city = document.getElementById('City').value; 
 if(city.length > 0 && /[a-zA-Z0-9]/.test(city)){
    document.getElementById('CityR').innerText = "City: "+ city;
    document.getElementById('CityR').style.color = "green"
    document.getElementById('cityError').innerText = " ";
    return true;

}
else{
    document.getElementById('CityR').innerText = "City: Missing";
    document.getElementById('CityR').style.color = "red"
    document.getElementById('cityError').innerText = "Missing";
}
 
}

function validateState(){
let state = document.getElementById('State').value; 
if(state == " "){
    document.getElementById('StateR').innerText = "State: Missing";
    document.getElementById('StateR').style.color = "red"
    document.getElementById('stateError').innerText = "Missing";
}
else{
    document.getElementById('StateR').innerText = "State: "+ state;
    document.getElementById('StateR').style.color = "green"
    document.getElementById('stateError').innerText = " ";
    return true;

}  
}

function validateZip(){
  let zip = document.getElementById('Zip').value; 
  if(zip.length < 1){
    document.getElementById('ZipR').innerText = "Zip: Missing";
    document.getElementById('ZipR').style.color = "red"
    document.getElementById('zipError').innerText = "Missing";
  }
  else if(zip.length < 5 || !/^\d+$/.test(zip)){
    document.getElementById('ZipR').innerText = "Zip: Invalid";
    document.getElementById('ZipR').style.color = "red"
    document.getElementById('zipError').innerText = "Invalid";
  }
  else{
    document.getElementById('ZipR').innerText = "Zip: "+ zip;
    document.getElementById('ZipR').style.color = "green"
    document.getElementById('zipError').innerText = " ";
    return true;
  } 
}

 function verifySubmit(){

  if (validateName('fname') && validateName('lname') && validateEmail() && validateUserID() && validatePassword() && validateAdd1() && validateCity() && validateDob() && validateMint() && validatePhone() && validateSSN() && validateState()) {
    setNameCookie()
    saveLocStore()
    document.getElementById('submitBtnContainer').style.display = "block";
  } 
  else {
  document.getElementById('submitBtnContainer').style.display = "none";
  }

  if (!rememberMe()) {
    clearData();
  }

 }

let ssnValidate = document.getElementById('ssn');

ssnValidate.addEventListener("input", (e) => {
let ssnInput = ssnValidate.value;
ssnInput = ssnInput.replace(/\D/g, "");
ssnInput = ssnInput.substring(0, 9);

if (ssnInput.length > 5) {
  ssnInput = ssnInput.replace(/(\d{3})(\d{2})(\d{1,4})/, "$1-$2-$3");
} 
else if (ssnInput.length > 3) {
 ssnInput = ssnInput.replace(/(\d{3})(\d{1,2})/, "$1-$2");
}

ssnValidate.value = ssnInput;
});

let phoneValidate = document.getElementById('Phone');

phoneValidate.addEventListener("input", (e) => {
let phoneInput = phoneValidate.value;
phoneInput = phoneInput.replace(/\D/g, "");
phoneInput = phoneInput.substring(0, 10);

if (phoneInput.length > 6) {
  phoneInput = phoneInput.replace(/(\d{3})(\d{3})(\d{1,4})/, "$1-$2-$3");
} 
else if (phoneInput.length > 3) {
 phoneInput = phoneInput.replace(/(\d{3})(\d{1,3})/, "$1-$2");
}

phoneValidate.value = phoneInput;
});


fetch('./states.txt')
  .then(response => response.text())
  .then(text => {
  document.getElementById('stateList').innerHTML = text;
  });

function setNameCookie() {
  let name = document.getElementById('fname').value;
  let dateExp = new Date();
  dateExp.setTime(dateExp.getTime() + (2 * 24 * 60 * 60 * 1000));
  document.cookie = "fname=" + encodeURIComponent(name) + "; expires=" + dateExp.toUTCString() + "; path=/";
}

function displayWelcomeBack() {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith("fname=")) {
          let fname = cookie.substring(6);
          const welcomeMsg = 'Welcome Back ' + fname + '.    Not ' + fname + '?' + ' <input type="reset" value="Click Here" onclick="clearData()"/>';
          document.getElementById('welcomeBack').innerHTML = welcomeMsg;
          document.getElementById('fname').value = fname;
          fillIn(); 
      }
  }   
}

function saveLocStore(){
  localStorage.setItem('fname', document.getElementById('fname').value);
  localStorage.setItem('mint', document.getElementById('mint').value);
  localStorage.setItem('lname', document.getElementById('lname').value);
  localStorage.setItem('dob', document.getElementById('dob').value);
  localStorage.setItem('addLine1', document.getElementById('addLine1').value);
  localStorage.setItem('addLine2', document.getElementById('addLine2').value);
  localStorage.setItem('City', document.getElementById('City').value);
  localStorage.setItem('Zip', document.getElementById('Zip').value);
  localStorage.setItem('stateList', document.getElementById('stateList').value);
  localStorage.setItem('Email', document.getElementById('Email').value);
  localStorage.setItem('Phone', document.getElementById('Phone').value);
  localStorage.setItem('UserID', document.getElementById('UserID').value);
  localStorage.setItem('medHistory', document.getElementById('medHistory').value);
  localStorage.setItem('meds', document.getElementById('meds').value);
}

function fillIn(){
  document.getElementById('fname').value = localStorage.getItem('fname');
  document.getElementById('mint').value = localStorage.getItem('mint');
  document.getElementById('lname').value = localStorage.getItem('lname');
  document.getElementById('dob').value = localStorage.getItem('dob');
  document.getElementById('addLine1').value = localStorage.getItem('addLine1');
  document.getElementById('addLine2').value = localStorage.getItem('addLine2');
  document.getElementById('City').value = localStorage.getItem('City');
  document.getElementById('Zip').value = localStorage.getItem('Zip');
  document.getElementById('stateList').value = localStorage.getItem('stateList');
  document.getElementById('Email').value = localStorage.getItem('Email');
  document.getElementById('Phone').value = localStorage.getItem('Phone');
  document.getElementById('UserID').value = localStorage.getItem('UserID');
  document.getElementById('medHistory').value = localStorage.getItem('medHistory');
  document.getElementById('meds').value = localStorage.getItem('meds');
}

function clearData(){
  localStorage.clear;
  document.cookie = 'fname=; Max-Age=0; path=/; domain=';
}

function rememberMe(){
  if (document.getElementById('rememberMe').checked) {
    fillIn();
    saveLocStore();
    return true;
  } 
  else {
    return false;
  }
}