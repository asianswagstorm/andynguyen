export const addComma = (number) => { //replacement for .toLocaleString()
  if(number){
    if(number > 1000){
      const modThousand = (number % 1000);
      let remainder = modThousand.toString();
      if(modThousand < 100)
          remainder = `0${remainder}`;
      else if(modThousand < 10)
          remainder = `00${remainder}`;
      else if(modThousand === 0)
          remainder = "000";
      const fixedNumber = Math.floor(number/1000);
    
      return `${addComma(fixedNumber).toString()},${remainder}` 
    } 
    else return number.toString();
  }else{
    return 0;
  }
};

export const filterName = name => {
  let newName = name;
  switch(name){
    case "USA":
        newName = "United States of America";
        break;
    case "UK":
        newName = "United Kingdom";
        break;
    case "Bosnia-and-Herzegovina":
        newName = "Bosnia and Herzegovina";
        break;
    case "North-Macedonia":
      newName = "Macedonia";
      break;
    case "S-Korea":
      newName = "South Korea";
      break;
    case "Trinidad-and-Tobago":
      newName = "Trinidad and Tobago";
      break;
    default:
        break;
  }

  if(newName.includes("-"))
    newName = newName.replace("-", " ");
  
  return newName;
};

export const rounded = num => {
    if (num > 1000000000) {
      return Math.round(num / 100000000) / 10 + "Bn";
    } else if (num > 1000000) {
      return Math.round(num / 100000) / 10 + "M";
    } else if (num > 1000)  {
      return Math.round(num / 100) / 10 + "K";
    } else {
      return num;
    }
};