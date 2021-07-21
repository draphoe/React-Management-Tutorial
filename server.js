const express=require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', (req, res)=>{
  res.send([{
    id: 1,
    image : 'https://placeimg.com/64/64/any',
    name: '홍길동',
    DoB: '961222',
    gender: 'Male',
    job: '대학생'
  },
  {
    id: 2,
    image : 'https://placeimg.com/64/64/any',
    name: 'MoonLight',
    DoB: '711222',
    gender: 'Male',
    job: 'Killer'
  },
  {
    id: 3,
    image : 'https://placeimg.com/64/64/any',
    name: 'Draphoe',
    DoB: '206122',
    gender: 'Female',
    job: 'Assasinator'
  } ]);
});

app.listen(port, ()=>console.log(`Listening on port ${port}`));