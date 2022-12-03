import React from "react";
import { List } from "../interfaces/List";

export type Props = { //mediante la palabra clave type permite crear nuevos tipos y luego reutilizarlos
    setLista: ([]) => void;
    lista: List[]; //Y DE ESTA MANERA SE TYPEA UN ARRAY DE OBJETOS;
}

export type Response = {
    status: 'ok' | 'error';
    data: List[] // data = [{}, {}, {}. ...] Data es un ARRAY DE OBJETOS
                //List es un OBJETO
}