var request = new XMLHttpRequest(),
  plants,
  plantsList = [],
  pattern,
  selectedOption,
  selectList,
  nextBtn,
  prevBtn,
  displayRowsNum = 10,
  currPage = 0;


request.onreadystatechange = function () {
  if (request.readyState === 4) {
    if (request.status === 200) {
      localStorage.setItem("plantsList", request.responseText);
      plants = getLocalStorage();
    }
  }
};

request.open('Get', 'plants.json');

function createListRow(data, index) {

  var row,
    f,
    i,
    c,
    rowField = [],
    field,
    fields = ["name", "price", "life", "flowers", "bloom", "environment", "dust", "fruits", "leafs", "height"];

  // create list row
  row = document.createElement('div');
  if (data instanceof pattern.Flower || data.instance === "Flower") {
    row.className = "plant-row clearfix flower";
  } else if (data instanceof pattern.Tree || data.instance === "Tree") {
    row.className = "plant-row clearfix tree";
  }

  // set field and classes
  for (i = 0; i < fields.length; i++) {
    field = document.createElement('div');
    field.className = "plant-" + fields[i] + " clearfix";
    row.appendChild(field);
  }

  // fill fields with data
  for (f in data ) {
    if (typeof data[f] !== 'function' && f !== 'pattern' && f !== 'instance') {
      c =  f.split("_")[0];
      if (c === 'species') {
        row.querySelector('.plant-name').innerHTML = data[f];
      } else {
        row.querySelector('.plant-' + c).innerHTML = data[f];
      }
    }
  }

  row.style.opacity = 0;
  document.getElementsByClassName('plant-list')[0].appendChild(row);

  setTimeout(function () {
    row.style.opacity = 1;
  }, 50 * (index % displayRowsNum));

}

function clearList() {

  var row, rows, i;

  rows = document.getElementsByClassName('plant-row');
  if (rows.length < 2)
  return;

  for (i = rows.length - 1; i > 0; i--) {
    row = rows[i];
    row.parentNode.removeChild(row);
  }
}

function getLocalStorage()
{
  return JSON.parse(localStorage.getItem("plantsList")).plants;
}

function createList() {

  plants.trees.map(function (item) {
    plantsList.push(new pattern.Tree(item));
  });

  plants.flowers.map(function (item) {
    plantsList.push(new pattern.Flower(item));
  });

  plantsList.map(function (plant, i) {
    if (i > displayRowsNum * currPage && i < displayRowsNum * (currPage + 1)) {
      createListRow(plant, i);
    }
  });

}

function displayData() {

  //plants = getLocalStorage();
  selectedOption = this.selectedOptions.item(0).value;

  switch (selectedOption) {
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
    break;
  }

  plantsList = [];
  clearList();
  createList();
  setPageNum();
}

function setPageNum() {
  document.querySelector('.page-num').innerHTML = (currPage + 1) + " / " + Math.ceil(plantsList.length / displayRowsNum);
  document.querySelector('.pagination').style.visibility = "visible";
}

function prevPage() {

  if (currPage === 0)
    return;

  currPage--;
  setPageNum();
  clearList();

  plantsList.map(function (plant, i) {
    if (i > displayRowsNum * currPage && i < displayRowsNum * (currPage + 1)) {
      createListRow(plant, i);
    }
  });
}

function nextPage() {

  if (currPage >= Math.floor(plantsList.length / displayRowsNum))
    return;

  currPage++;
  setPageNum();
  clearList();

  plantsList.map(function (plant, i) {
    if (i > displayRowsNum * currPage && i < displayRowsNum * (currPage + 1)) {
      createListRow(plant, i);
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {

  selectList = document.querySelector("#pattern"),
  nextBtn = document.querySelector('.next'),
  prevBtn = document.querySelector('.prev');

  if (localStorage && localStorage.getItem('plantsList')) {
    plants = getLocalStorage();
  } else {
    request.send();
  }

  selectList.addEventListener('change', displayData);
  nextBtn.addEventListener('click', nextPage);
  prevBtn.addEventListener('click', prevPage);

});
