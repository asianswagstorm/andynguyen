export const addComma = (value) =>  (value) ? value.toLocaleString() : value;

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