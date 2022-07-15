//    Native prototypes
// Task 1
// Add method 'f.defer(ms) to function

Function.prototype.defer1 = function(ms) {
  setTimeout(this, ms);
};

function f1() {
  alert('Hello!');

}

f1.defer1(1000);

//Task 2
//Add the decorating 'defer()' to functions

Function.prototype.defer2 = function(ms) {
  let f = this;
  return function(...props) {
    setTimeout(() => f.apply(this, props), ms);
  }
};

function f2(a, b) {
  alert( a + b );
}

f2.defer2(1000)(1, 2);

//***********************************/
//       Prototype methods
// Task 1
// Add toString to the dictionary

let dictionary = Object.create(null, {
  toString: {
    value() {
      return Object.keys(this).join();
    }
  }
});

// add some data
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ is a regular property key here

// only apple and __proto__ are in the loop
for(let key in dictionary) {
  alert(key); // "apple", then "__proto__"
}

// your toString in action
alert(dictionary); // "apple,__proto__"

// Task 2
// The difference between calls

function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert(this.name);
};

let rabbit = new Rabbit("Rabbit");

rabbit.sayHi();  // Rabbit
Rabbit.prototype.sayHi(); // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi(); // undefined


//**************************************/
//       Prototype inheritance
// Task 1
// Working with prototype

let animal = {
  jumps: null
};
let rabbit1 = {
  __proto__: animal,
  jumps: true
};

alert( rabbit1.jumps ); // true

delete rabbit1.jumps;

alert( rabbit1.jumps ); // null

delete animal.jumps;

alert( rabbit1.jumps ); // undefined


// Task 2
// Searching algorithm

let head = {
  glasses: 1
};

let table = {
  pen: 3,
  __proto__: head
};

let bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table
};

let pockets = {
  money: 2000,
  __proto__: bed
};

console.log(pockets.pen);  // 3
console.log(bed.glasses);  // 1

// Answer the question: is it faster to get glasses as pockets.glasses or head.glasses?
// It's the same. There's no difference whether we take a property, from an object or its prototype.

// Task 3
// Where does it write?

let animal1 = {
  eat() {
    this.full = true;
  }
};

let rabbit2 = {
  __proto__: animal1
};

rabbit2.eat(); //rabbit

// Task 4
// Why are both hamsters full?

let hamster = {
  stomach: [],
  eat(food) {
    // this.stomach.push(food);
    this.stomach = [food];
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// This one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// This one also has it, why? fix please.
alert( lazy.stomach ); // apple, now is empty


//**********************************************/
// Class
// Task 1
// Rewrite to class

// function Clock({ template }) {
  
//   let timer;

//   function render() {
//     let date = new Date();

//     let hours = date.getHours();
//     if (hours < 10) hours = '0' + hours;

//     let mins = date.getMinutes();
//     if (mins < 10) mins = '0' + mins;

//     let secs = date.getSeconds();
//     if (secs < 10) secs = '0' + secs;

//     let output = template
//       .replace('h', hours)
//       .replace('m', mins)
//       .replace('s', secs);

//     console.log(output);
//   }

//   this.stop = function() {
//     clearInterval(timer);
//   };

//   this.start = function() {
//     render();
//     timer = setInterval(render, 1000);
//   };

// }

// let clock = new Clock({template: 'h:m:s'});
// clock.start();

//////// class ////////
class Clock {
  constructor({ template }) {
    // this.timer = timer;
    this.template = template;
  } 
  
 

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  };

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  };
  

}

let clock = new Clock({template: 'h:m:s'});
// clock.start();


//************************************/
// Class Inheritance
// Task 1
// Error creating an instance

class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit3 extends Animal {
  constructor(name) {
    super(name);
    // this.name = name;
    this.created = Date.now();
  }
}

let rabbit3 = new Rabbit3("White Rabbit");
alert(rabbit3.name); // White Rabbit


// Task 2
// Extended clock

class ExtendedClock extends Clock {
  constructor(template, precision) {
    super(template);
    this.precision = precision;
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), this.precision);
  }
}

let extendedClock = new ExtendedClock({template: 'h:m:s'}, 1000);
extendedClock.start();
