import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
const popupBtn = document.querySelector(".popup-btn");
const popup = document.querySelector(".popup");

popupBtn.addEventListener("click", function () {
  if (popup.style.display === "none") {
    popup.style.display = "block";
  } else {
    popup.style.display = "none";
  }
});

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  push(listaDeComprasDB, inputValue);

  console.log(`${inputValue} added to database`);

  clearInputFieldEl();
});

//traer datos del DB
onValue(listaDeComprasDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    for (let index = 0; index < itemsArray.length; index++) {
      let currentItem = itemsArray[index];
      // let currebtItemId = currentItem[0];
      // let currebtItemValue = currentItem[1];

      appendItemToShoppingListEl(currentItem);
    }
    // console.log(itemsArray);
  } else {
    shoppingListEl.innerHTML = "No item here... yet";
  }
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function appendItemToShoppingListEl(item) {
  // shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
  let itemID = item[0];
  let itemValue = item[1];

  let newLiEl = document.createElement("li");
  newLiEl.textContent = itemValue;
  shoppingListEl.append(newLiEl);

  newLiEl.addEventListener("dblclick", function () {
    console.log(`${itemID} deleted`);

    let exactLocationOfItemInDB = ref(database, `listaDeCompras/${itemID}`);
    remove(exactLocationOfItemInDB);
  });
}
