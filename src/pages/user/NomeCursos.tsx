import React from 'react'
import {useRouter} from "next/router";


const NomeCursos = () => {
  const {push, back} = useRouter();

  const handleEditUser = () => {
    push(`/pasta/NomeModulos`);
  }

  return (
    <main
    >

    <a onClick={() => handleEditUser()}>Nome dos modulos</a>
      <br />
      <a onClick={() => back()}>Voltar para página inicial</a>
    </main>
  )
}

export default NomeCursos