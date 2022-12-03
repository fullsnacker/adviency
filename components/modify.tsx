import React from "react";
import { List, Validacion } from "../interfaces/List"
import s from "../style/add.module.css"
import { validate } from "./addGift"

type Props = { 
    setLista: ([]) => void;
    lista: List[];
    handleClose: () => void;
    edit: List;
    handleCloseMenu: () => void;
}

export const ModifyGift = ({setLista, lista, handleClose, edit, handleCloseMenu}: Props) => {
    const [editar, setEditar] = React.useState({
        id: edit.id,
        nombre: edit.nombre,
        cantidad: edit.cantidad > 1 ? edit.cantidad : 1,
        imagen: edit.imagen,
        destinatario: edit.destinatario,
        precio: edit.precio
    })
    const [errors, setErrors] = React.useState<Validacion>({})

    function handleChange(e: any) :void {
        e.preventDefault()
        setEditar((prev: List) => ({
            ...prev, 
            [e.target.name]: e.target.value
        }));
        setErrors(
            validate({
                ...editar,
                [e.target.name]: e.target.value
            })
        )
    }

    function handleEdit (e: any) {
        e.preventDefault()
        let error = Object.keys(validate(editar))
        if(error.length !== 0) {
            alert("completa bien los campos")
            return;
        }
        let filtrados = lista.filter(el => el !== edit) //elimino el regalo que quiero editar
        filtrados.push(editar) //agrego el nuevo regalo, modificado
        lista = filtrados
        setLista([...lista])
        handleClose()
        handleCloseMenu()
    }


    return (
        <div>
            <form className={s.form}>
                <label className={s.labels}>Regalo<span className={s.asterisco}>*</span>: </label>
                <input
                className={s.input}
                type='text'
                name="nombre"
                value={editar.nombre}
                onChange={handleChange}
                autoFocus
                />
                {errors.nombre && (
                    <p className={s.danger}>{errors.nombre}</p>
                )}

                <label className={s.labels}>Destinatario<span className={s.asterisco}>*</span>: </label>
                <input
                className={s.input}
                type='text'
                name="destinatario"
                value={editar.destinatario}
                onChange={handleChange}
                autoFocus
                />
                {errors.destinatario && (
                    <p className={s.danger}>{errors.destinatario}</p>
                )}

                <label className={s.labels}>Imagen: </label>
                <input 
                className={s.input_img}
                type='url'
                value={editar.imagen}
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
                value={editar.cantidad}
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
                    value={editar.precio}
                    onChange={handleChange}
                    autoFocus
                    />
                </span>
                {errors.precio && (
                    <p className={s.danger}>{errors.precio}</p>
                )}

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
                    onClick={handleEdit}
                    autoFocus>
                        Guardar cambios
                    </button>
                </div>
            </form>

        </div>
    )
}