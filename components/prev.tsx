import React from "react";
import { List } from '../interfaces/List'
import img from '../assets/png-transparent-christmas-gift-christmas-gift-gift-miscellaneous-ribbon-desktop-wallpaper-removebg-preview.png'
import s from '../style/prev.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPrint} from "@fortawesome/free-solid-svg-icons"

type PropsPrev = {
    lista: List[];
    handleClose: () => void;
}

export const Previsualizacion = ({lista, handleClose}:PropsPrev) => {

    function handlePrint () {
        window.print()
    }

    return (
        <div>
            <div className={s.title}>
                <h1>Comprar:</h1>
            </div>
            <div className={lista.length > 2 ? s.container_regalos : ""}>
                {lista.length ? lista.map(el => (
                    <ul key={el.id}>
                        <li key={el.id} className={s.li}>
                            <span className={s.img_name_q}>
                                <span className={s.box_img}>
                                    <img src={el.imagen ? el.imagen : img} alt='gift' width="35px" height="35px"/>
                                </span>
                                <span>
                                    <p className={s.nombre_regalo}>{`${el.nombre.charAt(0).toUpperCase()}${el.nombre.slice(1)} (${el.cantidad})`}</p>
                                    <p className={s.destinatario}>{el.destinatario.charAt(0).toUpperCase()}{el.destinatario.slice(1)}</p>
                                </span>
                            </span>
                        </li>
                    </ul>
                )) : ""}
            </div>
            <div className={s.btn_form}>
                <button
                type='button'
                autoFocus
                className={s.btn_close}
                onClick={handleClose}
                >
                Cerrar
                </button>
                <button
                type="button"
                value="imprimir"
                className={s.btn}
                onClick={handlePrint}
                >
                    <FontAwesomeIcon icon={faPrint}/>
                </button>
            </div>
        </div>
    )
}