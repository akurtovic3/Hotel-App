const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
bodyParser = require('body-parser');
var moment = require('moment');

const nodemailer = require('nodemailer');
const multer = require('multer');
var path = require('path');
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
  port: 3306
});

db.connect();

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'icrmail2021@gmail.com',
    pass: 'Icrmail1234!'
  }
});


app.get("/", (req, res) => {
  res.send("hello world")
})

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));
const storageop = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './uploads')
  },
  filename: (req, file, callBack) => {
    var fname = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    var naziv = "slika" + path.extname(file.originalname);
    callBack(null, fname)
  }
})
let upload = multer({ storage: storageop })

app.post('/uploadSliku', upload.single('file'), (req, res, next) => {
  const file = req.file;
  console.log(file.path);
  const path = req.protocol + "://localhost:3001/uploads/" + req.file.path.substr(8, req.file.path.length - 8)
  console.log(path)
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(path);
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
function sortFunction(a, b) {
  return moment(a.start_date).format('YYYY-MM-DD') > moment(b.start_date).format('YYYY-MM-DD') ? 1 : -1;
};

app.get("/zauzeteSobe", (req, res) => {
  console.log(req.query.start_date);
  console.log(req.query.end_date)
  db.query("SELECT * FROM rezervacija WHERE (start_date<=? AND end_Date<=? AND end_Date>?) OR (start_date<? AND end_Date>?) OR (start_date>=? AND end_Date<=?) OR (start_date<=? AND end_Date>=?)", [req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.end_date, req.query.start_date, req.query.end_date, req.query.start_date, req.query.end_date], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //result[0].sort(sortFunction());
      var string = JSON.stringify(result);
      console.log(string)
      var json = JSON.parse(string);
      console.log(json)


      res.send(json)
    }
  });

});

app.get("/pregledRezervacija", (req, res) => {
  db.query("SELECT * FROM rezervacija WHERE start_date>=?", [moment().format('YYYY-MM-DD hh:mm:ss')], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //result[0].sort(sortFunction());
      result.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.start_date) - new Date(b.start_date);
      });
      res.send(result);
    }
  });
});

app.get("/pregledSpecijalnihPonuda", (req, res) => {
  db.query("SELECT * FROM specijalne_ponude WHERE startDatePonude>=? or endDatePonude>=?", [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //result[0].sort(sortFunction());
      result.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.start_date) - new Date(b.start_date);
      });
      console.log(result)
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
        res.send({ "id_korisnik": result.insertId })
        console.log(result.insertId);
      }
    }
  );
});

app.get('/provjeraKodaZaPopust', function (req, res) {
  const kod = req.query.kod

  db.query("SELECT * FROM rezervacija WHERE kod=?",
    [kod], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        var niz = [];
        console.log(result)
        var string = JSON.stringify(result);
        console.log(string)
        var json = JSON.parse(string);
        console.log(json)


        res.send(json)
      }
    });
});
app.get('/kodZaPopust', function (req, res) {
  const kod = req.query.kod

  db.query("SELECT * FROM kod WHERE kod_tekst=?",
    [kod], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        var niz = [];
        console.log(result)
        var string = JSON.stringify(result);
        console.log(string)
        var json = JSON.parse(string);
        console.log(json)


        res.send(json)
      }
    });
});
app.get('/raspoloziveSobe', function (req, res) {
  const start_date = moment(req.query.start_date).format('YYYY-MM-DD');
  const end_date = moment(req.query.end_date).format('YYYY-MM-DD');
  console.log(start_date)
  console.log(end_date)
  db.query("SELECT id_soba FROM rezervacija WHERE (end_Date<=? AND start_date<?) OR (end_Date>? AND start_date>=?)",
    [start_date, start_date, end_date, end_date], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        var niz = [];
        console.log(result)
        var string = JSON.stringify(result);
        console.log(string)
        var json = JSON.parse(string);
        console.log(json)


        res.send(json)
      }
    });



});

