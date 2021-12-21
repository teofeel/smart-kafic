var express = require('express')
var bodyParser = require('body-parser')
const fs = require('fs');

var userfile = fs.readFileSync('./db/users.json', 'utf8');
var users = JSON.parse(userfile);

var drinksfile = fs.readFileSync('./db/drinks.json', 'utf8');
var drinks = JSON.parse(drinksfile);

var employeesfile = fs.readFileSync('./db/employees.json', 'utf8');
var employees = JSON.parse(employeesfile);

var tablefile = fs.readFileSync('./db/tables.json', 'utf8');
var tables = JSON.parse(tablefile);

exports.register = (req,res)=>{
    var name = req.body.username
    var pass = req.body.password

    res.send(`New user registrated: {${name}:${pass}}`)
} //dzony

exports.login = (req,res) => {
    var username = req.query.name;
    var pass = req.query.password;

    if(username=='admin' && pass=='admin'){
        res.send('Admin login')
    }
    else
        res.send('Login')
} //petriq

exports.changeUser = (req,res)=>{
    var id = req.query.id;
    var newName = req.query.name;
    var newPass = req.query.password;

    users[newName] = users[id];
    delete users[id];
    users[newName] = newPass;

    var update = JSON.stringify(users);
    fs.writeFileSync('./db/users.json', update);

    res.send('Changed user')
} //teo

exports.deleteUser = (req,res)=>{
    var user = req.params.userID;

    delete users[user]

    var update = JSON.stringify(users);
    fs.writeFileSync('./db/users.json', update);

    res.send('User deleted')
} //sale

exports.changePrice = (req,res)=>{
    var drink = req.params.drinkID

    for(d in drinks.drinks){
        if(drinks.drinks[d].id==drink){
            drinks.drinks[d].price = parseFloat(req.body.price);
            break;
        }
    }

    var update = JSON.stringify(drinks);
    fs.writeFileSync('./db/drinks.json', update);

    res.send("price changed")
} //teo

exports.addDrink = (req,res)=>{
    var name = req.body.name;
    var price = parseFloat(req.body.price);

    let newDrink = {"id": Math.floor(Math.random()*1000),"name":name, "price":price}
    drinks.drinks.push(newDrink);

    var update = JSON.stringify(drinks);
    fs.writeFileSync('./db/drinks.json', update);

    res.send('New drink added');
} //petriq

exports.assignTable = (req,res)=>{
    for (t in tables){
        if (tables[t]==false){
            tables[t]=true
            break;
        }
    }

    var update = JSON.stringify(tables);
    fs.writeFileSync('./db/tables.json', update);

    res.send('Table assigned')
} //sale

exports.freeTable = (req,res)=>{
    var tableID = req.query.table;

    for(t in tables){
        if(t==tableID)
        {
            tables[t]=false
            break;
        }
    }
    
    var update = JSON.stringify(tables);
    fs.writeFileSync('./db/tables.json', update);

    res.send('Table is free')
} //dzony

exports.getPhoto = (req,res)=>{
    res.send('Image saved')
} //teo

