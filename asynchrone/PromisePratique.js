require('babel-register')

//synchrone
console.log('Début')
//asynchrone
getMember()
  .then(member => getArticles(member))
  .then(articles => console.log(articles))
  .catch(err => console.log(err.message))

//synchrone
console.log('Fin')

function getMember() {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      console.log('Member 1')
      resolve('Member 1')
      //reject(new Error('Error during getMember()'))
    }, 1500)
  })
}

function getArticles(member, next) {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      //resolve ([1,2,3])
      reject(new Error('Error during getArticles()'))
    }, 1500)
  })
}


// Promise

// Async / Await
