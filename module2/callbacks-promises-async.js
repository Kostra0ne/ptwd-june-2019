function printString(str){
    setTimeout(() => {
      console.log(str);
    }, Math.floor(Math.random() * 100));
  }
  
  function printAll(){
    printString("A");
    printString("B");
    printString("C");
  }
  
  // printAll();
  

// You will notice that A, B, and C print in a different and random order each time you call printAll!

// This is because these functions are asynchronous. Each function gets executed in order, but each one is 
// independent with it’s own setTimeout. They won’t wait for the last function to finish before they start.


// CALLBACKS

// A callback is a function that is passed to another function. 
// When the first function is done, it will run the second function.

  function printStringWithCallbacks(str, callback){
    setTimeout(() => {
      console.log(str);
      callback();
    }, Math.floor(Math.random() * 100));
  }
  function printAllWithCallbacks(){
    printStringWithCallbacks("A", () => {
      printStringWithCallbacks("B", () => {
        printStringWithCallbacks("C", () => {
          console.log("hello");
        })
      })
    })
  }
  
  // printAllWithCallbacks()
  
  // Problem with callbacks: it creates something called “Callback Hell.” 
  // solution: Promises - here to fix this nesting problem.

  // PROMISES
function printStringWithPromises(str){
    return new Promise((resolve, reject) => {
      if(str){
        setTimeout(() => {
          console.log(str);
          resolve();
        }, Math.floor(Math.random() * 100));
      } else {
        const err = new Error('String is never passed in!');
        reject(err);
      }
    });
  }
  
  function printAllWithPromises(){
    printStringWithPromises("A")
    .then(() => printStringWithPromises("B"))
    .then(() => printStringWithPromises("C"))
    .catch(err => console.log(`Error happened: ${err.message}`));
  }
  // printAllWithPromises()
  

  // ASYNC/AWAIT

// Await is basically syntactic sugar for Promises. It makes your asynchronous code look more like synchronous/procedural code, 
// which is easier for humans to understand.

// The printStringWithPromises function doesn’t change at all from the promise version.

  async function printAllWithAsync(){
    await printStringWithPromises("A");
    await printStringWithPromises("B");
    await printStringWithPromises("C");
  }
  
  printAllWithAsync()
  
  // The printString function doesn’t return anything and is independent, all we cared about was the order. 
  // Take the output of the first function, do Something with it in the second function, and then pass it to the third function.
  
  // Instead of printing the string each time, let’s make a function that will concatenate the string and pass it on.
  
  function addString(str1, str2, callback){
    setTimeout(() => {
        callback(`${str1} ${str2}`);
      }, Math.floor(Math.random() * 100)
    );
  }
  
  
  function addAll(){
    // result is callback
    addString('', 'A', result => {
      addString(result, 'B', result => {
        addString(result, 'C', result => {
         console.log(result); // Prints out " A B C"
        });
      });
    });
  }
  // addAll()
  
  function addStringWithPromises(str1, str2){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(`${str1} ${str2}`);
        }, 
        Math.floor(Math.random() * 100)
      );
    });
  }
  
  function addAllWithPromise(){  
    addStringWithPromises('', 'A')
    .then(result => addStringWithPromises(result, 'B'))
    .then(result => addStringWithPromises(result, 'C'))
    .then(result => console.log(result));
      // Prints out " A B C" 
  }
  // addAllWithPromise()
  
  
  async function addAllWithPromise(){
    let toPrint = ''
    toPrint = await addStringWithPromises(toPrint, 'A');
    toPrint = await addStringWithPromises(toPrint, 'B');
    toPrint = await addStringWithPromises(toPrint, 'C');
    console.log(toPrint); // Prints out " A B C"
  }
  addAllWithPromise();

// Additional read: 
// 1. https://medium.com/javascript-in-plain-english/a-guide-to-javascript-promises-da50eff327d7
// 2. https://scotch.io/tutorials/javascript-promises-for-dummies
