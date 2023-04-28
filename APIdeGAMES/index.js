const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

//Após instalar o pacote (npm install --save jsonwebtoken)
//Chave secreta:
const JWTSecret = "51005353JRosa"

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// HEADERS - proteção de rotas utilizando JWT
function auth(req, res, next){
    const authToken = req.headers['authorization'];
    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        var token = bearer[1];
        jwt.verify(token, JWTSecret, (err, dataToken) => {
            if (err) {
                res.status(401);
                res.json({ err: "Token Inválido" });
            } else {
                req.token = token;
                req.loggedUser = { id: data.id, email: data.email };
                req.empresa = "Havit-Games";
                next();
            }
        });
    } else {
        res.status(401);
        res.json({ err: "Token Inválido" });
    } 
}

var DB = {
    games: [
        {
            id: 0,
            title: "Call of Duty - MW",
            year: 2019,
            price: 60
        },
        {
            id: 1,
            title: "Prince of Persia",
            year: 2002,
            price: 25
        } ,
        {
            id: 2,
            title: "God of War - 3",
            year: 2010,
            price: 30
        }
    ],
    users: [
        {
            id: 1,
            name: "Jonathas Rosa",
            email: "jsilvarosa85@gmail.com",
            password: "jscript"
        },
        {
            id: 2,
            name: "Ingrid Mendez",
            email: "img87@gmail.com",
            password: "imlg87"
        }
    ]
}

//Listagem dos games no sistema.
app.get("/games", auth, (req, res) => {
  //Parametros para API RestFull
  var HATEOAS = [
    {
      href: "http://localhost:45678/game/:0",
      method: "DELETE",
      rel: "delet_game"
    },
    {
      href: "http://localhost:45678/game/:0",
      method: "GET",
      rel: "get_game"
    },
    {
      href: "http://localhost:45678/auth",
      method: "POST",
      rel: "login"
    }
  ]
  res.statusCode = 200;
  res.json({games: DB.games, _link: HATEOAS });
});
//Pega um game específico com sucesso ou erro.
app.get("/game/:id", auth, (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400)
  } else {
    var id = parseInt(req.params.id);

    var HATEOAS = [
      {
        href: "http://localhost:45678/game/"+id,
        method: "DELETE",
        rel: "delet_game",
      },
      {
        href: "http://localhost:45678/game/"+id,
        method: "PUT",
        rel: "edit_game",
      },
      {
        href: "http://localhost:45678/game/"+id,
        method: "GET",
        rel: "get_game",
      },
      {
        href: "http://localhost:45678/games",
        method: "GET",
        rel: "get_all_ganes",
      },
    ];

    var game = DB.games.find(g => g.id == id);
    if (game = !undefined) {
      res.statusCode = 200;
      res.json({ game, _link: HATEOAS });
    } else {
      res.sendStatus(404)
    }
  }
})
//EndPoint para cadastrar dados/game
app.post("/game", auth, (req, res) => {
  var { title, year, price } = req.body;
  DB.games.push({
    id: 20,
    title,
    year,
    price,
  });
  res.sendStatus(200);
});
//Metodo delete
app.delete("/game/:id", auth, (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var index = DB.games.findIndex((g) => g.id == id);
    if (index == -1) {
      res.sendStatus(404);
    } else {
      DB.games.splice(index, 1);
      res.sendStatus(200);
    }
  }
});
//Metodo de edição de dados
app.put("/game/:id", auth, (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var game = DB.games.find((g) => g.id == id);
    if ((game = !undefined)) {
      var { title, year, price } = req.body;
      if (title != undefined) {
        game.title = title;
      }
      if (year != undefined) {
        game.year = year;
      }
      if (price != undefined) {
        game.price = price;
      }
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});
//Endpoint de autenticação com JWT
app.post("/auth", auth, (req, res) => {
  var { email, password } = req.body;
  if (email != undefined) {
    var user = DB.users.find((u) => u.email == email);
    if (user != undefined) {
      if (user.password == password) {
          jwt.sign({ id: user.id, email: user.email },JWTSecret,{ expiresIn: "48h" },(err, token) => {
            if (err) {
              res.status(400);
              res.json({ err: "Falha interna" });
            } else {
              res.status(200);
              res.json({ token: token });
            }
        });
      } else {
        res.status(401);
        res.json({ err: "Credenciasis inválida." });
      }
    } else {
      res.status(404);
      res.json({ err: "O E-mail enviado não existe na base de dados!" });
    }
  } else {
    res.status(400);
    res.json({ err: "O E-mail enviado é inválido" });
  }
});

app.listen(45678, () => {
    console.log("API RODANDO")
})