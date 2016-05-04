var request = new XMLHttpRequest(),
  plants,
  plantsList = [],
  treesList, plantRow,
  pattern;


request.onreadystatechange = function () {
  if (request.readyState === 4) {
    if (request.status === 200) {
      window.localStorage.setItem("plantsList", request.responseText);
    }
  }
};

request.open('Get', 'plants.json');


function createListRow(data) {

  var row;

  if (data instanceof pattern.Flower || data.instance === "Flower") {

    row = "<div class='plant-row flower clearfix'>";
    row += "<div class='plant-name'>" + data.species + "</div>";
    row += "<div class='plant-price'>" + data.price + " PLN </div>";
    row += "<div class='plant-life'>" + data.life_cycle + "</div>";
    row += "<div class='plant-flowers'>" + data.flowers + "</div>";
    row += "<div class='plant-bloom'>" + data.bloom_time + "</div>";
    row += "<div class='plant-evn'>" + data.eviroment + "</div>";
    row += "<div class='plant-dust'> - </div>";
    row += "<div class='plant-fruits'> - </div>";
    row += "<div class='plant-leafs'> - </div>";
    row += "<div class='plant-height'> - </div>";
    row += "</div>";

  } else if (data instanceof pattern.Tree || data.instance === "Tree") {

    row = "<div class='plant-row tree clearfix'>";
    row += "<div class='plant-name'>" + data.species + "</div>";
    row += "<div class='plant-price'>" + data.price + " PLN </div>";
    row += "<div class='plant-life'>" + data.life_cycle + "</div>";
    row += "<div class='plant-flowers'>" + data.flowers + "</div>";
    row += "<div class='plant-bloom'> - </div>";
    row += "<div class='plant-evn'> - </div>";
    row += "<div class='plant-dust'>" + data.dust_time + "</div>";
    row += "<div class='plant-fruits'>" + data.fruits + "</div>";
    row += "<div class='plant-leafs'>" + data.leafs + "</div>";
    row += "<div class='plant-height'>" + data.height + "</div>";
    row += "</div>";

  }

  document.querySelector(".plant-list").innerHTML += row;

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

  plantsList = [];

  h = document.querySelector('.header');
  document.querySelector('.plant-list').innerHTML = "";
  document.querySelector('.plant-list').appendChild(h);

  plants.trees.map(function (item) {
    plantsList.push(new pattern.Tree(item));
  });

  plants.flowers.map(function (item) {
    plantsList.push(new pattern.Flower(item));
  });


  plantsList.map(function (plant) {
    createListRow(plant);
  });

}

document.addEventListener('DOMContentLoaded', function () {

  var selectList = document.querySelector("#pattern");

  request.send();

  selectList.addEventListener('change', displayData);

});


