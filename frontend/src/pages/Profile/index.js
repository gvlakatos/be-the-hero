import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    // useEffect(param1, param2): dispara uma função em determinado momento do componente
    // param1: qual função será executada
    // param2: quando a função será executada. Seu valor é um array de dependência, ou seja, quando os valores do array mudarem, a função do param1 será executada.
    //          Se deixar o array vazio, a função do param1 só será executada uma única vez
    useEffect(() => {
        // Utilizo o método GET PROFILE para retornar os incidentes da ONG que está logada
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
            // Utilizo o '.then' para retornar o resultado. Poderia ser feito através do async await também
        }).then(response => {
            // Utilizo o setIncidents (do useState) para atualizar a variável incidents
            setIncidents(response.data);
        })
        // Passo o ongId como segundo parâmetro para caso essa variável mude, a lista de incidents seja refeita
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            // Faço um filtro com o incidents que estejam com o ID diferente do ID que foi deletado
            setIncidents(incidents.filter(incident => incident.id != id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        // Limpo o localStorage do navegador
        localStorage.clear();

        // Redireciono para a página raiz da aplicação
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {/* Percorre cada item da variável incidents. Cada 'posição' do meu array será chamado de 'incident' */}
                {incidents.map(incident => (
                    // No React, quando fazemos um interação (repetição) é necessário colocar a proprieda 'key' no primeiro elemento da interação. Essa propriedade é necessária
                    // para o React identificar qual item está sendo modificado, deletado, trocar de posição. Essa 'key' precisa ser um valor único
                    <li key={incident.id}>
                        <strong>CASO: </strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR: </strong>
                        {/* 
                            Intl(param1, param2: função de internacionalização de formato da variável. 
                            param1: idioma que será utilizado
                            param2: style = tipo da formatação (data, hora, moeda)
                                    currency = quando tipo for moeda, indica qual moeda será utilizada
                            Após utilizo o '.format' para formatar o valor
                        */}
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        {/* Necessário passar um arrow function (() => ...) no evento 'onClick' pois desta forma estou passando uma função para o botão.
                            Caso contrário, a função de deletar seria executada assim que o componente fosse carregado na tela
                        */}
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}                
            </ul>
        </div>
    );
}