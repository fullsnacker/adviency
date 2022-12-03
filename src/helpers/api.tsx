import React from "react";
import { Response } from "../types/Props";
import { List } from "../interfaces/List"

export default {
    gifts: { //con mis regalos tengo que hacer dos cosas
        list: () : Promise<Response> => new Promise((resolve, reject) => { //PRIMERO, TRAIGOS TODOS MIS REGALOS
            try {
                const saved = localStorage.getItem("lista")
                setTimeout(() => {
                    resolve({
                        status: "ok",
                        data: saved !== null ? JSON.parse(saved) : []
                    })
                }, 1000)

            } catch {
                reject({
                    status: "error",
                    data: []
                })
            }
        }),
        save: (data: List[]) => new Promise((resolve, reject) => { //SEGUNDO, CARGAMOS MI "LISTA" CON LOS REGALOS
            try {
                localStorage.setItem("lista", JSON.stringify(data))
                resolve("Se guardo con éxito")
            } catch {
                reject("Error al guardar")
            }
        })
    }
}

