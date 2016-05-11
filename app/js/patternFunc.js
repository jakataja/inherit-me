/*exported PatternF */

var PatternF = (function () {

  "use strict";

  /*function plant(arg) {
    var that = {};
    that.pattern = "functional";
    that.species = arg.name;
    that.price = arg.price || " brak ";
    that.lifeCycle = arg.lifeCycle || "-";
    that.flowers = arg.flowers || "-";

    that.getPrice = function () {
      return this.price;
    };
    return that;
  } */

  function plant(options) {

    var plantObject = {};
    plantObject.pattern = "functional";
    plantObject.options = options || {};

    plantObject.getPrice = function () {
      return parseFloat(this.options.price);
    };

    plantObject.getSpeciesName = function () {
      return this.options.species;
    };
    return plantObject;
  }

  /**************** Tree ***************/

  function tree(options) {

    var treeObject = plant(options);
    treeObject.instance = "Tree";
    treeObject.isDustingIn = function (month) {
      return this.options.dustTime === month ? true : false;
    };

    return treeObject;
  }

  /**************** Flower ***************/

  function flower(options) {

    var flowerObject = plant(options);
    flowerObject.instance = "Flower";
    flowerObject.isGardenFlower = function () {
      return this.options.environment.includes("garden") ? true : false;
    };
    flowerObject.isHomeFlower = function () {
      return this.options.environment.includes("house") ? true : false;
    };

    return flowerObject;
  }

  return {
    Plant: plant,
    Tree: tree,
    Flower: flower
  };

}());
