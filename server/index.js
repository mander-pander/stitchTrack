const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();

require('dotenv').config();

const mysql = require('mysql2');
const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to PlanetScale!");
});

app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
    connection.query('SELECT * FROM users', function (err, rows) {
        if (err) throw err;
        res.send(rows);
    });
});

app.get("/project", (req, res) => {
    connection.query(
        "SELECT * FROM project",
    function (err, rows) {
        if (err) throw err;
        res.send(rows);
    });
});

app.get("/yarn", (req, res) => {
    connection.query(
        "SELECT * FROM yarn",
    function (err, rows) {
        if (err) throw err;
        res.send(rows);
    });
});

app.post("/project", (req, res) => {
    let proj = req.body.project;
    let yarn = req.body.yarn;
    connection.query(
        "INSERT INTO project (name, needle_size, gauge, date_started, date_finished, user_id) VALUES (?, ?, ?, ?, ?, ?)", [proj.name, proj.needle_size, proj.gauge, proj.date_started, proj.date_finished, proj.user_id], (error) => {
            console.log("cowman", proj);
            if (error) return res.json({error: error});
        }
    );
    connection.query(
        "INSERT INTO yarn (name, weight, yardage, color, project_id) VALUES (?, ?, ?, ?, ?)", [yarn.yarn_name, yarn.weight, yarn.yardage, yarn.color, yarn.project_id], (error) => {
            console.log("yarn", yarn);
            if (error) return res.json({error: error});
        }
    );
});

app.post("/yarn", (req, res) => {
    let yarn = req.body.yarn;
    connection.query(
        "INSERT INTO yarn (name, weight, yardage, color, project_id) VALUES (?, ?, ?, ?, ?)", [yarn.yarn_name, yarn.weight, yarn.yardage, yarn.color, yarn.project_id], (error) => {
            console.log("yarn", yarn);
            if (error) return res.json({error: error});
        }
    );
});

app.put("/project/:projectId", (req, res) => {
    console.log("put", req.params);
} )

app.delete("/project", (req, res) => {
    let params = req.query.data.project_id;
    connection.query(
        `DELETE FROM project WHERE id='${params}'`
    );
});

app.delete("/yarn", (req, res) => {
    let params = req.query.data.yarn_id;
    connection.query(
        `DELETE FROM yarn WHERE id='${params}'`
    );
});



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
