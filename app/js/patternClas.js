function patternC() {

  'use strict';

  function Plant(arg) {
    this.pattern = "pseudoclassical";
    this.species = arg.name || null;
    this.price = arg.price || null;
  }

  Plant.prototype.getPrice = function () {
    return this.price;
  };

  /**************** Flower ***************/

  function Tree(arg) {
    Plant.call(this, arg);
    this.leafs = arg.leafs || null;
    this.dust_time = arg.dust || null;
    this.fruits = arg.fruits || null;
    this.flowers = arg.flowers || null;
  }

  Tree.prototype = Object.create(Plant.prototype);

  Tree.prototype.isDustingIn = function (month) {
    return this.dust_time === month ? true : false;
  };

  /**************** Flower ***************/

  function Flower(arg) {
    Plant.call(this, arg);

    this.color = arg.color;
    this.life_cycle = arg.life_cycle;
    this.bloom_time = arg.bloom;
    this.eviroment = arg.env;
  }

  Flower.prototype = Object.create(Plant.prototype);

  Flower.prototype.isGardenFlower = function () {
    return this.eviroment.includes('garden') ? true : false;
  };

  Flower.prototype.isHomeFlower = function () {
    return this.eviroment.includes('garden') ? true : false;
  };

  return {
    Plant: Plant,
    Tree: Tree,
    Flower: Flower
  };

}
