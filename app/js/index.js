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

function displayData() {

  plants = JSON.parse(window.localStorage.getItem("plantsList")).plants;
  //document.querySelector(".plant-list").innerHTML = plants;

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

    var plantRow;

    if (plant instanceof pattern.Flower || plant.instance === "Flower") {
      plantRow = "<div class='plant-row flower clearfix'>";
      plantRow += "<div class='plant-name'>" + plant.species + "</div>";
      plantRow += "<div class='plant-price'>" + plant.price + " PLN </div>";
      plantRow += "<div class='plant-life'>" + plant.life_cycle + "</div>";
      plantRow += "<div class='plant-flowers'>" + plant.flowers + "</div>";
      plantRow += "<div class='plant-bloom'>" + plant.bloom_time + "</div>";
      plantRow += "<div class='plant-evn'>" + plant.eviroment + "</div>";
      plantRow += "<div class='plant-dust'> - </div>";
      plantRow += "<div class='plant-fruits'> - </div>";
      plantRow += "<div class='plant-leafs'> - </div>";
      plantRow += "<div class='plant-height'> - </div>";
      plantRow += "</div>";
    } else if (plant instanceof pattern.Tree || plant.instance === "Tree") {
      plantRow = "<div class='plant-row tree clearfix'>";
      plantRow += "<div class='plant-name'>" + plant.species + "</div>";
      plantRow += "<div class='plant-price'>" + plant.price + " PLN </div>";
      plantRow += "<div class='plant-life'>" + plant.life_cycle + "</div>";
      plantRow += "<div class='plant-flowers'>" + plant.flowers + "</div>";
      plantRow += "<div class='plant-bloom'> - </div>";
      plantRow += "<div class='plant-evn'> - </div>";
      plantRow += "<div class='plant-dust'>" + plant.dust_time + "</div>";
      plantRow += "<div class='plant-fruits'>" + plant.fruits + "</div>";
      plantRow += "<div class='plant-leafs'>" + plant.leafs + "</div>";
      plantRow += "<div class='plant-height'>" + plant.height + "</div>";
      plantRow += "</div>";
    }

    document.querySelector(".plant-list").innerHTML += plantRow;
  });

}

document.addEventListener('DOMContentLoaded', function () {

  var selectList = document.querySelector("#pattern");

  request.send();

  selectList.addEventListener('change', displayData);

});


