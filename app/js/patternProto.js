function patternP() {
  'use strict';

  function inherits(Parent, Child) {
    function F() {}
    F.prototype = Parent;
    Child.prototype = new F();
  }

  function Plant(arg) {
    this.pattern = "prototypal";
    this.species = arg.name;
    this.price = arg.price || "brak";
    this.life_cycle = arg.life_cycle || "-";
    this.flowers = arg.flowers || "-";
  }

  Plant.getPrice = function () {
    return parseFloat(this.price);
  };

  /**************** Tree ***************/

  function Tree(arg) {
    Plant.call(this, arg);
    this.leafs = arg.leafs || "-";
    this.dust_time = arg.dust || "-";
    this.fruits = arg.fruits || "-";
    this.height = arg.height || "-";
  }

  inherits(Plant, Tree);

  Tree.prototype.isDustingIn = function (month) {
    return this.dust_time === month ? true : false;
  };

  /**************** Flower ***************/

  function Flower(arg) {
    Plant.call(this, arg);
    this.bloom_time = arg.bloom || "-";
    this.environment = arg.environment || "-";
  }

  inherits(Plant, Flower);

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
