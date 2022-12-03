import React from "react";
import s from "../style/inicio.module.css"

export const Loading = () => {
    return (
        <div className={s.loading}>
            <img src="https://monophy.com/media/tqOUYVB9hL4K54zvWb/monophy.gif" alt="loading" height="250px"/>
        </div>
    )
}