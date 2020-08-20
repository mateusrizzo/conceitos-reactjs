import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response =>{
      setRepositories(response.data);
    })
  },[])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: 'https://github.com/mateusrizzo/conceitos-reactjs',
      techs: ['ReactJS', 'NodeJS', 'React Native']
    })
    const newRepository = response.data;
    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const repositoriesIndex = repositories.findIndex(repository => repositories.id === id);
    repositories.splice(repositoriesIndex, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
