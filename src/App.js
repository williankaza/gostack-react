import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": "Desafio ReactJS",
      "url": "github",
      "techs": ["NodeJs", "React"]
    });

    const repository = response.data
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete('repositories/' + id);
    if (response.status === 204){
      const indRepository = repositories.findIndex(rep=> rep.id === id);
      repositories.splice(indRepository, 1);

      setRepositories([...repositories]);
    }
  }

  useEffect(()=>{
    api.get('repositories').then((response)=>{
      setRepositories(response.data)
    })
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository=>{
          return (<li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover 
            </button>
          </li>)
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
