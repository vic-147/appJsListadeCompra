import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const appSettings = {
  databaseURL: "https://listadecompras-fb452-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const listaDeComprasDB = ref(database, "listaDeCompras");

const inputFieldEl = document.querySelector("#input-field");
const addButtonEl = document.querySelector("#btn-add");
const shoppingListEl = document.querySelector("#shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  push(listaDeComprasDB, inputValue);

  console.log(`${inputValue} added to database`);

  clearInputFieldEl();

  appendItemToShoppingListEl(inputValue);
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemToShoppingListEl(itemValue) {
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}
