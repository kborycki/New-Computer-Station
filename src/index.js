import "./styles/main.scss";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";

const totalMoney = document.querySelector(".total_money");
const totalItems = document.querySelector(".total_items");
const nameInput = document.querySelector("#name");
const descriptionInput = document.querySelector("#description");
const categorySelect = document.querySelector("#category");
const priceInput = document.querySelector("#price");
const addBtn = document.querySelector(".add_btn");

const tableID = document.querySelector(".tableID");

const editPanel = document.querySelector(".popup");
const editName = document.querySelector(".edit-name");
const editDescription = document.querySelector(".edit-description");
const editCategory = document.querySelector(".edit-category");
const editPrice = document.querySelector(".edit-price");

const editAccept = document.querySelector(".accept");
const editCancel = document.querySelector(".cancel");

const pdf = document.querySelector(".PDF");

let ID = 0;
let moneyArr = [0];
let itemArr = [];
let EDITEDITEM;
let OLDITEM;
let OLDPRICE;

const main = () => {
  premereDomeEvents();
};

const premereDomeEvents = () => {
  editAccept.addEventListener("click", chengeitem);
  editCancel.addEventListener("click", cancelEdit);
  addBtn.addEventListener("click", checkForm);
};

const checkForm = () => {
  if (
    nameInput.value !== "" &&
    descriptionInput.value !== "" &&
    categorySelect.value !== "none" &&
    priceInput.value !== ""
  ) {
    createNewItem();
  } else {
    alert("Wypełni wszystkie pola");
  }
};

const clearInputs = () => {
  nameInput.value = "";
  descriptionInput.value = "";
  categorySelect.selectedIndex = 0;
  priceInput.value = "";
};

const createNewItem = () => {
  const newItem = document.createElement("tr");

  newItem.classList.add("item");
  newItem.setAttribute("id", ID);

  newItem.innerHTML = `
<td>${nameInput.value}</td>
<td class="item-description">${categorySelect.value}</td>
<td class="item-category">${descriptionInput.value}</td>
<td class="item-price">${priceInput.value}</td>
<td><i class="fa-solid fa-pen" onclick="editItem(event)"></i>
<i class=" fa-solid fa-trash" onclick="deleteItem(${ID})"></i></td>
  `;

  tableID.appendChild(newItem);
  moneyArr.push(parseFloat(priceInput.value));
  countMoney(moneyArr);
  itemArr.push(parseFloat(ID));
  countItem(itemArr);
  ID++;
  clearInputs();
};

const countMoney = (money) => {
  const newMoney = money.reduce((a, b) => a + b);
  totalMoney.textContent = `${newMoney} zł`;
};
const countItem = () => {
  totalItems.textContent = itemArr.length;
};

global.deleteItem = function (id) {
  const itemToDelete = document.getElementById(id);
  const itemAmount = parseFloat(itemToDelete.childNodes[7].innerText);
  const indexOfItem = moneyArr.indexOf(itemAmount);
  moneyArr.splice(indexOfItem, 1);
  tableID.removeChild(itemToDelete);
  countMoney(moneyArr);
  itemArr.splice(0, 1);
  countItem(itemArr);
};

global.editItem = function (e) {
  OLDITEM = e.target.closest("tr").id;
  EDITEDITEM = document.getElementById(OLDITEM);
  editName.value = EDITEDITEM.childNodes[1].textContent;
  editDescription.value = EDITEDITEM.childNodes[5].textContent;
  editCategory.value = EDITEDITEM.childNodes[3].textContent;
  editPrice.value = EDITEDITEM.childNodes[7].textContent;
  editPanel.style.display = "flex";

  OLDPRICE = parseFloat(editPrice.value);
};

global.chengeitem = function () {
  if (
    editName.value !== "" &&
    editDescription.value !== "" &&
    editCategory.value !== "" &&
    editPrice.value !== ""
  ) {
    EDITEDITEM.childNodes[1].textContent = editName.value;
    EDITEDITEM.childNodes[5].textContent = editDescription.value;
    EDITEDITEM.childNodes[3].textContent = editCategory.value;
    EDITEDITEM.childNodes[7].textContent = editPrice.value;
    const priceV = parseFloat(editPrice.value);

    const index = moneyArr.indexOf(OLDPRICE);
    if (index > -1) {
      moneyArr.splice(index, 1);
    }
    moneyArr.push(priceV);
    editPanel.style.display = "none";
    countMoney(moneyArr);
  } else {
    alert("You need to write some content");
  }
};

const cancelEdit = () => {
  editPanel.style.display = "none";
};

pdf.addEventListener("click", function () {
  const doc = new jsPDF();
  doc.autoTable({ html: ".tableID" });
  doc.save("Tabel.pdf");
});

global.printTable = function () {
  const tableContents = document.getElementById("printTable").innerHTML;
  const a = window.open("", "", "height=800, width=1000");
  a.document.write("<html>");
  a.document.write("<body > <h1>Table of Items: <br>");
  a.document.write(tableContents);
  a.document.write("</body></html>");
  a.document.close();
  a.print();
};

document.addEventListener("DOMContentLoaded", main);
