function patternF() {

  'use strict';

  function Plant(arg) {
    var that = {};
    that.pattern = "functional";
    that.species = arg.name;
    that.price = arg.price || " brak ";
    that.life_cycle = arg.life_cycle || "-";
    that.flowers = arg.flowers || "-";

    that.getPrice = function () {
      return this.price;
    };
    return that;
  }

  /**************** Tree ***************/

  function Tree(arg) {
    var that = Plant(arg);
    that.instance = "Tree";
    that.leafs = arg.leafs || "-";
    that.dust_time = arg.dust || "-";
    that.fruits = arg.fruits || "-";
    that.height = arg.height || "-";

    that.isDustingIn = function (month) {
      return this.dust_time === month ? true : false;
    };

    return that;
  }

  /**************** Flower ***************/

  function Flower(arg) {
    var that = Plant(arg);
    that.instance = "Flower";
    //that.color = arg.color;
    that.bloom_time = arg.bloom || "-";
    that.environment = arg.environment || "-";

    that.isGardenFlower = function () {
      return this.eviroment.includes('garden') ? true : false;
    };

    that.isHomeFlower = function () {
      return this.eviroment.includes('garden') ? true : false;
    };

    return that;
  }

  return {
    Plant: Plant,
    Tree: Tree,
    Flower: Flower
  };

}