app.get('/sveSobeUnutarBaze', function (req, res) {
  db.query("SELECT id_soba FROM rezervacija", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      var niz = [];
      console.log(result)
      var string = JSON.stringify(result);
      console.log(string)
      var json = JSON.parse(string);
      console.log(json)


      res.send(json)
    }
  });



});

app.get('/specijalnePonude', function (req, res) {
  db.query("SELECT * FROM specijalne_ponude", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      var niz = [];
      console.log(result)
      var string = JSON.stringify(result);
      console.log(string)
      var json = JSON.parse(string);
      console.log(json)


      res.send(json)
    }
  });



});
app.get("/login", (req, res) => {
  const password = req.query.password;
  const username = req.query.username;
  console.log(username)
  console.log(password)
  db.query("SELECT * FROM zaposlenici WHERE username=? AND password=?", [username, password], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(username)
      console.log(password)
      var string = JSON.stringify(result);
      console.log(string)
      var json = JSON.parse(string);
      console.log(json)


      res.send(json)
    }
  })
});

app.get("/zaposlenik", (req, res) => {
  const id = req.query.id;
  console.log(id)
  db.query("SELECT * FROM zaposlenici WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      var string = JSON.stringify(result);
      console.log(string)
      var json = JSON.parse(string);
      console.log(json)


      res.send(json)
    }
  })
});

app.get("/korisnik", (req, res) => {
  const id = req.query.id;
  console.log(id)
  db.query("SELECT * FROM korisnik WHERE id_korisnika=?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      var string = JSON.stringify(result);
      console.log(string)
      var json = JSON.parse(string);
      console.log(json)


      res.send(json)
    }
  })
});

app.get("/filtrirajPregledRezervacija", (req, res) => {
  let start_date = moment().format('YYYY-MM-DD');
  if (typeof req.query.start_date !== 'undefined' && req.query.start_date !== null) {
    start_date = req.query.start_date;
  }
  let niz = []
  niz = [...niz, start_date];
  let sql = "SELECT * FROM rezervacija WHERE start_date>=?";
  console.log(req.query.mijenjanEndDate)
  if (typeof req.query.end_date !== 'undefined' && req.query.end_date !== null && req.query.end_date > req.query.start_date) {
    sql = sql + " AND start_date<=?"
    niz = [...niz, req.query.end_date];
  }
  if (typeof req.query.id_soba !== 'undefined' && req.query.id_soba !== null && req.query.id_soba !== "") {
    sql = sql + " AND id_soba=?"
    niz = [...niz, req.query.id_soba];
  }
  if (typeof req.query.ime !== 'undefined' && req.query.ime !== null && req.query.ime !== "") {
    var text = '%' + req.query.ime + '%';
    sql = sql + " AND (id_korisnik IN (SELECT id_korisnika FROM korisnik WHERE ime LIKE ?))"
    niz = [...niz, text];
  }
  if (typeof req.query.prezime !== 'undefined' && req.query.prezime !== null && req.query.prezime !== "") {
    var text = '%' + req.query.prezime + '%';
    sql = sql + " AND (id_korisnik IN (SELECT id_korisnika FROM korisnik WHERE prezime LIKE ?))"
    niz = [...niz, text];
  }

  if (typeof req.query.br_gostiju !== 'undefined' && req.query.br_gostiju !== null && req.query.br_gostiju != -1 && req.query.br_gostiju !== "") {
    sql = sql + " AND (br_djece+br_odraslih)=?"
    niz = [...niz, req.query.br_gostiju];
  }
  console.log(niz)
  db.query(sql, niz, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      var string = JSON.stringify(result);
      console.log(string)
      var json = JSON.parse(string);
      console.log(json)


      res.send(json)
    }
  })
});

