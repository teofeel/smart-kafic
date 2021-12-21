var express = require('express')
var bodyParser = require('body-parser')
var basicAuth = require('express-basic-auth')
const fs = require('fs');
const { Server } = require('http');

var controls = require('./functons/controls')
var views = require('./functons/views')
var auth = require('./auth/basicAuth');

var multer = require('multer')
const upload = multer({dest: './photos'})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res)=>{res.send('Smart Kafic')})

app.post('/register', controls.register) //dzony

app.post('/login', auth.allUsers, controls.login) //petriq

app.get('/getUsers', auth.admin, views.getUsers) //sale

app.post('/changeUser', auth.users, controls.changeUser) //teo

app.delete('/deleteUser/:userID', auth.admin, controls.deleteUser) //sale

app.get('/listaPica', auth.allUsers, views.listaPica) //petriq

app.post('/changePrice/:drinkID', auth.admin, controls.changePrice) //teo

app.post('/addDrink', auth.admin, controls.addDrink) //petriq

app.get('/tablesInUse', auth.allUsers, views.tablesInUse) //teo

app.post('/assignTable', auth.employees, controls.assignTable) //sale

app.post('/freeTable', auth.employees, controls.freeTable) //dzony

app.post('/getPhoto', [auth.users, upload.single('photo')], controls.getPhoto) //teo

app.get('/logout', (req,res)=>{
    res.status(200).json({status: 'Bye!'});

    setTimeout(function(){
        server.close();
    },5000);
}) 

var server = app.listen(8080, (err)=>{
    console.log('Server is running');
});
