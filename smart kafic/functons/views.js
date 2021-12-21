const fs = require('fs');
var bodyParser = require('body-parser');

var userfile = fs.readFileSync('./db/users.json', 'utf8');
var users = JSON.parse(userfile);

var drinksfile = fs.readFileSync('./db/drinks.json', 'utf8');
var drinks = JSON.parse(drinksfile);

var employeesfile = fs.readFileSync('./db/employees.json', 'utf8');
var employees = JSON.parse(employeesfile);

var tablefile = fs.readFileSync('./db/tables.json', 'utf8');
var tables = JSON.parse(tablefile);

exports.getUsers = (req,res)=>{
    res.send(users);
} //sale

exports.listaPica = (req,res)=>{
    res.send(drinks);
} //petriq

exports.tablesInUse = (req,res)=>{
    var tabl = new Array()
    for(t in tables){
        if (tables[t]==true)
            tabl.push(t)
    }
    res.send(tabl)
} //teo
