"use client";
import { Aluno } from "../types/types";

interface ListaAlunosProps {
  alunos: Aluno[];  // Lista de alunos
  onDelete: (id: string) => void;  // Função para deletar um aluno
  onEdit: (aluno: Aluno) => void;   // Função para editar um aluno
}

const ListaAlunos: React.FC<ListaAlunosProps> = ({ alunos, onDelete, onEdit }) => {
  return (
    <div className="w-full">
      <ul className="space-y-4">
        {alunos.map((aluno, index) => {
          console.log(`Aluno ${index}:`, aluno);
          return (
            <li key={aluno.id || index} className="bg-white shadow-md p-4 rounded-md flex justify-between">
              <div>
                <p className="font-semibold">{aluno.name}</p>
                <p className="text-gray-600">{aluno.email}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => onEdit(aluno)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(aluno.id ?? '')}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </li>
          )
         }
        )}
      </ul>
    </div>
  );
};

export default ListaAlunos;