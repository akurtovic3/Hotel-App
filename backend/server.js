const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "hotel_db",
  port:3308
});

db.connect();

app.get("/", (req, res) => {
    res.send("hello world")
})


app.get("/rezervacije", (req, res) => {
  db.query("SELECT * FROM rezervacija", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/kreirajNeregistrovanogKorisnika", (req, res) => {
  const ime = req.body.ime;
  const prezime = req.body.prezime;
  const br_tel = req.body.br_tel;
  const tip = "NG";
  const email = req.body.email;

  db.query(
    "INSERT INTO korisnik (ime, prezime, email, br_tel, tip) VALUES (?,?,?,?,?)",
    [ime, prezime, email, br_tel, tip],
    (err, result, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send({"id_korisnik":result.insertId})
        console.log(result.insertId);
      }
    }
  );
});

app.get('/raspoloziveSobe', function (req, res) {
  const start_date=req.query.start_date;
  const end_date = req.query.end_date;
  console.log(start_date)
  console.log(end_date)
    db.query("SELECT id_soba FROM rezervacija WHERE end_date<(?) or start_date>(?)",
    [start_date, end_date], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        var niz=[];
        console.log(result)
        var string=JSON.stringify(result);
        console.log(string)
        var json =  JSON.parse(string);
        console.log(json)
        

        res.send(json)
      }
    });
  
  
          
});

app.post("/kreirajRezervaciju", (req, res) => {
  const id_korisnik = req.body.id_korisnik;
  const id_soba = req.body.id_soba;
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;
  const br_djece = req.body.br_djece;
  const br_odraslih = req.body.br_odraslih;
  const dorucak = req.body.dorucak;
  const rucak = req.body.rucak;
  const vecera = req.body.vecera;
  const spa = req.body.spa;
  const bazen = req.body.bazen;
  const cijena = req.body.cijena;

  db.query(
    "INSERT INTO rezervacija (id_korisnik, id_soba, start_date, end_date, br_djece,br_odraslih, dorucak, rucak, vecera, spa, bazen, cijena) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
    [id_korisnik, id_soba, start_date, end_date, br_djece,br_odraslih, dorucak, rucak, vecera, spa, bazen, cijena],
    (err, result, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});