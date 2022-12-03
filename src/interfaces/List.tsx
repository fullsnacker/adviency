import React from 'react'

export interface List {
    id: number
    nombre: string;
    cantidad: number;
    imagen: string;
    destinatario: string;
    precio: number;
}

export interface Validacion {
    nombre?: string;
    destinatario?: string;
    precio?: string;
}