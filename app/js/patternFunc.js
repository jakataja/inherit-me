function patternF() {

  'use strict';

  function Plant(arg) {
    var that = {};
    that.pattern = "functional";
    that.species = arg.name;
    that.price = arg.price;
    that.getPrice = function () {
      return this.price;
    };
    return that;
  }

  /**************** Tree ***************/

  function Tree(arg) {
    var that = Plant(arg);
    that.leafs = arg.leafs || null;
    that.dust_time = arg.dust || null;
    that.fruits = arg.fruits || null;
    that.flowers = arg.flowers || null;

    that.isDustingIn = function (month) {
      return this.dust_time === month ? true : false;
    };

    return that;
  }

  /**************** Flower ***************/

  function Flower(arg) {
    var that = Plant(arg);
    that.color = arg.color;
    that.life_cycle = arg.life_cycle;
    that.bloom_time = arg.bloom;
    that.eviroment = arg.env;

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

