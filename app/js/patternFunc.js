/*exported PatternF */

var PatternF = (function () {

  "use strict";

  function plant(arg) {
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
  }

  /**************** Tree ***************/

  function tree(arg) {
    var that = plant(arg);
    that.instance = "Tree";
    that.leafs = arg.leafs || "-";
    that.dustTime = arg.dust || "-";
    that.fruits = arg.fruits || "-";
    that.height = arg.height || "-";

    that.isDustingIn = function (month) {
      return this.dustTime === month ? true : false;
    };

    return that;
  }

  /**************** Flower ***************/

  function flower(arg) {
    var that = plant(arg);
    that.instance = "Flower";
    that.bloomTime = arg.bloom || "-";
    that.environment = arg.environment || "-";

    that.isGardenFlower = function () {
      return this.environment.includes("garden") ? true : false;
    };

    that.isHomeFlower = function () {
      return this.environment.includes("house") ? true : false;
    };

    return that;
  }

  return {
    Plant: plant,
    Tree: tree,
    Flower: flower
  };

}());
