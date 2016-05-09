/*jslint plusplus: true */
/*global patternF, patternP, patternC: false */

var plants,
  plantsList = [],
  currList = [],
  pattern,
  selectedPattern,
  nextBtn,
  prevBtn,
  housePlantsChbx,
  sortPriceChbx,
  displayRowsNum = 10,
  currPage = 0,
  request = new XMLHttpRequest();

function getLocalStorage() {
  "use strict";
  return JSON.parse(localStorage.getItem("plantsList")).plants;
}

request.onreadystatechange = function () {
  "use strict";
  if (request.readyState === 4) {
    if (request.status === 200) {
      localStorage.setItem("plantsList", request.responseText);
      plants = getLocalStorage();
    }
  }
};

request.open("Get", "plants.json");

function createListRow(data, index) {

  "use strict";

  var row, f, i, c, field,
    fields = ["name",
      "price",
      "life",
      "flowers",
      "bloom",
      "environment",
      "dust",
      "fruits",
      "leafs",
      "height"];

  // create list row
  row = document.createElement("div");
  if (data instanceof pattern.Flower || data.instance === "Flower") {
    row.className = "plant-row clearfix flower";
  } else if (data instanceof pattern.Tree || data.instance === "Tree") {
    row.className = "plant-row clearfix tree";
  }

  // set field and classes
  for (i = 0; i < fields.length; i++) {
    field = document.createElement("div");
    field.className = "plant-" + fields[i] + " clearfix";
    row.appendChild(field);
  }

  // fill fields with data
  for (f in data ) {
    if (typeof data[f] !== "function" && f !== "pattern" && f !== "instance") {
      c =  f.split(/[A-Z]/)[0];
      if (c === "species") {
        row.querySelector(".plant-name").innerHTML = data[f];
      } else {
        row.querySelector(".plant-" + c).innerHTML = data[f];
      }
    }
  }

  row.style.opacity = 0;
  document.getElementsByClassName("plant-list")[0].appendChild(row);

  setTimeout(function () {
    row.style.opacity = 1;
  }, 50 * (index % displayRowsNum));

}

function clearList() {

  "use strict";

  var row, rows, i;
  rows = document.getElementsByClassName("plant-row");

  if (rows.length < 2) {
    return;
  }

  for (i = rows.length - 1; i > 0; i--) {
    row = rows[i];
    row.parentNode.removeChild(row);
  }
}

function renderList() {

  "use strict";
  currList.map(function (plant, i) {
    if (i > displayRowsNum * currPage && i < displayRowsNum * (currPage + 1)) {
      createListRow(plant, i);
    }
  });
}

function sortList() {

  "use strict";
  currList.sort(function (a, b) {

    var A = a.species.toLowerCase(),
      B = b.species.toLowerCase();

    if (A < B) {
      return -1;
    }
    if (A > B) {
      return 1;
    }
    return 0;

  });
}

function createList() {

  "use strict";

  plants.trees.map(function (item) {
    plantsList.push(new pattern.Tree(item));
  });

  plants.flowers.map(function (item) {
    plantsList.push(new pattern.Flower(item));
  });

  currList = plantsList;
  sortList();
}

function setPageNum() {
  "use strict";
  var lastPageNum = Math.ceil(currList.length / displayRowsNum),
    pages = (currPage + 1) + " / " + lastPageNum;
  document.querySelector(".page-num").innerHTML = pages;
  document.querySelector(".pagination").style.visibility = "visible";
}

function prevPage() {

  "use strict";
  if (currPage === 0) {
    return;
  }

  currPage--;
  setPageNum();
  clearList();

  currList.map(function (plant, i) {
    if (i > displayRowsNum * currPage && i < displayRowsNum * (currPage + 1)) {
      createListRow(plant, i);
    }
  });
}

function nextPage() {

  "use strict";
  if (currPage >= Math.floor(currList.length / displayRowsNum)) {
    return;
  }

  currPage++;
  setPageNum();
  clearList();

  currList.map(function (plant, i) {
    if (i > displayRowsNum * currPage && i < displayRowsNum * (currPage + 1)) {
      createListRow(plant, i);
    }
  });
}

function sortByPrice() {
  "use strict";
  currList.sort(function (a, b) {
    var A = a.getPrice(),
      B = b.getPrice();
    return A - B;
  });
}

function filterHouseFlowers() {
  "use strict";
  currList = plantsList.filter(function (plant) {
    if (plant.isHomeFlower && plant.isHomeFlower()) {
      return plant;
    }
  });
}

function clickFilterHouseFlowers() {

  "use strict";

  clearList();
  currPage = 0;

  if (housePlantsChbx.checked) {
    filterHouseFlowers();
  } else {
    currList = plantsList;
    (sortPriceChbx.checked ? sortByPrice : sortList)();
  }

  renderList();
  setPageNum();
}

function clickSortByPrice() {
  "use strict";
  clearList();
  (sortPriceChbx.checked ? sortByPrice : sortList)();
  renderList();
}

function displayData() {

  "use strict";

  switch (selectedPattern.value) {
  case "functional":
    pattern = patternF();
    break;

  case "prototypal":
    pattern = patternP();
    break;

  case "pseudoclassical":
    pattern = patternC();
    break;

  default:
    pattern = undefined;
    break;
  }

  currList = plantsList = [];
  clearList();

  if (pattern) {
    housePlantsChbx.disabled = false;
    sortPriceChbx.disabled = false;

    createList();

    if (sortPriceChbx.checked) {
      sortByPrice();
    }

    if (housePlantsChbx.checked) {
      filterHouseFlowers();
    }

    renderList();
    setPageNum();

  } else {

    document.querySelector(".pagination").style.visibility = "hidden";
    housePlantsChbx.disabled = true;
    sortPriceChbx.disabled = true;

  }
}

document.addEventListener("DOMContentLoaded", function () {

  "use strict";
  selectedPattern = document.querySelector("#pattern");
  nextBtn = document.querySelector(".next");
  prevBtn = document.querySelector(".prev");
  housePlantsChbx = document.querySelector("#houseplants");
  sortPriceChbx = document.querySelector("#sortprice");

  if (localStorage && localStorage.getItem("plantsList")) {
    plants = getLocalStorage();
  } else {
    request.send();
  }

  selectedPattern.addEventListener("change", displayData);
  nextBtn.addEventListener("click", nextPage);
  prevBtn.addEventListener("click", prevPage);
  housePlantsChbx.addEventListener("change", clickFilterHouseFlowers);
  sortPriceChbx.addEventListener("change", clickSortByPrice);

});
