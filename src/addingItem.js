function deletedItem(id) {
  //   const itemToDelete = document.getElementById(id);
  //   const itemAmount = parseFloat(itemToDelete.childNodes[1].innerText);
  //   const indexOfItem = money.Arr.indexOf(itemAmount);
  //   moneyArr.splice(indexOfItem, 1);
  //   itemArea.removeChild(itemToDelete);
  //   countMoney(moneyArr);

  const itemToDelete = document.getElementById(id);
  const itemAmount = itemToDelete.childNodes[7].innerText;
  const indexOfItem = money.Arr.indexOf(itemAmount);
  moneyArr.splice(indexOfItem, 1);
  itemArea.removeChild(itemToDelete);
  countMoney(moneyArr);

  // const indexOfItem = moneyArr.indexOf(itemAmount);
  // moneyArr.splice(indexOfItem, 1);
  // itemArea.removeChild(itemToDelete);
  // countMoney(moneyArr);
}

export default deletedItem;
