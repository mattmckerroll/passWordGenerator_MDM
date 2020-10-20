// Assignment Code
var generateBtn = document.querySelector("#generate");

while (true) {
  

  //prompts for password length
  var pwLength = prompt("How long would you like your password to be? (please pick a number from 8 - 128)")

  //checks if password length is valid
  if (pwLength > 128 || pwLength < 8) {
    alert("That length of password is not valid, please try again.");
  }
  else if (pwLength >= 8 && pwLength <= 128) {
    //break out of loop if user enters an acceptable length
    break;
  
  }
}

//loop continues until the user selects at least 1 criteria (loop is broken out of via a break)
while (true) {
  //the rest of the criteria are true/false
  var lowCase = confirm("Do you want lower case characters?");
  var upCase = confirm("Do you want uppercase characters");
  var numeric = confirm("Do you want numeric characters?");
  var specialChars = confirm("Do you want special characters?");
  
  //checks if at least 1 criteria has been chosen
  if (!(lowCase || upCase || numeric || specialChars)){
   
    alert("you didnt select ANY password criteria, please select at least 1 this time.");    
  }
  else if (lowCase || upCase || numeric || specialChars) {
    //if at lease 1 of the criteria is true, then we can proceed to generating the password.
    break;    
  }

}

//initializing the character sets for use 
var lowCharSet = "abcdefghijklmnopqrstuvwxyz";
var upCharSet = lowCharSet.toUpperCase();
var numbCharSet = "1234567890";
var specCharSet = "\s"+"\""+"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~";
var newPW = "";


function generatePassword() {
  var pwCharSet = "";
  var newPW = "";
  //these if statements add the chosen character sets to a temporary character set that the new password will pull from
  if (lowCase) {
    pwCharSet += lowCharSet;
  }
console.log(pwCharSet);
  if (upCase) {
    pwCharSet += upCharSet;
  }
  console.log(pwCharSet);
  if (numeric) {
    pwCharSet += numbCharSet;
  }
  console.log(pwCharSet);
  if (specialChars) {
    pwCharSet += specCharSet;    
  }
  console.log(pwCharSet);
  //this loop constructs the password character by character
  for (var i = 0, n = pwCharSet.length; i < pwLength; ++i) {
      newPW += pwCharSet.charAt(Math.floor(Math.random() * n));
  }

  //each if first checks if it was included as a criterion, if it is, then it checks if the newly generated password contains at least 1 character from that character set

  //checks if there is at least 1 lower case character
  if (lowCase) {
    if (validateCriterion(lowCharSet, newPW) === false){
      newPW = generatePassword()
    }
  }
  //checks if there is at least 1 upper case character
  if (upCase) {
    if (validateCriterion(upCharSet, newPW) === false){
      newPW = generatePassword()
    }
  }
  //checks if there is at least 1 number
  if (numeric) {
    if (validateCriterion(numbCharSet, newPW) === false){
      newPW = generatePassword()
    }
  }
  //checks if there is at least 1 special character
  if (specialChars) {
    if (validateCriterion(specCharSet, newPW) === false){
      newPW = generatePassword()
    }
  }



//and finally, the resulting password is returned
  return newPW;
    
}


//this function checks the entire character set to see if there is at least 1 character contained within the password that is also contained within the character set.
//the charAt function is used to isolate a single character, and is used as a substring to check if it is contained within the criteria variable (which will be one of the character sets)

function validateCriterion(criteria, uncheckedPW){
  var result = false;

  for (let k = 0; k < uncheckedPW.length; k++) {
    if (criteria.includes(newPW.charAt(k))) {
      result = true;
      break;  //technically the break isn't needed here, but it stops it from needlessly running through the rest of the password if theres at least 1 character.
    }
  }
  //the result is returned here
  return result;

}



// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
