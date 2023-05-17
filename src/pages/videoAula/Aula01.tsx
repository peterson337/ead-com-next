import React, {useState, useEffect} from 'react'
import { db } from '../firabse';
import {collection, onSnapshot, getDocs,CollectionReference, QueryDocumentSnapshot, where, 
  query, QuerySnapshot, DocumentSnapshot, snapshotEqual} from "firebase/firestore";
import {useRouter} from "next/router";
import { AiFillCloseCircle } from 'react-icons/ai';
import {BsFillArrowLeftCircleFill} from "react-icons/bs";
import ReactPlayer from 'react-player';
import styles from "@/styles/teste.module.css";


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
    videoUrl: string;
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
          videoUrl: doc.data().videoUrl 

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

    const urlVideo = (videoUrl: string) => {
      setVideoUrl(videoUrl);
      setOpen(true);
    };

    return (
      <div>

        {open ? (
          <div className='flex h-screen items-center  bg-black w-screen' onClick={closeVideo}>

             <button onClick={closeVideo} className='text-white text-4xl absolute
            left-5
            top-5'><BsFillArrowLeftCircleFill/></button> 
 <div className={styles.div}>
  <ReactPlayer className={styles.player}
    url={videoUrl}
    style={{}}
    playing={true}
    controls={true}
    volume={0.5}
  />
</div>




          </div>
        ) : aulas.length > 0 ? (
          <ul>
          <h1 className='text-2xl bg-[#0093ff] text-white p-5 pl-20 '>Aulas Disponíveis:</h1>

            {aulas.map((aula, index) => (
              <li key={index} className=' border-b border-gray-400 border-opacity-50'>
                <p className='mt-2 ml-5' ><b>Nome da aula:</b> {aula.id}</p> 
                <button onClick={() => urlVideo(aula.videoUrl)} className='bg-[#0388fc]  hover:bg-[#0362fc] text-white py-2 px-4 m-2 ml-5 rounded-full
                '>
                  Entrar na aula</button> 
                <br />
                <a onClick={() => back()} className='text-white cursor-pointer absolute top-5 left-5 text-4xl'>
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
  