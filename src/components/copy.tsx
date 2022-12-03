import React from "react";
import { List } from "../interfaces/List";
import s from '../style/add.module.css'

type Props = { 
    setLista: ([]) => void;
    lista: List[];
    handleClose: () => void;
    copy: List
    handleCloseMenu: () => void;
}

export const Copy = ({setLista, lista, handleClose, copy, handleCloseMenu}: Props) => {
    const [copiar, setCopiar] = React.useState({
        id: Math.random(),
        nombre: copy.nombre,
        cantidad: copy.cantidad > 1 ? copy.cantidad : 1,
        imagen: copy.imagen,
        destinatario: '',
        precio: copy.precio
    })

    function handleChange(e: any) :void {
        e.preventDefault()
        setCopiar((prev: List) => ({
            ...prev, 
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmitCopy(e: any) :void {
        e.preventDefault()
        setLista([...lista, copiar])
        setCopiar({
            id: copiar.id,
            nombre: copy.nombre,
            cantidad: copy.cantidad > 1 ? copy.cantidad : 1,
            imagen: copy.imagen,
            destinatario: '',
            precio: copy.precio
        })
        handleClose()
        handleCloseMenu()
    }



    return (
        <>
            <form className={s.form}>
                <label className={s.labels}>Regalo<span className={s.asterisco}>*</span>: </label>
                <input
                className={s.input}
                type='text'
                name="nombre"
                value={copiar.nombre}
                onChange={handleChange}
                autoFocus
                />
                <label className={s.labels}>Destinatario<span className={s.asterisco}>*</span>: </label>
                <input
                className={s.input}
                type='text'
                name="destinatario"
                value={copiar.destinatario}
                placeholder='Este regalo es para...'
                onChange={handleChange}
                autoFocus
                />
                <label className={s.labels}>Imagen: </label>
                <input 
                className={s.input_img}
                type='url'
                value={copiar.imagen}
                name='imagen'
                placeholder="http://image..."
                onChange={handleChange}
                autoFocus
                />
                <label className={s.labels}>Cantidad: </label>
                <input
                className={s.cantidad}
                type='number'
                min={1}
                value={copiar.cantidad}
                name='cantidad'
                onChange={handleChange}
                autoFocus
                />
                <label className={s.labels}>Precio<span className={s.asterisco}>*</span>:  </label>
                <span className={s.container_precio}>
                    <span className={s.box_signo}><p className={s.signo}>$</p></span>
                    <input
                    className={s.input}
                    type='number'
                    name='precio'
                    value={copiar.precio}
                    onChange={handleChange}
                    autoFocus
                    />
                </span>
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
                    className={s.btn_modify}
                    type="submit"
                    onClick={handleSubmitCopy}
                    autoFocus>
                        Agregar
                    </button>
                </div>
            </form>
        </>
    )
}