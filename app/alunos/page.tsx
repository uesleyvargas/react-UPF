// app/alunos/page.tsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import AlunoForm from "../components/AlunoForm";
import ListaAlunos from "../components/ListaAlunos";
import { Aluno } from "../types/types";

export default function AlunosPage() {

    const [alunos, setAlunos] = useState<Aluno[]>([]);  // Estado para a lista de alunos
    const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null); // Aluno selecionado para edição

    // Carregar lista de alunos
    useEffect(() => {
        getAlunos()
    }, []);

    const getAlunos = async () => {
        const response = await axios.get("http://localhost:3000/api/students")
        setAlunos(response.data)
    }

    // Salvar aluno (criar ou atualizar)
    const handleSave = async (aluno: Aluno) => {
        if (alunoSelecionado) {
            await axios.put(`http://localhost:3000/api/students/${alunoSelecionado.id}`, aluno)
        } else {
            await axios.post("http://localhost:3000/api/students", aluno)
        }
        setAlunoSelecionado(null);
        await getAlunos()
    };

    // Excluir aluno
    const handleDelete = async (id: string) => {
        await axios.delete(`http://localhost:3000/api/students/${id}`)
        await getAlunos()
    };

    // Editar aluno
    const handleEdit = (aluno: Aluno) => {
        setAlunoSelecionado(aluno);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Gerenciamento de Alunos</h1>
            <AlunoForm onSave={handleSave} alunoSelecionado={alunoSelecionado} />
            <ListaAlunos alunos={alunos} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
    );
}