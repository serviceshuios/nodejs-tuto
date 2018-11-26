require('babel-register')

//synchrone
console.log('Début')
//asynchrone
getMember((member) => {
  console.log(member)
  getArticles(member, (articles) => {
    console.log(articles)
  })
})
//synchrone
console.log('Fin')

//Gestion des asynchrones
//Callbacks
function getMember(next) {
  setTimeout(() => {
    next('Member 1')
  }, 1500)
}

function getArticles(member, next) {
  setTimeout(() => {
    next ([1,2,3])
  }, 1500)
}


// Promise

// Async / Await
