function patternC() {

  'use strict';

  function Plant(arg) {
    this.pattern = "pseudoclassical";
    this.species = arg.name;
    this.price = arg.price || "brak";
    this.life_cycle = arg.life_cycle || "-";
    this.flowers = arg.flowers || "-";
  }

  Plant.prototype.getPrice = function () {
    return this.price;
  };

  /**************** Tree ***************/

  function Tree(arg) {
    Plant.call(this, arg);
    this.leafs = arg.leafs || "-";
    this.dust_time = arg.dust || "-";
    this.fruits = arg.fruits || "-";
    this.height = arg.height || "-";
  }

  Tree.prototype = Object.create(Plant.prototype);

  Tree.prototype.isDustingIn = function (month) {
    return this.dust_time === month ? true : false;
  };

  /**************** Flower ***************/

  function Flower(arg) {
    Plant.call(this, arg);
    this.bloom_time = arg.bloom || "-";
    this.environment = arg.environment || "-";
  }

  Flower.prototype = Object.create(Plant.prototype);

  Flower.prototype.isGardenFlower = function () {
    return this.environment.includes('garden') ? true : false;
  };

  Flower.prototype.isHomeFlower = function () {
    return this.environment.includes('house') ? true : false;
  };

  return {
    Plant: Plant,
    Tree: Tree,
    Flower: Flower
  };

}
