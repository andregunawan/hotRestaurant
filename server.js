const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const mysql = require("mysql");

//EXPRESS INIT
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'assets')));

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "hot_restaurant"
});

var tables = [];

//ROUTES
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/tables', (req, res) => {
    res.sendFile(path.join(__dirname, "tables.html"));

});

app.get('/reserve', (req, res) => {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/queue", (req, res) => {
    return res.json(tables);
});

app.post("/api/new", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newTable = req.body;

    console.log(newTable.name);

    connection.query("INSERT INTO customer(customerName, phoneNumber, email, uniqueID) VALUE(?, ?, ?, ?)", [newTable.name, newTable.phone, newTable.email, newTable.id], function(error, result) {
        if(error) throw error;
    });

    tables.push(newTable);

    res.json(newTable);
});

app.post("/clearTable", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    tables = [];
    res.send("cleared");
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

// app.get("/waiting_queue", (req, res) => {
//     if(tables.length>5)
//     {
//         let waitList = [];
//         for(let i=5;i<tables.length;i++)
//         {
//             waitList.push(tables[i]);
//         }
//         res.json(waitList);
//     }
//     else
//     {
//         res.json({});
//     }
// });