import React, {useState, useEffect} from 'react'
import { db } from '../firabse';
import {collection, onSnapshot, getDocs,CollectionReference, QueryDocumentSnapshot, where, 
  query, QuerySnapshot, DocumentSnapshot, snapshotEqual} from "firebase/firestore";
import {useRouter} from "next/router";
import { AiFillCloseCircle } from 'react-icons/ai';
import {BsFillArrowLeftCircleFill} from "react-icons/bs";


  interface Aula {
    data: any;
    aberto: boolean;
  }
  
  interface Props {
    nomeCurso: string;
    nomeModulo: string;
  }
  
  interface Modulos {
    id: string;
    nome: string;
    slug: string;
    descricao: string;
    aberto?: boolean;
  }
  
  const Aulas = () => {
    const { back } = useRouter();
  
    const [aulas, setAulas] = useState<Modulos[]>([]);
    const [open, setOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string>("");

  
    useEffect(() => {
      const cursosCollection = collection(
        db,
        '/curso de inglês/curso de inglês/regras de gramática no inglês/regras de gramática no inglês/introdução as regras de gramática'
      );
      const colecao = onSnapshot(cursosCollection, (snap) => {
        const aulas: Modulos[] = snap.docs.map((doc) => ({
          id: doc.id,
          nome: doc.data().nome,
          descricao: doc.data().descricao,
          snap: doc,
          docs: snap.docs,
          slug: doc.data().slug,
        }));
        setAulas(aulas);
      });
    }, []);
  
    const openVideo = () => {
      setOpen(true);
    };
  
    const closeVideo = () => {
      setOpen(false);
    }

    return (
      <div>
        {open ? (
          <div className='flex h-screen items-center ml-72'>
            <button onClick={closeVideo} className='text-red-600 text-2xl absolute
            left-72
            top-72'><AiFillCloseCircle/></button>
            <h1>{}</h1>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/m6rDKbl9Vus"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : aulas.length > 0 ? (
          <ul>
            {aulas.map((aula, index) => (
              <li key={index} className=' border-b border-gray-400 border-opacity-50'>
              <h1 className='text-2xl bg-[#0093ff] text-white p-5 pl-12 '>Aulas Disponíveis:</h1>
                <p className='mt-2 ml-5'><b>Nome da aula:</b> {aula.id}</p> 
                <button onClick={openVideo} className='bg-[#0388fc]  hover:bg-[#0362fc] text-white py-2 px-4 m-2 ml-5 rounded-full
                '>
                  Entrar na aula</button> 
                <br />
                <a onClick={() => back()} className='text-white cursor-pointer absolute top-5 left-2 text-4xl'>
                <BsFillArrowLeftCircleFill /></a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    );
  };
  
  export default Aulas;
  