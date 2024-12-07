"use client";

import { useQuery } from "react-query";
import axiosInstance from "../../utils/axios"; // Importando o Axios configurado

// Função para buscar alunos
const fetchStudents = async () => {
  const response = await axiosInstance.get('students/'); // Endpoint para alunos
  return response.data;
};

export default function StudentsPage() {
  // Usando o React Query para pegar os dados
  const { data, error, isLoading } = useQuery('students', fetchStudents);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar os dados dos alunos</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Alunos</h1>
      <table border={1} style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Data de Nascimento</th>
            <th>Foto</th>
            <th>Cursos</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student: any) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.date_of_birth}</td>
              <td>
                {student.profile_picture ? (
                  <img src={student.profile_picture} alt={student.name} style={{ width: '50px', height: '50px' }} />
                ) : (
                  "Sem foto"
                )}
              </td>
              <td>{student.courses.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
