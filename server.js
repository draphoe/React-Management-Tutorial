const fs = require('fs');
const express=require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json', 'UTF-8');
const conf = JSON.parse(data);
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect();
const multer = require('multer');
const upload = multer({dest: './upload'});

app.get('/api/customers', (req, res)=>{
  connection.query(
    "SELECT * FROM CUSTOMER",
    (err, rows, fields) => {
      res.send(rows);
    }
  )  
});

//사용자는 image폴더를 사용하지만, 실제는 upload폴더에 올라간다.
app.use('/image', express.static('./upload'));
app.post('/api/customers', upload.single('image'), (req, res)=>{
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)'; // null = id : auto_increment
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let dob = req.body.dob;
  let gender= req.body.gender;
  let job = req.body.job;  
  let params = [image, name, dob, gender, job]; 
  connection.query(sql, params, (err, rows, fields)=>{
    res.send(rows);
  });
});

app.listen(port, ()=>console.log(`Listening on port ${port}`));