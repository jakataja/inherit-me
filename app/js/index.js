var request = new XMLHttpRequest(),
  plantsList;


request.onreadystatechange = function () {
  if (request.readyState === 4) {
    if (request.status === 200) {
      window.localStorage.setItem("plantsList", request.responseText);
    }
  }
};

request.open('Get', 'plants.json');



document.addEventListener('DOMContentLoaded', function () {

  var selectList = document.querySelector("#pattern");

  function displayData() {

    //plantsList = JSON.parse(window.localStorage.getItem("plantsList"));
    plantsList = window.localStorage.getItem("plantsList");
    document.querySelector(".plant-list").innerHTML = plantsList;
  }

  request.send();

  selectList.addEventListener('change', displayData);

});


