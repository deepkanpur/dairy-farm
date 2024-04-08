import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activites, setActivites] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
    .then(response => {
      setActivites(response.data);
    });
  }, []);

  return (
    <>
    <Header as='h2' icon='users' content='Reactivities' />
      <h1>Tabela</h1>
      <List>
        {activites.map((activite: any) => 
          <List.Item key={activite.id}>{activite.title}</List.Item>
        )}
      </List>
    </>
  )
}

export default App
