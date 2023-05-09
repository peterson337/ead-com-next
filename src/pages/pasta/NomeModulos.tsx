import {useRouter} from "next/router";
import React from 'react'


const NomeModulos = () => {
  const {push, back} = useRouter();

  const handleEditUser = () => {
    push(`/videoAula/Aula01`);
  }
  
  return (
    <div>

    <a onClick={() => handleEditUser()}>ir na secção de aulas</a>
      <br />
      <a onClick={() => back()}>Voltar para a página de cursos</a>
    </div>
  )
}

export default NomeModulos