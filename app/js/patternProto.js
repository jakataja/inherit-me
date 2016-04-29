//(function () {
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
    this.price = arg.price;
  }

  Plant.getPrice = function () {
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

  inherits(Plant, Tree);

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

  inherits(Plant, Flower);

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
//}());
