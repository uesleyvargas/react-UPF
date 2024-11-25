// components/AlunoForm.tsx
"use client";
import { useState, useEffect } from "react";
import { Aluno } from "../types/types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";

interface AlunoFormProps {
  onSave: (aluno: Aluno) => void;  // Tipagem explícita da função onSave
  alunoSelecionado: Aluno | null;
}

const AlunoForm: React.FC<AlunoFormProps> = ({ onSave, alunoSelecionado }) => {
  const [name, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState<number>(0);

  useEffect(() => {
    if (alunoSelecionado) {
      setNome(alunoSelecionado.name);
      setEmail(alunoSelecionado.email);
      setAge(alunoSelecionado.age);
    } else {
      setNome("");
      setEmail("");
      setAge(0);
    }
  }, [alunoSelecionado]);

  //v1
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onSave({ name, email, age });
  //   setNome("");
  //   setEmail("");
  //   setAge(0);
  //   // toast.success("Wow so easy!", {
  //   //   position: "bottom-center"
  //   // });
  //   // toast.error("Wow so easy!");
  //   // toast.warn("Wow so easy!");
  // };
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Aluno>({
    defaultValues: {
      name: "",
      email: "",
      age: 0,
    },
  });

  const onSubmit = (data: Aluno) => {
    onSave(data);
    toast.success("Aluno salvo com sucesso!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mb-4">
      <input
        type="text"
        placeholder="Nome"
        //className="border p-2 mb-2 w-80"
        value={name}
        

        className={`border p-2 mb-2 w-80 ${
          errors.name ? "border-rose-600" : ""
        }`}

        {...register("name", {
          required: "O nome é obrigatório",
          minLength: { value: 3, message: "O nome deve ter pelo menos 3 caracteres" },
        })}

        onChange={(e) => setNome(e.target.value)}
      />

      {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}


      <input
        type="email"
        placeholder="Email"
        //className="border p-2 mb-2 w-80"
        value={email}

        className={`border p-2 mb-2 w-80 ${
          errors.name ? "border-rose-600" : ""
        }`}

        {...register("email", {
          required: "O email é obrigatório",
          minLength: { value: 3, message: "O email é obrigatório" },
        })}


        onChange={(e) => setEmail(e.target.value)}
      />

      {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

      <input
        type="number"
        placeholder="Idade"
        //className="border p-2 mb-2 w-80"
        value={age}

        className={`border p-2 mb-2 w-80 ${
          errors.name ? "border-rose-600" : ""
        }`}

        {...register("age", {
          required: "A idade é obrigatória",
          
        })}


        onChange={(e) => setAge(Number(e.target.value))}
      />

      {errors.age && <p className="text-red-500 text-sm mb-2">{errors.age.message}</p>}


      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700">
        Salvar
      </button>

      <ToastContainer />

    </form>
  );
};

export default AlunoForm;
