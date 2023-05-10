import {useRouter} from "next/router";
import React, {useState, useEffect} from 'react'
import { db } from '../firabse';
import {collection, onSnapshot, getDocs,CollectionReference, QueryDocumentSnapshot, where, 
  query, QuerySnapshot, DocumentSnapshot} from "firebase/firestore";
import Cursos from "../Cursos";
import Link from 'next/link';
import {BsFillArrowLeftCircleFill} from "react-icons/bs";

interface Props{}

interface Modulos {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
}

const NomeModulos = (props : Props) => {
  const [modulos, setModulos] = useState<Modulos[]>([]);
  
  useEffect(() => {
    const cursosCollection = collection(db, '/curso de inglês/curso de inglês/regras de gramática no inglês');
    const colecao = onSnapshot(cursosCollection, (snap) => {
      const cursos: Modulos[] = snap.docs.map(doc => ({
        id: doc.id,
        nome: doc.data().nome,
        descricao: doc.data().descricao,
        snap: doc,
        docs: snap.docs,
        slug: doc.data().slug
        
      }));
      setModulos(cursos);
    });
  }, [])

  const router = useRouter();

  const handleEditUser = () => {
    router.push(`/videoAula/Aula01`);
  }
  
  return (
    <div>
    <h1 className='text-2xl bg-[#0093ff] text-white p-5 pl-12 '>Modulos Disponíveis:</h1>

      {modulos?.map((modulosData) => {
        return (
          <div key={modulosData.id} className=' p-1   border-b border-gray-400 border-opacity-50'>
                 <a onClick={() => handleEditUser()}
                 className=' pl-3 text-[#0041ff] hover:text-[#f00] cursor-pointer hover:underline'>
                 <span className=' text-black hover:no-underline mr-3 cursor-auto font-bold	'>Nome da aula:</span>
                 {modulosData.id}</a>
                  <p className="pl-3">{modulosData.descricao}</p>
            <a onClick={() => router.back()} 
            className='text-white cursor-pointer absolute top-5 left-2 text-4xl'
           ><BsFillArrowLeftCircleFill /></a>
            {/* <p>Descrição: {modulosData.data().descricao}</p> */}
          </div>
        );
      })}
    </div>
  );
}

export default NomeModulos;
