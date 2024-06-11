const express = require('express')
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const fs = require('fs');
const { parse } = require('path');

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req,res) =>{
    res.redirect("/index");
});

app.get("/index", (req,res) =>{
    res.render(__dirname + "/views/index");
});

app.get("/addpoint", (req,res) =>{
    res.render(__dirname + "/views/addpoint")
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
});


//Adding points
const point ={
    lat : null,
    lng : null
}

app.post('/newpoint', jsonParser, (req,res) =>{
    const body = req.body;
    const lat = eval(body.lat);
    const lng = eval(body.lng);

    point.lat = lat;
    point.lng = lng;
    res.send("Point Added")
    addPoint();
})

function addPoint(){
    const path = 'public/JSON/landMineData.json'
    const dataPoints = fs.readFileSync(path,'utf8');
    const parsedPoints = JSON.parse(dataPoints);
    var newPoint = {
        "lat" : point.lat,
        "lng" : point.lng
    }
    console.log(newPoint);    
    parsedPoints.push(newPoint);
    fs.writeFileSync(path,JSON.stringify(parsedPoints));
}