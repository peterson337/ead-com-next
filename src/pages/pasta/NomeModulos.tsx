import {useRouter} from "next/router";
import React, {useState, useEffect} from 'react'
import { db } from '../firabse';
import {collection, onSnapshot, getDocs,CollectionReference, QueryDocumentSnapshot, where, 
  query, QuerySnapshot, DocumentSnapshot} from "firebase/firestore";
import Cursos from "../Cursos";
import Link from 'next/link';
import {BsFillArrowLeftCircleFill} from "react-icons/bs";

interface Props { }

interface Modulos {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
}

const NomeModulos = (props: Props) => {
  const [modulos, setModulos] = useState<Modulos[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getCursosData = async () => {
      try {
        const cursosCollection = collection(db, 'cursos');
        const cursosSnapshot = await getDocs(cursosCollection);

        const cursos: Modulos[] = [];
        for (const doc of cursosSnapshot.docs) {
          const modulosCollection = collection(doc.ref, 'modulos');
          const modulosQuery = query(modulosCollection);
          const modulosSnapshot = await getDocs(modulosQuery);

          for (const moduloDoc of modulosSnapshot.docs) {
            cursos.push({
              id: moduloDoc.id,
              nome: moduloDoc.data().nome,
              descricao: moduloDoc.data().descricao,
              slug: moduloDoc.data().slug
            });
          }
        }

        setModulos(cursos);
      } catch (error) {
        console.error("Erro ao obter dados dos cursos:", error);
      }
    };

    getCursosData();
  }, []);

  const handleEditUser = () => {
    router.push(`/videoAula/Aula01`);
  }

  return (
    <div>
      <h1 className='text-2xl bg-[#0093ff] text-white p-5 pl-20 '>Modulos Disponíveis:</h1>
      {modulos?.map((modulosData) => {
        return (
          <div key={modulosData.id} className='p-1 border-b border-gray-400 border-opacity-50'>
            <span className='text-black hover:no-underline ml-3 cursor-auto font-bold'>Nome da aula:</span>
            <a onClick={() => handleEditUser()} className='pl-3 text-[#0041ff] hover:text-[#f00] cursor-pointer hover:underline'>
              {modulosData.id}
            </a>
            <p className="pl-3"><span className='text-black mr-3 font-bold'>Descrição do curso:</span>{modulosData.descricao}</p>
            <a onClick={() => router.back()} className='text-white cursor-pointer absolute top-5 left-4 text-4xl'>
              <BsFillArrowLeftCircleFill />
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default NomeModulos;
