import './home.css';
import { useState } from 'react';
import { BiSolidCommentError } from 'react-icons/bi';
import axios from 'axios';

function Home() {
    //const's
    const spanMessage = document.querySelector('.span-message');
    const span = document.querySelector('.span');
    const cep = document.querySelector('.cep');
    const localidade = document.querySelector('.localidade');
    const logradouro = document.querySelector('.logradouro');
    const bairro = document.querySelector('.bairro');
    const complemento = document.querySelector('.complemento');
    const uf = document.querySelector('.uf');
    const ddd = document.querySelector('.ddd');
    const ibge = document.querySelector('.ibge');

    //take value
    const [search, setSearch] = useState('');

    //erro Input null
    const inputNull = () => {
        const spanMessage = document.querySelector('.span-message');
        const span = document.querySelector('.span');

        spanMessage.style.display = 'flex';
        span.innerText = 'Por Favor Informe o Cep...';
    }

    //clean erro in the front-end
    const cleanError = () => {
        spanMessage.style.display = 'none';
        span.innerText = '';
    }

    //error cep not found in api
    const noResult = (data) => {
        if(data.erro === true){
            spanMessage.style.display = 'flex';
            span.innerText = 'Cep Não Encontrado!';
        }

        return data
    }
    
    //verify if be unavailable
    const unavailable = (value) => {
        if(value === undefined || value === ''){
            return '';
        }

        return value
    }

    //insert Results in the page
    const insertInThePage = (data) => {
        noResult(data); //verify cep was found

        cep.textContent = `CEP: ${unavailable(data.cep)}`;
        localidade.textContent = `LOCALIDADE: ${unavailable(data.localidade)}`;
        logradouro.textContent = `LOGRADOURO: ${unavailable(data.logradouro)}`;
        bairro.textContent = `BAIRRO: ${unavailable(data.bairro)}`;
        complemento.textContent = `COMPLEMENTO: ${unavailable(data.complemento)}`;
        uf.textContent = `UF: ${unavailable(data.uf)}`;
        ddd.textContent = `DDD: ${unavailable(data.ddd)}`;
        ibge.textContent = `IBGE: ${unavailable(data.ibge)}`;
    }

    //request api
    const requestApi = async (search) => {
        //api public
        const viaCep = 'https://viacep.com.br/ws';
        
        await axios.get(`${viaCep}/${search}/json`)
        .then(function(response){
            const data = response.data;
            insertInThePage(data);
        })
        .catch(function(error){
            spanMessage.style.display = 'flex';
            span.innerText = 'Error De Conexão Com Api :(';
        })
    }

    //Treate value
    const treatValue = () => {
        cleanError();

        if(search.length !== 8) {
            spanMessage.style.display = 'flex';
            span.innerText = 'O Cep Deve Ter 8 Numeros!';
        }else{
            requestApi(search);
        }
    }

    //get value by click lupa
    const getValue = () => {
       if(!search){
            inputNull();
       }else{
            treatValue();
       }
    }

    //get value by enter
    const handleKeyPress = (event) => {
        const KeyPress = event.key;

        if(KeyPress === 'Enter'){
            getValue();
        }
    }

    return (
        <div className="all" align="center">
            <div className="container">
                <h1 className="title">ORIGEM CEP</h1>

                <div className="containerInput" width="28" height="15" align="center">
                    <input
                        required="required"
                        autoComplete='on'
                        autoFocus
                        type='number'
                        pattern="[0-9]+$"
                        placeholder="Cep ex: 58010000"
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyPress={handleKeyPress}
                    />

                    <button className="buttonSearch" onClick={getValue}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="55px" height="25px" color="blue" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </div>

                <div className='span-message'>
                    <BiSolidCommentError className='icon-span' /> 
                    <span className='span'></span>
                </div>
                
                <main className='main'>
                    <h2 className='cep'>CEP:</h2>
                    <span className='localidade'>LOCALIDADE:</span>
                    <span className='logradouro'>LOGRADOURO:</span>
                    <span className='bairro'>BAIRRO:</span>
                    <span className='complemento'>COMPLEMENTO:</span>
                    <span className='uf'>UF:</span>
                    <span className='ddd'>DDD:</span>
                    <span className='ibge'>IBGE:</span>
                </main> 
            </div>
        </div>
    )
}

export default Home;