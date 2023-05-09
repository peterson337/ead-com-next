import React, {useState, useEffect} from 'react'
import { db } from './firabse';
import {collection, onSnapshot, QueryDocumentSnapshot } from "firebase/firestore"
import {useRouter} from "next/router";


interface Curso {
  id: string;
  nome: string;
  descricao: string;
  snap: QueryDocumentSnapshot<any>;
  docs: QueryDocumentSnapshot<any>[];
}
const Cursos = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);

  const {push, back} = useRouter();

  const handleEditUser = () => {
    push(`/user/NomeCursos`);
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
      }));
      setCursos(cursos);
    });
  }, [])
    
  return (
    <div>
        <h1 className='text-2xl bg-sky-500 text-white p-5'>Cursos Disponíveis:</h1>
        {
  cursos?.map((val) => {
    return(
      <div key={val.id} >
     <a onClick={() => handleEditUser()}  className='p-5'
     
     >{val.id}</a>
      </div>
    )
  }) ?? <div></div>
}

    </div>
  )
}

export default Cursos