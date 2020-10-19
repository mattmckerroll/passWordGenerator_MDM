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
var specCharSet = " \"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~";
var pwCharSet = "";
var newPW = "";


function generatePassword() {

  //these if statements add the chosen character sets to a temporary character set that the new password will pull from
  if (lowCase) {
    pwCharSet += lowCharSet;
  }

  if (upCase) {
    pwCharSet += upCharSet;
  }

  if (numeric) {
    pwCharSet += numbCharSet;
  }

  if (specCharSet) {
    pwCharSet += specCharSet;    
  }
  //initializing loop counter
  

  //this loop constructs the password character by character
  for (var i = 0, n = pwCharSet.length; i < pwLength; ++i) {
      newPW += pwCharSet.charAt(Math.floor(Math.random() * n));
  }
  return newPW;
    
  }
console.log(newPW);



// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
