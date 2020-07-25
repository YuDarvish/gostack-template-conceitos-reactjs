import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response=>{
        setRepositories(response.data);
    });
  }, []); 

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories',{
      title: `Novo projeto ${Date.now()}`,
      url: 'teste',
      techs: 'testeTech'
    });
  
    const repository = response.data;
      
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`repositories/${id}`);
    const repositoryIndex = repositories.findIndex(p => p.id === id);
    var a = repositories.splice(repositoryIndex, 1);
    console.log(repositoryIndex);
    console.log(repositories.length);
    setRepositories([]);
    setRepositories(repositories);

  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository =>
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)
      }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
