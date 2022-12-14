const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");


connection
   .authenticate()
   .then(()=>{
      console.log("Conexão feita com o banco de dados!")
   })
   .catch((msgErro) => {
      console.log(msgErro);
   })


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extend: false}))
app.use(bodyParser.json());

app.get("/",(req,res)=> {
      res.render ("index");
});

app.get("/perguntar",(req, res)=>{
    res.render("perguntar");
})

app.post("/salvarpergunta", (req,res)=> {

  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  console.log(titulo)
  console.log(descricao)
  
  Pergunta.create({
      titulo: titulo,
      descricao: descricao
    }).then(()=> {
      res.redirect("/");
    });
});


app.listen(8080,()=>{console.log("App rodando!");});