app.get("/filtrirajSpecijalnePonude", (req, res) => {
  let start_date = moment().format('YYYY-MM-DD');
  if (typeof req.query.start_date !== 'undefined' && req.query.start_date !== null) {
    start_date = req.query.start_date;
  }
  let niz = []
  let sql = ""
  console.log("uslo")
  //if (typeof req.query.end_date !== 'undefined' && req.query.end_date !== null && req.query.mijenjanEndDate && req.query.end_date>req.query.start_date){
  sql = "SELECT * FROM specijalne_ponude WHERE ((startDatePonude<=? AND endDatePonude<=? AND endDatePonude>?) OR (startDatePonude<=? AND endDatePonude>=?) OR (startDatePonude>=? AND endDatePonude<=?) OR (startDatePonude<=? AND endDatePonude>=?))";
  niz = [...niz, start_date, req.query.end_date, start_date, req.query.end_date, req.query.end_date, start_date, req.query.end_date, start_date, req.query.end_date];

  if (typeof req.query.text1 !== 'undefined' && req.query.text1 !== null && req.query.text1 !== "") {
    var text = '%' + req.query.text1 + '%';
    sql = sql + " AND text1 LIKE ?"
    niz = [...niz, text];
  }
  console.log(sql)
  console.log(niz)
  db.query(sql, niz, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      var string = JSON.stringify(result);
      console.log(string)
      var json = JSON.parse(string);
      console.log(json)


      res.send(json)
    }
  })
});

