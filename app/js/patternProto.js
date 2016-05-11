/*exported PatternP */

var PatternP = (function () {
  "use strict";

  function inherits(Parent, Child) {
    function F() {}
    F.prototype = Parent;
    Child.prototype = new F();
  }

  function Plant(options) {
    this.pattern = "prototypal";
    this.options = options || {};
  }

  Plant.getPrice = function () {
    return parseFloat(this.options.price);
  };

  Plant.getSpeciesName = function () {
    return this.options.species;
  };

  /**************** Tree ***************/

  function Tree(options) {
    Plant.call(this, options);
  }

  inherits(Plant, Tree);

  Tree.prototype.isDustingIn = function (month) {
    return this.options.dustTime === month ? true : false;
  };

  /**************** Flower ***************/

  function Flower(options) {
    Plant.call(this, options);
  }

  inherits(Plant, Flower);

  Flower.prototype.isGardenFlower = function () {
    return this.options.environment.includes("garden") ? true : false;
  };

  Flower.prototype.isHomeFlower = function () {
    return this.options.environment.includes("house") ? true : false;
  };

  return {
    Plant: Plant,
    Tree: Tree,
    Flower: Flower
  };

}());
