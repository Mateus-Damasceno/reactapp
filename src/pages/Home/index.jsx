import React, {useState, useEffect} from 'react';
import './styles.css'
import {Card} from '../../components/card'


export function Home() {
  const [studentName, setStudentName] = useState('');
  const [ students, setStudent] = useState([]);
  const [user, setUser] = useState ({name:'',avatar:''});


  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',

      })
    };

    setStudent(prevState => [...prevState, newStudent]);
  }

useEffect( () => {
  fetch('https://api.github.com/users/mateus-damasceno')
  .then(response => response.json())
  .then(data => {
    setUser({
      name: data.name,
       avatar: data.avatar_url,

    })
  })
},[]);

  return (
    <div className="container">
      <h1> Nome: {studentName}</h1>
      <header>
        <h1> lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="foto aleatoria"/>
        </div>
      </header>
        
      <input type="text"
       placeholder="digite um nome" 
       onChange={e => setStudentName(e.target.value)}
       />
      <button type="button" onClick={handleAddStudent}>Adicionar</button>

      {
        students.map(students =>  
        <Card 
              key={students.time}
              name={students.name} 
              time={students.time}/>)
      }
     
      <Card name="inacio" time="10:40:31"/>
  </div>
  )
}