app.put("/updateRadnik", (req, res) => {
  console.log(req.body.id);
  console.log(req.body.username);
  const id = req.body.id;
  const ime = req.body.ime;
  const prezime = req.body.prezime;
  const mail = req.body.mail;
  const tel = req.body.tel;
  const username = req.body.username;
  const adresa = req.body.adresa;
  const grad = req.body.grad;
  const drzava = req.body.drzava;
  db.query("UPDATE zaposlenici SET ime=?, prezime=?, mail=?, tel=?, username=?, adresa=?, grad=?, drzava=? WHERE id=?",
    [ime, prezime, mail, tel, username, adresa, grad, drzava, id],
    (err, result, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );

})

app.put("/azurirajNeregistrovanogKorisnika", (req, res) => {
  const id_korisnika = req.body.id;
  const ime = req.body.ime;
  const prezime = req.body.prezime;
  const email = req.body.email;
  const br_tel = req.body.br_tel;
  db.query("UPDATE korisnik SET ime=?, prezime=?, email=?, br_tel=?  WHERE id_korisnika=?",
    [ime, prezime, email, br_tel, id_korisnika],
    (err, result, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );

})
app.put("/azurirajRezervaciju", (req, res) => {
  const id_rezervacije = req.body.id;
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
  const popust = req.body.popust;
  const kod = req.body.kod;
  const specZahtj = req.body.specZahtj;
  console.log(id_korisnik)
  db.query(
    "UPDATE rezervacija SET id_korisnik=?, id_soba=?, start_date=?, end_Date=?, br_djece=?,br_odraslih=?, dorucak=?, rucak=?, vecera=?, spa=?, bazen=?, cijena=?, kod=?, popust=?, specijalni_zahtjevi=?  WHERE id_rezervacije=?",
    [id_korisnik, id_soba, start_date, end_date, br_djece, br_odraslih, dorucak, rucak, vecera, spa, bazen, cijena, kod, popust, specZahtj, id_rezervacije],
    (err, result, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
})

app.post("/kreirajSpecijalnuPonudu", (req, res) => {
  const idjeviSoba = req.body.idjeviSoba;
  const startDatePonude = req.body.startDatePonude;
  const endDatePonude = req.body.endDatePonude;
  const text1 = req.body.text1;
  const text2 = req.body.text2;
  const src = req.body.src;
  const popust = req.body.popust;
  const label = popust + "% popusta";
  const opis =
    db.query("INSERT INTO specijalne_ponude (idoviSoba, startDatePonude, endDatePonude, text1, text2, src, popust, label) VALUES (?,?,?,?,?,?,?,?)",
      [idjeviSoba, startDatePonude, endDatePonude, text1, text2, src, popust, label],
      (err, result, fields) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
});

app.post("/unesiKod", (req, res) => {
  const kod_tekst = req.body.kod_tekst;
  const ime = req.body.ime;
  const prezime = req.body.prezime;
  const popust = req.body.popust;
  console.log(kod_tekst)
  db.query(
    "INSERT INTO kod (kod_tekst, popust, ime, prezime) VALUES (?,?,?,?)",
    [kod_tekst, popust, ime, prezime],
    (err, result, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
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
  const popust = req.body.popust;
  const kod = req.body.kod;
  const specZahtj = req.body.specZahtj;

  db.query(
    "INSERT INTO rezervacija (id_korisnik, id_soba, start_date, end_Date, br_djece,br_odraslih, dorucak, rucak, vecera, spa, bazen, cijena, kod, popust, specijalni_zahtjevi) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [id_korisnik, id_soba, start_date, end_date, br_djece, br_odraslih, dorucak, rucak, vecera, spa, bazen, cijena, kod, popust, specZahtj],
    (err, result, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete('/obrisiRezervaciju', function (req, res) {
  const id = req.query.id;
  db.query("DELETE FROM rezervacija WHERE id_rezervacije=?", [id], (err, result, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  }
  );
})
app.post('/posaljiMail', (req, res) => {
  const { to, subject, ime, id_sobe, start_date, end_date, specZahtj, kod } = req.body;
  var spec = specZahtj !== "" ? specZahtj : "--"
  console.log(specZahtj)
  const mailData = {
    from: "icrmail2021@gmail.com",
    to: to,
    subject: subject,
    text: "Pozdrav " + ime + ", \n\nHvala Vam što ste izabrali Vilu Nezirović. Nadamo se da ćemo ispuniti Vaša iščekivanja i upotpuniti Vaš odmor našim uslugama!\n\nDetalji vaše rezervacije:\nDatum prijave: " + moment(start_date).format('DD.MM.YYYY') + "\nDatum odjave: " + moment(end_date).format('DD.MM.YYYY') + "\nSoba: " + id_sobe + "\nSpecijalni zahtjevi: " + spec + "\n\nPrilikom sljedeće rezervacije naših usluga unesite sljedeći kod i iskoristite popust od 10% na cjelokupnu cijenu rezervacije:\n\n" + kod + "\n\nAdresa hotela: Doni Štoj 85360, Crna Gora\nBroj telefona: +382 68 226 337\nUkoliko želite izvršiti izmjene ili Vam je potrebna naša asistencija, molimo Vas da pozovete broj +382 68 226 337. \n\nIščekujemo Vaš dolazak!\nVila Nezirović",

  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
});
app.post('/posaljiUpdateMail', (req, res) => {
  const { to, subject, ime, id_sobe, start_date, end_date, specZahtj } = req.body;
  var spec = (specZahtj !== "" && specZahtj !== null) ? specZahtj : "--"
  console.log(specZahtj)
  const mailData = {
    from: "icrmail2021@gmail.com",
    to: to,
    subject: subject,
    text: "Pozdrav " + ime + ", \n\nHvala Vam što ste izabrali Vilu Nezirović. Nadamo se da ćemo ispuniti Vaša iščekivanja i upotpuniti Vaš odmor našim uslugama!\n\nDetalji vaše rezervacije:\nDatum prijave: " + moment(start_date).format('DD.MM.YYYY') + "\nDatum odjave: " + moment(end_date).format('DD.MM.YYYY') + "\nSoba: " + id_sobe + "\nSpecijalni zahtjevi: " + spec + "\n\nNaravno, i dalje možete iskoristiti kod iz prethodnog e-mail-a kako bi iskoristili popust od 10% na cjelokupnu cijenu rezervacije.\n\nAdresa hotela: Doni Štoj 85360, Crna Gora\nBroj telefona: +382 68 226 337\nUkoliko želite izvršiti nove izmjene ili Vam je potrebna naša asistencija, molimo Vas da pozovete broj +382 68 226 337. \n\nIščekujemo Vaš dolazak!\nVila Nezirović",

  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});