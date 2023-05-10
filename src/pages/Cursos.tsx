import React, {useState, useEffect} from 'react'
import { db } from './firabse';
import {collection, onSnapshot, QueryDocumentSnapshot } from "firebase/firestore"
import {useRouter} from "next/router";
import {FcVideoCall} from "react-icons/fc";


interface Curso {
  id: string;
  nome: string;
  descricao: string;
  snap: QueryDocumentSnapshot<any>;
  docs: QueryDocumentSnapshot<any>[];
  slug: string;
}
const Cursos = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);

  const {push, back} = useRouter();

  const handleEditUser = () => {
    push(`/pasta/NomeModulos`);
  }

  useEffect(() => {
    const cursosCollection = collection(db, 'curso de inglês');
    const colecao = onSnapshot(cursosCollection, (snap) => {
      const cursos: Curso[] = snap.docs.map(doc => ({
        id: doc.id,
        nome: doc.data().nome,
        descricao: doc.data().descricao,
        snap: doc,
        docs: snap.docs,
        slug: doc.data().slug

      }));
      setCursos(cursos);
    });
  }, [])
    
  return (
    <div className="flex flex-col h-scree">
    <h1 className='text-2xl bg-[#0093ff] text-white p-5 '>Cursos Disponíveis:</h1>
    <div className="container flex flex-col">
      {cursos?.map((val) => (
        <div key={val.id} className=' p-3   border-b border-gray-400 border-opacity-50'>
          <a
            onClick={() => handleEditUser()}
            className='pl-3 text-[#0041ff] hover:text-[#f00] cursor-pointer hover:underline'>
            <span className=' text-black hover:no-underline mr-3 cursor-auto font-bold	'>Nome do curso:</span>{val.id}
          </a>

          <p><span className=' text-black pl-3 mr-3 font-bold	'>Descrição do curso:</span>{val.descricao}</p>
        </div>
      ))}
    </div>
  </div>
  
  )
}

export default Cursos