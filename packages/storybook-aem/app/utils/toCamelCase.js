const toWords = require('./toWords');

// convert the input array to camel case
function toCamelCase(inputArray) {

  let result = "";

  for(let i = 0 , len = inputArray.length; i < len; i++) {

    let currentStr = inputArray[i];
  
    let tempStr = currentStr.toLowerCase();

    if(i != 0) {
  
      // convert first letter to upper case (the word is in lowercase) 
        tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);

     }
    
     result +=tempStr;
    
  }

  return result;
}


// this function call all other functions
module.exports = input => {						
    let words = toWords(input);
    return toCamelCase(words);
}