require('babel-register');
const {success, error} = require('functions');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config')

const members = [
  {
    id: 1,
    name: 'John'
  },
  {
    id: 2,
    name: 'Julien'
  },
  {
    id: 3,
    name: 'Jack'
  },
];
//Route qui va gerer les membres
let MembersRouter = express.Router();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//création des routes
MembersRouter.route('/:id')
      //GET (affiche) un membre
      .get((req,res) => {
        let index = getIndex(req.params.id);
        if(typeof(index)=='string') {
          res.json(error(index))
        } else {
          res.json(success(members[index]))
        }

      })

      //Mise à jour un membre
      .put((req,res) => {
        let index = getIndex(req.params.id);
        if(typeof(index)=='string') {
          res.json(error(index))
        } else {
          let member = members[index];
          let same = false
            for (let i=0; i < members.length;i++) {
               if(req.body.name == members[i].name && req.params.id != members[i].id) {
                 same = true
                 break
               }

            }
            if(same)
            {
              res.json(error('same name'))
            }
            else {
              members[index].name = req.body.name
              res.json(success(true))
            }
        }
      })
      // suppression d'un membre
      .delete((req,res) => {
        let index = getIndex(req.params.id);
        if(typeof(index)=='string') {
          res.json(error(index))
        }
        else {
            members.splice(index,1)
            res.json(success(members))
         }
      })

MembersRouter.route('/')
      // GET (affiche) tous les membres
      .get((req,res) => {
      if(req.query.max != undefined && req.query.max > 0)
      {
        res.json(success(members.slice(0,req.query.max)))
      }
      else if(req.query.max != undefined)
      {
          res.json(error('Wrong max value'))
      }

      else
      {
          res.json(success(members))
      }

      })

      // POST (ajoute) un membre
      .post((req,res) => {
        //res.send(req.body)

        if(req.body.name){
          let sameName = false;
          for(let i=0; i < members.length; i++) {
            if(members[i].name == req.body.name) {
              sameName = true
              break
            }
          }

          if(sameName) {
            res.json(error('name already taken'))
          }
          else {
            let member = {
              id: createID(),
              name: req.body.name
            }
          members.push(member)
          res.json(success(member))
        }
      }
        else {
          res.json(error('no name value'))
        }
      })


// url ou va agir la Route
app.use(config.rootAPI+'members', MembersRouter)

app.listen(config.port,() => {
  console.log("Started on port "+config.port)
})
// fonction de récupération des id
function getIndex(id){
  for (let i=0; i < members.length;i++) {
     if(members[i].id ==id)
        return i
  }
  return 'wrong id'
}
// fonction de gestion des ID
function createID(){
  return lastMember = members[members.length-1].id + 1;
}
