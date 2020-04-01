import A from "./artistNames/A.json";
import B from "./artistNames/B.json";
import C from "./artistNames/C.json";
import D from "./artistNames/D.json";
import E from "./artistNames/E.json";
import F from "./artistNames/F.json";
import G from "./artistNames/G.json";
import H from "./artistNames/H.json";
import I from "./artistNames/I.json";
import J from "./artistNames/J.json";
import K from "./artistNames/K.json";
import L from "./artistNames/L.json";
import M from "./artistNames/M.json";
import N from "./artistNames/N.json";
import O from "./artistNames/O.json";
import P from "./artistNames/P.json";
import Q from "./artistNames/Q.json";
import R from "./artistNames/R.json";
import S from "./artistNames/S.json";
import T from "./artistNames/T.json";
import U from "./artistNames/U.json";
import V from "./artistNames/V.json";
import W from "./artistNames/W.json";
import X from "./artistNames/X.json";
import Y from "./artistNames/Y.json";
import Z from "./artistNames/Z.json";
import Numbers from "./artistNames/Numbers.json";
const convertJSONtoArray = data => Object.values(data);
const filterArray = (array, searchQuery) =>
  array.filter(
    name => name.toLowerCase().includes(searchQuery.toLowerCase()) === true
  );

const topTen = ["Elton John", "Michael Jackson", "The Beatles", "Elvis Presley", "Maroon 5", "Queen", "Boyz II Men"];

export const filterArtistByName = input => {
  const startingLetter = input.charAt(0).toLowerCase();
  let filteredList = [];
  switch (startingLetter) {
    case "a":
      filteredList = filterArray(convertJSONtoArray(A), input);
      break;
    case "b":
      filteredList = filterArray(B, input);
      break;
    case "c":
      filteredList = filterArray(convertJSONtoArray(C), input);
      break;
    case "d":
      filteredList = filterArray(D, input);
      break;
    case "e":
      filteredList = filterArray(convertJSONtoArray(E), input);
      break;
    case "f":
      filteredList = filterArray(convertJSONtoArray(F), input);
      break;
    case "g":
      filteredList = filterArray(convertJSONtoArray(G), input);
      break;
    case "h":
      filteredList = filterArray(convertJSONtoArray(H), input);
      break;
    case "i":
      filteredList = filterArray(convertJSONtoArray(I), input);
      break;
    case "j":
      filteredList = filterArray(convertJSONtoArray(J), input);
      break;
    case "k":
      filteredList = filterArray(convertJSONtoArray(K), input);
      break;
    case "l":
      filteredList = filterArray(convertJSONtoArray(L), input);
      break;
    case "m":
      filteredList = filterArray(convertJSONtoArray(M), input);
      break;
    case "n":
      filteredList = filterArray(convertJSONtoArray(N), input);
      break;
    case "o":
      filteredList = filterArray(convertJSONtoArray(O), input);
      break;
    case "p":
      filteredList = filterArray(convertJSONtoArray(P), input);
      break;
    case "q":
      filteredList = filterArray(convertJSONtoArray(Q), input);
      break;
    case "r":
      filteredList = filterArray(convertJSONtoArray(R), input);
      break;
    case "s":
      filteredList = filterArray(convertJSONtoArray(S), input);
      break;
    case "t":
      filteredList = filterArray(convertJSONtoArray(T), input);
      break;
    case "u":
      filteredList = filterArray(U, input);
      break;
    case "v":
      filteredList = filterArray(convertJSONtoArray(V), input);
      break;
    case "w":
      filteredList = filterArray(convertJSONtoArray(W), input);
      break;
    case "x":
      filteredList = filterArray(X, input);
      break;
    case "y":
      filteredList = filterArray(convertJSONtoArray(Y), input);
      break;
    case "z":
      filteredList = filterArray(convertJSONtoArray(Z), input);
      break;
    default:
      filteredList = (input.trim() !== "") ? filterArray(convertJSONtoArray(Numbers), input) : topTen;
      break;
  }
  return filteredList;
};
