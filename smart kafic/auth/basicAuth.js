var express = require('express')
var bodyParser = require('body-parser')
var basicAuth = require('express-basic-auth')
const fs = require('fs');
var session = require('express-session');
const res = require('express/lib/response');

var userfile = fs.readFileSync('./db/users.json', 'utf8');
var users = JSON.parse(userfile);

var drinksfile = fs.readFileSync('./db/drinks.json', 'utf8');
var drinks = JSON.parse(drinksfile);

var employeesfile = fs.readFileSync('./db/employees.json', 'utf8');
var employees = JSON.parse(employeesfile);

var tablefile = fs.readFileSync('./db/tables.json', 'utf8');
var tables = JSON.parse(tablefile);

exports.allUsers = basicAuth({ 
    authorizer: (name, password) =>{
        for(u in users){
            if(u==name && users[name] == users[u])
                return true
        }
        for(u in employees){
            if(u==name && employees[name] == employees[u])
                return true
        }

        console.log('Unauthorized access')
        return false
    }
}) 

exports.users = basicAuth({
    users:users
}) 

exports.admin = basicAuth({
    users:{'admin':'admin'}
}) 

exports.employees = basicAuth({
    authorizer: (name, password) =>{
        if(name=='admin' && password=='admin')
            return true
        for(u in employees){
            if(u==name && employees[name] == employees[u])
                return true
        }

        console.log('Unauthorized access')
        return false
    }
}) 





