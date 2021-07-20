import React from 'react';
import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customer from './components/customer'

const customers=[{
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
} ]

class App extends React.Component {
  render(){
    return (
      <div>
        { customers.map(c=>{
            return(
              <Customer
                key={c.id} 
                id={c.id} 
                image={c.image} 
                name={c.name} 
                gender={c.gender} 
                DoB={c.DoB} 
              />
            )
          })
        }
      </div>  
        
    );  
  }
}

export default App;

