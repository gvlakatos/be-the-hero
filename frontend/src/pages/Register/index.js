import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'; // Importação dos icones
import { Link, useHistory } from 'react-router-dom'; // Importação do componente que navega entre as páginas
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) { // e = evento do submit
        e.preventDefault(); // preventDefault = impede que a página seja recarregada quando o formulário é enviado

        const data = {name, email, whatsapp, city, uf};

        try {
            const response = await api.post('ongs', data);
    
            alert(`Seu ID de acesso: ${response.data.id}`); // Usar crase (`) quando precisar colocar variável dentro de uma string
            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        };
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="BeTheHero"/>
                    <h1>Cadastro</h1>
                    <p>Faça o seu cadastro e comece a ajudar hoje mesmo.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    {/* value: define o valor do input com a variável que foi criada anteriormente
                        e.target.value : define o valor do input
                        setName: atualiza a variável name' com o valor informado no parâmetro
                    */}
                    <input 
                        placeholder="Nome da ONG" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                    /> 

                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />

                    <input 
                        placeholder="Whatsapp"
                        value={whatsapp} 
                        onChange={e => setWhatsapp(e.target.value)} 
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city} 
                            onChange={e => setCity(e.target.value)} 
                        />

                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }} // Dois {} para poder acessar as propriedas CSS
                            value={uf} 
                            onChange={e => setUf(e.target.value)} 
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}