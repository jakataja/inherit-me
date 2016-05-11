/*exported PatternC */

var PatternC = (function () {

  "use strict";

  // plantOptions: species, price, lifeCycle, flowers

  function Plant(options) {
    this.pattern = "pseudoclassical";
    this.options = options || {};
  }

  Plant.prototype.getPrice = function () {
    return parseFloat(this.options.price);
  };

  Plant.prototype.getSpeciesName = function () {
    return this.options.species;
  };

  /**************** Tree ***************/

  // tree options: leafs, dustTime, fruits, height

  function Tree(options) {
    Plant.call(this, options);
  }

  Tree.prototype = Object.create(Plant.prototype);

  Tree.prototype.isDustingIn = function (month) {
    return this.options.dustTime === month ? true : false;
  };

  /**************** Flower ***************/

  // flower options: bloomTime, environment

  function Flower(options) {
    Plant.call(this, options);
  }

  Flower.prototype = Object.create(Plant.prototype);

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
