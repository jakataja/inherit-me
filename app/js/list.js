/*global App*/
/*jslint plusplus: true*/
/*exported List*/

var List = (function () {
  "use strict";

  var listData, displayRowsNum = 10, currPage = 0,
    fields = ["species",
      "price",
      "life",
      "flowers",
      "bloom",
      "environment",
      "dust",
      "fruits",
      "leafs",
      "height"];

  function clear() {

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

  function reset() {
    currPage = 0;
  }

  function createRowElement(data) {

    var row = document.createElement("div"),
      pattern = App.getPattern();

    if (data instanceof pattern.Flower || data.instance === "Flower") {
      row.className = "plant-row clearfix flower";
    } else if (data instanceof pattern.Tree || data.instance === "Tree") {
      row.className = "plant-row clearfix tree";
    }
    return row;
  }

  function createFields(row) {
    var i, field;
    for (i = 0; i < fields.length; i++) {
      field = document.createElement("div");
      field.className = "plant-" + fields[i] + " clearfix";
      row.appendChild(field);
    }
  }

  function setFieldsData(row, data) {
    var field, c;
    for (field in data.options ) {
      if (data.options.hasOwnProperty(field)) {
        c =  field.split(/[A-Z]/)[0];
        row.querySelector(".plant-" + c).innerHTML = data.options[field];
      }
    }
  }

  function renderRow(data, index) {

    var row;
    row = createRowElement(data);
    createFields(row);
    setFieldsData(row, data);

    row.style.opacity = 0;
    document.getElementsByClassName("plant-list")[0].appendChild(row);

    setTimeout(function () {
      row.style.opacity = 1;
    }, 50 * (index % displayRowsNum));

  }

  function setPageNum() {
    var lastPage = Math.ceil(listData.length / displayRowsNum),
      pages = (currPage + 1) + " / " + lastPage;
    document.querySelector(".page-num").innerHTML = pages;
    document.querySelector(".pagination").style.visibility = "visible";
  }

  function render(data) {

    var minIndex = displayRowsNum * currPage,
      maxIndex = displayRowsNum * (currPage + 1);

    clear();
    listData = data || listData;
    listData.map(function (plant, i) {
      if (i >= minIndex && i < maxIndex) {
        renderRow(plant, i);
      }
    });
    setPageNum();
  }

  function prevPage() {
    if (currPage === 0) {
      return;
    }
    currPage--;
    render();
  }

  function nextPage() {
    if (currPage >= Math.floor(listData.length / displayRowsNum)) {
      return;
    }
    currPage++;
    render();
  }

  return {
    clear: clear,
    reset: reset,
    render: render,
    prevPage: prevPage,
    nextPage: nextPage
  };

}());
