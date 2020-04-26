let animal = {
  eats: true,
  name: "animal",
  walk: function() {
    return this.name + ' ' + 'is walking!'
  }
}

let rabbit = {
  jump: true,
  name: 'rabbit'
}

Object.setPrototypeOf(rabbit, animal);

let longEar = {
  earLength: 10,
  name: 'longEar',
}

Object.setPrototypeOf(longEar, rabbit);

export { animal, rabbit, longEar };
