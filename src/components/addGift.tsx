import React, { useState } from "react";
import s from '../style/add.module.css'
import { List, Validacion } from "../interfaces/List"

type Props = { //la palabra clave type permite crear nuevos tipos y luego reutilizarlos
    setLista: ([]) => void;
    lista: List[]; //Y DE ESTA MANERA SE TYPEA UN ARRAY DE OBJETOS
    handleClose: () => void
}

export function validate (regalo:List) {
    let errors:Validacion = {}

    if(!regalo.nombre) {
        errors.nombre = "El nombre del regalo es necesario"
    }
    if(!regalo.destinatario) {
        errors.destinatario = "El nombre del destinatario es necesario"
    }
    if(!regalo.precio) {
        errors.precio = "Es necesario el precio del regalo"
    }

    return errors
}

//export const AddGift: React.FC<Props> = ({setLista, lista}) => {} //Las FC pueden ser escritos como funciones normales que toman props como argumentos y retornan un elemento JSX
export const AddGift = ({setLista, lista, handleClose}: Props) :JSX.Element => {
    const nombres = ["Computadora", "Medias", "Cartera", "Perfume", "Maquillaje", "Juego de mate", "Mochila"]
    const aleatorio = nombres[Math.floor(Math.random() * nombres.length)]
    const [regalo, setRegalo] = useState<List>({
        id: Math.random(),
        nombre: '' ,
        cantidad: 1,
        imagen: '',
        destinatario: '',
        precio: 0
    })
    const [errors, setErrors] = useState<Validacion>({})

    function handleChange(e: any) :void {
        e.preventDefault()
        setRegalo((prev: List) => ({ //seteo mi estado local con el valor de mis inputs
            ...prev, //hago una copia de lo que ya tenia en mi estado
            [e.target.name]: e.target.value //y le agrego el valor de mis inputs
        }));
        setErrors(
            validate({
                ...regalo,
                [e.target.name]: e.target.value
            })
        )
    }

    function handleAleatorio(e: any) {
        e.preventDefault()
        setRegalo((prev: List) => ({
            ...prev,
            nombre: aleatorio
        }))
    }

    function handleSubmit (e: any) :void{
        e.preventDefault()
        let error = Object.keys(validate(regalo))
        if(error.length !== 0) {
            alert("completa bien los campos")
            return;
        }
        setLista([...lista, regalo])
        setRegalo({
            id: regalo.id,
            nombre: '',
            cantidad: 1,
            imagen: '',
            destinatario: '',
            precio: 0
        })
        handleClose()
    }

    return (
        <div>
            <form className={s.form}>
                <label className={s.labels}>Regalo<span className={s.asterisco}>*</span>: </label>
                <span className={s.sorprendeme}>
                <span>
                <input
                className={s.input} 
                required
                type='text'
                name="nombre"
                value={regalo.nombre}
                placeholder='Regalo...'
                onChange={handleChange}
                />
                {errors.nombre && (
                    <p className={s.danger}>{errors.nombre}</p>
                )}
                </span>
                    <button
                    className={s.btn_sorprendeme}
                    onClick={handleAleatorio}
                    >
                        ¡Sorpréndeme!
                    </button>
                    </span>

                <label className={s.labels}>Destinatario<span className={s.asterisco}>*</span>: </label>
                <input
                className={s.input}
                required
                type='text'
                name="destinatario"
                value={regalo.destinatario}
                placeholder='Este regalo es para...'
                onChange={handleChange}
                />
                {errors.destinatario && (
                    <p className={s.danger}>{errors.destinatario}</p>
                )}

                <label className={s.labels}>Imagen: </label>
                <input 
                className={s.input_img}
                type='url'
                value={regalo.imagen}
                name='imagen'
                placeholder="http://image..."
                onChange={handleChange}
                />

                <label className={s.labels}>Cantidad: </label>
                <input
                className={s.cantidad}
                type='number'
                min={0}
                value={regalo.cantidad}
                name='cantidad'
                onChange={handleChange}
                />

                <label className={s.labels}>Precio Unitario<span className={s.asterisco}>*</span>: </label>
                <span className={s.container_precio}>
                    <span className={s.box_signo}><p className={s.signo}>$</p></span>
                    <input
                    className={s.input}
                    required
                    min={1}
                    type='number'
                    name='precio'
                    value={regalo.precio}
                    onChange={handleChange}
                    />
                </span>
                {errors.precio && (
                    <p className={s.danger}>{errors.precio}</p>
                )}

                <div className={s.btn_form}>
                    <button
                    type='button'
                    className={s.btn_close}
                    onClick={handleClose}
                    >
                        Cerrar
                    </button>
                    <button
                    className={s.btn}
                    type="submit"
                    onClick={handleSubmit}>
                        Agregar
                    </button>
                </div>
            </form>
        </div>
    )
}