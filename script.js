// Assignment Code
var generateBtn = document.querySelector("#generate");

//this loop is so that the site will keep prompting the user until they provide a valid length of password
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

//this loop forces the user to click OK on at least on the choices
while (true) {
  //storing the users choices as boolean variables
  var lowCase = confirm("Do you want lower case characters?");
  var upCase = confirm("Do you want uppercase characters?");
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

//initializing the character sets as strings for use 
var lowCharSet = "abcdefghijklmnopqrstuvwxyz";
var upCharSet = lowCharSet.toUpperCase();
var numbCharSet = "1234567890";
var specCharSet = "\s"+"\""+"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~";
var newPW = "";

//function to generate the password
function generatePassword() {
  var pwCharSet = "";
  var newPW = "";
  //these if statements add the chosen character sets to a temporary character set that the new password will pull from

  //adds the lower case character set if chosen
  if (lowCase) {
    pwCharSet += lowCharSet;
  }
  //adds the upper case character set if chosen
  if (upCase) {
    pwCharSet += upCharSet;
  }
  //adds the number character set if chosen
  if (numeric) {
    pwCharSet += numbCharSet;
  }
  //adds the special character set if chosen
  if (specialChars) {
    pwCharSet += specCharSet;    
  }

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


//if all the checks pass, then we can return the newly generated password
  return newPW;
    
}


//this function checks the entire character set to see if there is at least 1 character contained within the password that is also contained within the character set.
//the charAt function is used to isolate a single character, to check if it matches exactly a character that is contained within the chosen character set

function validateCriterion(criteria, uncheckedPW){
  //here result is declared and set to false. This is because result will only ever be set to true if the check passes. 
  var result = false;

  for (let k = 0; k < uncheckedPW.length; k++) {
    if (criteria.includes(newPW.charAt(k))) {
      result = true;
      break;  //technically the break isn't needed here, but it stops the loop from needlessly running through the rest of the password if theres at least 1 character.
    }
  }
  //result will be false if the loop manages to go through the password completely without finding a match
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
