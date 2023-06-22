import { useState } from 'react';
import './style.css'
import './index.css'

import api from './services/api.js'

function App() {

  const[input, setInput] = useState('')

  const[cep, setCep] = useState({});

  async function handleSearch(){
    // 01310930/json/

    if(input === ''){
      alert('Preencha Algum Cep!')
      return;
    }

    try{
      const response = await api.get(input + '/json/')
      console.log(response.data)
      setCep(response.data)
      setInput('')

    }catch{
      alert('Ops!, Erro Ao Buscar...')
      setInput('')
    }

  }

  return (
    <div className="all" align="center">
        <div className="container">
            <h1 className="title">Buscador CEP</h1>

            <div className="containerInput" width="28" height="15" align="center">
                <input 
                  type='text'
                  placeholder="Digite Seu Cep..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />

                <button className="buttonSearch" onClick={handleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="55px" height="25px" color="blue" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </button>
            </div>

            <main className='main'>
              <h2>CEP: {cep.cep}</h2>

              <span>LOCALIDADE: {cep.localidade} </span>
              <span>LOGRADOURO: {cep.logradouro} </span>
              <span>BAIRRO: {cep.bairro} </span>
              <span>COMPLEMENTO: {cep.complemento} </span>
              <span>UF: {cep.uf}</span>
              <span>DDD: {cep.ddd}</span>
              <span>IBGE: {cep.ibge}</span>
            </main>
        
            
        </div>
    </div>
  );
}

export default App;
