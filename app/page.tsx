'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Defina um estado para garantir que o useRouter só seja usado após o componente ser montado no lado cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/accounts/login/',
        { username, password }
      );

      localStorage.setItem('token', response.data.access); // Armazene o token de autenticação
      router.push('/students'); // Redirecione para a página de listagem de alunos
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.'); // Exiba erro se as credenciais estiverem incorretas
    }
  };

  if (!isMounted) {
    return null; // Retorne nada até que o componente seja montado no cliente
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe o erro de login */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ padding: '8px', width: '100%' }}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '8px', width: '100%' }}
          />
        </div>
        <button
          type="submit"
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
