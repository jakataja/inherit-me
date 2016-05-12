/*global List, PatternF, PatternP, PatternC: false */
/*exported App */
/*jslint plusplus: true*/

var App = (function () {

  "use strict";

  var plants, pattern, currList, plantsList = [],
    selectedPattern = document.querySelector("#pattern"),
    housePlantsChbx = document.querySelector("#houseplants"),
    sortPriceChbx = document.querySelector("#sortprice"),
    nextBtn = document.querySelector(".next"),
    prevBtn = document.querySelector(".prev");

  function getLocalStorage() {
    plants = JSON.parse(localStorage.getItem("plantsList")).plants;
  }

  function onRequest(request) {
    return function () {
      if (request.readyState === 4 && request.status === 200) {
        localStorage.setItem("plantsList", request.responseText);
        plants = JSON.parse(request.responseText).plants;
      }
    };
  }

  function loadJSON() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = onRequest(request);
    request.open("Get", "plants.json");
    request.send();
  }

  function getData() {
    if (localStorage && localStorage.getItem("plantsList")) {
      getLocalStorage();
    } else {
      loadJSON();
    }
  }

  function sortList() {

    currList.sort(function (a, b) {

      var A = a.getSpeciesName().toLowerCase(),
        B = b.getSpeciesName().toLowerCase();

      if (A < B) {
        return -1;
      }
      if (A > B) {
        return 1;
      }
      return 0;

    });
  }

  function getListData() {

    plants.trees.map(function (item) {
      plantsList.push(new pattern.Tree(item));
    });

    plants.flowers.map(function (item) {
      plantsList.push(new pattern.Flower(item));
    });

    currList = plantsList;
    sortList();
  }

  function sortByPrice() {
    currList.sort(function (a, b) {
      var A = a.getPrice(),
        B = b.getPrice();
      return A - B;
    });
  }

  function filterHouseFlowers() {
    currList = plantsList.filter(function (plant) {
      if (plant.isHomeFlower && plant.isHomeFlower()) {
        return plant;
      }
    });
  }

  function clickFilterHouseFlowers() {
    if (housePlantsChbx.checked) {
      filterHouseFlowers();
    } else {
      currList = plantsList;
      (sortPriceChbx.checked ? sortByPrice : sortList)();
    }
    List.reset();
    List.render(currList);
  }

  function clickSortByPrice() {
    (sortPriceChbx.checked ? sortByPrice : sortList)();
    List.render(currList);
  }


  function displayData() {

    switch (selectedPattern.value) {
    case "functional":
      pattern = PatternF;
      break;

    case "prototypal":
      pattern = PatternP;
      break;

    case "pseudoclassical":
      pattern = PatternC;
      break;

    default:
      pattern = undefined;
      break;
    }

    currList = plantsList = [];

    if (pattern) {
      housePlantsChbx.disabled = false;
      sortPriceChbx.disabled = false;
      getListData();

      if (sortPriceChbx.checked) {
        sortByPrice();
      }

      if (housePlantsChbx.checked) {
        filterHouseFlowers();
      }

      List.render(currList);

    } else {

      List.clear();
      document.querySelector(".pagination").style.visibility = "hidden";
      housePlantsChbx.disabled = true;
      sortPriceChbx.disabled = true;

    }
  }

  return {

    init: function () {
      getData();
      selectedPattern.addEventListener("change", displayData);
      nextBtn.addEventListener("click", List.nextPage);
      prevBtn.addEventListener("click", List.prevPage);
      housePlantsChbx.addEventListener("change", clickFilterHouseFlowers);
      sortPriceChbx.addEventListener("change", clickSortByPrice);
    },

    getPattern: function () {
      return pattern;
    }
  };

}());
