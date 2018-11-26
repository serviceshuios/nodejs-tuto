require('babel-register')

//synchrone
console.log('Début')
//asynchrone
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('All good')
    //reject(new Error('error during ...'))
  },1500)
})
  .then(message => {console.log(message)})
  .catch(err => {console.log(err.message)})
//synchrone
console.log('Fin')

//Gestion des asynchrones



// Promise

// Async / Await
