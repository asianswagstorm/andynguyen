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

export const filterName = (name) => {
    if(name === "United States of America")
        return "US";
    else 
        return name; 
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