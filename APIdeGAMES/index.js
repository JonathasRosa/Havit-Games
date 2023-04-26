const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
            senha: "jscript"
        },
        {
            id: 5,
            name: "Ingrid Mendez",
            email: "img87@gmail.com",
            senha: "imlg87"
        }
    ]
}
//Listagem dos games no sistema.
app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});
//Pega um game específico com sucesso ou erro.
app.get("/game/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);
        if (game = !undefined) {
            res.statusCode = 200;
            res.json(game);
        } else {
            res.sendStatus(404)
        }
    }
})
//EndPoint para cadastrar dados/game
app.post("/game", (req, res) => {
    var { title, year, price } = req.body;
    DB.games.push({
        id: 20,
        title,
        year,
        price
    });
    res.sendStatus(200);
})
//Metodo delete
app.delete("/game/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);
        if (index == -1) {
            res.sendStatus(404);
        } else {
            DB.games.splice(index, 1)
            res.sendStatus(200)
        }
    }
});
//Metodo de edição de dados
app.put("/game/:id", (req, res) => {
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
             game.year = year
         }
         if (price != undefined) {
             game.price = price
         }
         res.sendStatus(200)
     } else {
       res.sendStatus(404);
     }
   } 
});

app.post("/auth")

app.listen(45678, () => {
    console.log("API RODANDO")
})