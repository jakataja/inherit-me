var request = new XMLHttpRequest(),
  plants,
  plantsList = [],
  treesList,
  plantRow,
  pattern,
  displayRowsNum = 10,
  currPage = 0;


request.onreadystatechange = function () {
  if (request.readyState === 4) {
    if (request.status === 200) {
      window.localStorage.setItem("plantsList", request.responseText);
    }
  }
};

request.open('Get', 'plants.json');


function createListRow(data, index) {

  var row,
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
  for (var i=0; i<fields.length; i++){
    field = document.createElement('div');
    field.className = "plant-" + fields[i] + " clearfix";
    row.appendChild(field);
  }

  // fill fields with data
 for(var f in data ){

   if(typeof data[f] !== 'function' && f !== 'pattern' && f !== 'instance') {
     var c =  f.split("_")[0];
     if( c === 'species')
      row.querySelector('.plant-name').innerHTML = data[f];
     else
      row.querySelector('.plant-'+c).innerHTML = data[f];
   }

  }

  row.style.opacity = 0;
  document.getElementsByClassName('plant-list')[0].appendChild(row);

  setTimeout(function () {
    row.style.opacity = 1;
  }, 50*index);

}

function clearList() {

  var rows;

  plantsList = [];

  rows = document.getElementsByClassName('plant-row');
  if( rows.length < 2) return;

  for(var i=rows.length-1; i>0; i--){
    row = rows[i];
    row.parentNode.removeChild(row);
  }
}

function displayData() {

  plants = JSON.parse(window.localStorage.getItem("plantsList")).plants;

  var selectedOption = this.selectedOptions.item(0).value;

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

  clearList();

  plants.trees.map(function (item) {
    plantsList.push(new pattern.Tree(item));
  });

  plants.flowers.map(function (item) {
    plantsList.push(new pattern.Flower(item));
  });

  plantsList.map(function (plant, i) {
    if( i > displayRowsNum*currPage && i < displayRowsNum*(currPage+1)) {
      createListRow(plant, i);
    }
  });

}

document.addEventListener('DOMContentLoaded', function () {

  var selectList = document.querySelector("#pattern");

  request.send();

  selectList.addEventListener('change', displayData);

});


