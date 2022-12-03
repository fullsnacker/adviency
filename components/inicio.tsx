import { useEffect, useState } from "react";
import s from '../style/inicio.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import img from '../assets/png-transparent-christmas-gift-christmas-gift-gift-miscellaneous-ribbon-desktop-wallpaper-removebg-preview.png'
import InputModal from "./inputModal"
import EditModal from "./editModal";
import { List } from "../interfaces/List"
import api from "../helpers/api";
import { Loading } from "./loading";
import Tooltip from '@mui/material/Tooltip';
import { CopyModal } from "./copyModal";
import { PrevModal } from "./prevModal";
import BtnResponsive from "./btnResponsive";

export const Inicio = () : JSX.Element => {
    const [lista, setLista] = useState<List[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [sonido, setSonido] = useState<HTMLAudioElement>();
    const [pausa, setPausa] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true);
        api.gifts.list()
        .then(lista => setLista(lista.data))
        .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        if(lista.length > 0) { // si mi lista esta cargada
            api.gifts.save(lista) //guardame lo que tenga lista en mi LS
            .then(console.log)
            .catch(console.log)
        }
    }, [lista])

    useEffect(() => {
        let price = 0
        lista.forEach(el => {
            price += el.cantidad * el.precio
        })
        setTotalPrice(price);
    }, [lista, totalPrice, setTotalPrice])

    useEffect (() => {
        const musica = new Audio(require("../assets/JingleBellRocks.mp3"))
        musica.loop = true
        setSonido(musica)
    }, [])

    function handleDelete(r: number) :void { //por parametro me llego el regalo que tengo que eliminar
        setLista(lista.filter(g => g.id !== r)) //y le digo que filtre por aquellos regalos que no se llamen igual que mi regalo a eliminar
        localStorage.setItem('lista', JSON.stringify(lista.filter(g => g.id !== r)))
    }

    function deleteAll () :void {
       setLista([])
    }

    function handleMusic () {
        if(pausa){
            sonido!.play()
            setPausa(false)
        } else {
            sonido!.pause()
            setPausa(true)
        }
    }

    if(loading) {
        return <Loading />
    }

    return(
            <div className={s.box}>
                < InputModal setLista={setLista} lista={lista} />
                <div className={s.title}>
                    <div>
                        <h1>Regalos:</h1>

                    </div>
                    <div className={s.box_music}>
                        <button
                        onClick={handleMusic}
                        className={pausa ? s.btn_music : s.btn_music_pausa}
                        >
                            {pausa
                            ? <FontAwesomeIcon icon={faVolumeUp} />
                            : <FontAwesomeIcon icon={faVolumeMute} />}
                        </button>

                    </div>
                </div>
                <div className={lista.length > 3 ? s.container_regalos : ""}>
                    {lista.length ? lista.map(r => (
                            <ul key={r.id}>
                                <li key={r.id} className={s.li}>
                                    <div className={s.img_name_q}>
                                        <div style={span_circle}>
                                            <img src={r.imagen ? r.imagen : img} alt='gift' className={s.img}/>
                                            <span className={s.rounded_circle}>{r.cantidad}</span>
                                        </div>
                                        <div>
                                            <div className={s.nom_pre}>
                                                {r.nombre.length > 15 
                                                ? <p className={s.nombre_regalo_ov}>${r.nombre.charAt(0).toUpperCase()}${r.nombre.slice(1)}</p>
                                                : <p className={s.nombre_regalo}>{r.nombre.charAt(0).toUpperCase()}{r.nombre.slice(1)}</p>}
                                                <span> ${new Intl.NumberFormat('es-AR').format(r.cantidad * r.precio)}</span>
                                            </div>
                                            <p className={s.destinatario}>{r.destinatario.charAt(0).toUpperCase()}{r.destinatario.slice(1)}</p>
                                        </div>
                                    </div>
                                    <div className={s.span_buttons}>
                                        <EditModal setLista={setLista} lista={lista} edit={r} handleCloseMenu={function (): void {
                                        console.log("todo ok");
                                    } }/>
                                        <CopyModal setLista={setLista} lista={lista} copy={r} handleCloseMenu={function (): void {
                                        console.log("todo ok");
                                    } }/>
                                        <Tooltip title="Eliminar">
                                            <button //al boton de eliminar le tengo que decir QUE ELEMENTO de mi array de regalos tienen que eliminar
                                            onClick={()=> handleDelete(r.id)} //asi que por parametro le paso a la funcion el elemento (r)
                                            className={s.trash}
                                            >
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                        </Tooltip>
                                    </div>
                                    <div className={s.responsive_btn}>
                                        <BtnResponsive setLista={setLista} lista={lista} edit={r} copy={r}/>
                                    </div>
                                </li>
                            </ul>
                    )): <div className={s.emptyList}>La lista esta vacía 😔 ¡Agrega algo!</div>}
                </div>
                {lista.length ? 
                <>
                    <hr className={s.raya} />
                    <div className={s.containter_total}>
                        <p className={s.total}>Total: $ {new Intl.NumberFormat('es-AR').format(totalPrice)}</p>
                    </div>
                    <PrevModal lista={lista}/>
                    <div className={s.trashAll_container}>
                        <button onClick={deleteAll} className={s.trashAll}>Borrar todo</button>
                    </div>
                </>
                : ""}
            </div>
    )
}

const span_circle = {
    display: "flex",
    marginRight: '5px'
}



//ASI UTILIZAMOS EL LOCALSTORAGE SIN API.TSX
// const [lista, setLista] = useState<List[]>(() => { //lista va a recibir un cb que puede retornar o un objeto o un array vacio
//     // para obtener el valor del almacenamiento
//     const saved = localStorage.getItem("lista"); //obengo la key 'lista' del objeto localStorage
//     if(saved) { //si tengo ese key guardada
//         const initialValue = JSON.parse(saved); //parsealo a objeto ya que esta guardado en mi LS como un string
//         return initialValue || []; //y retorname el objeto si mi key 'lista' tiene algo, sino retorname entonces un array vacío
//     }
//   });



// useEffect(() => { //cuando montes el componente
//     localStorage.setItem('lista', JSON.stringify(lista)) //con setItem almacenamos en el objeto localStorage un par clave/valor. En este caso, agregamos al LS = {'lista': (aca puede ir o mi array vacio '[]' si es que no tengo nada o mi array con mis regalos '[{}, {} ...]')}
// }, [lista])


//La propiedad localStorage te permite acceder al OBJETO local "Storage"

//PARA GUARDAR DATOS EN MI LOCALSTORAGE = localStorage.setItem(name, content). Con setItem agregamos una key(name) y un value(content) al objeto Storage
//PARA LEER UN ITEM ALMACENADO EN MI LOCALSTORAGE = localStorage.getItem(name)