const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json

app.use(bodyParser.json());
 
//create database connection

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'demo_task'
});
 
//connect database

conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

app.get('/task',(req, res)=>{
	let sql = "select * from ranking_player";
	let query = conn.query(sql, (err, results)=>{
		if(err) throw err;
		res.send(results);
	})
})

app.get('/task/:id', (req, res)=>{
	let sql = "select * from ranking_player where id="+req.params.id;
	let query = conn.query(sql, (err, results)=>{
		if (err) throw err;
		res.send(results);
	})
})

app.post('/append', (req, res)=>{
	let data = {name:req.body.name, country:req.body.country};
	console.log(data)
	let sql = "insert into ranking_player (name, country) values('"+data.name+"', '"+data.country+"')";
	let query = conn.query(sql, (err, results)=>{
		if (err) throw err;
		res.send(results);
	})
})


app.put('/update/:id', (req, res)=>{
	let sql = "update ranking_player set name='"+req.body.name+"',country='"+req.body.country+"' where id="+req.params.id;
	let query = conn.query(sql, (err, results)=>{
		if (err) throw err;
		res.send(results);
	})
})

app.delete('/remove/:id', (req, res)=>{
	let sql = "delete from ranking_player where id="+req.params.id+"";
	let query = conn.query(sql, (err, results)=>{
		if (err) throw err;
		res.send(results);
	})
})

app.listen(8080,() =>{
  console.log('Server is running...');
});