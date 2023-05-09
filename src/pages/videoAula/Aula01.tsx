import React from 'react'
import {useRouter} from "next/router";


const Aula01 = () => {
    const {push, back} = useRouter();

    const handleEditUser = () => {
      push(`/videoAula/Aula01`);
    }

  return (
    <div>
        <a onClick={() => back()}>Voltar para a página de modulos</a>

    </div>
  )
}

export default Aula01