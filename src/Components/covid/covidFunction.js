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

export const stringToInt = stringNum => {
  if(typeof stringNum === "string" && stringNum !== "NA"){
    if(stringNum.includes(","))
      stringNum = stringNum.replace(",","")
    if(stringNum.includes(" "))
      stringNum = stringNum.replace(" ","")
    return parseInt(stringNum.trim())
  }
  else 
    return stringNum
};

export const filterName = name => {
  let newName = name;
  switch(name){
    case "USA":
        newName = "United States";
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
    case "St-Vincent-Grenadines":
      newName = "Saint Vincent and the Grenadines";
      break;
    case "S-Korea":
      newName = "South Korea";
      break;
    case "Trinidad-and-Tobago":
      newName = "Trinidad and Tobago";
      break;
    case "Turks-and-Caicos":
      newName = "Turks and Caicos";
      break;
    case "Papua-New-Guinea":
      newName = "Papua New Guinea";
      break;
    case "UAE":
      newName = "United Arab Emirates";
      break;
    case "Saint-Kitts-and-Nevis":
      newName = "Saint Kitts and Nevis";
      break;
    case "US-Virgin-Islands":
      newName = "US Virgin Islands";
      break;
    case "Antigua-and-Barbuda":
      newName = "Antigua and Barbuda";
      break;
    case "Cabo-Verde":
      newName = "Cape Verde";
      break;
    case "British-Virgin-Islands":
      newName = "British Virgin Islands";
      break;
    case "Cura&ccedil;ao":
      newName = "Curaçao";
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

export const filterExclude = (regionType, array) => {
  const toExclude = ["date","__v","_id"]
  const quebecRegionsToExclude = [ "Hors Québec", "Nord-du-Québec", "Nunavik","Terres-Cries-de-la-Baie-James", "Région à déterminer",...toExclude];
  const montrealRegionsToExclude = [ "Territory to be confirmed2",...toExclude];

  const toExcludeArray = {
      "World" : [],
      "Canada" : ["Repatriated Canadians"],
      "Quebec" : quebecRegionsToExclude,
      "Montreal" : montrealRegionsToExclude
  };

  if(regionType === "Canada")
    array.push({"locationName" : "Canada"});
  
  if(regionType === "World")
    array.push({"locationName" : "World"});

  return array.filter(region => !toExcludeArray[regionType].includes(region.locationName))
};