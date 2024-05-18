import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Film } from "../types.ts";
import Volver from "./Volver.tsx";
import { FunctionComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";
import Proyectos from "./Proyectos.tsx"
import { useState } from "preact/hooks";

type Peli = {
    id: string;
    peli: Film[];
}

const UnaPelicula: FunctionComponent<Peli> = ({peli, id})=> {
    const pelicula: Film | undefined = peli.find((pelicula) => pelicula._id === id);
    const [show, setShow] = useState<boolean>(false);
    return (   
        <>
        {pelicula !== undefined &&
            <div class = "pelicula">  
                <h2>{pelicula.name}</h2>     
                <img src={pelicula.staticImageUrl}/>
                <div class = "info-pelicula">
                    Brand: {pelicula.brand}<br/>
                    ISO: {pelicula.iso}<br/> 
                    Color: {pelicula.color ? "Si" : "Black&White"}<br/>
                    Formato: {pelicula.formatOneTwenty && "3.5mm"} {pelicula.formatOneTwenty && pelicula.formatThirtyFive && " y "} {pelicula.formatThirtyFive && "120mm"}<br/>
                    {pelicula.color && <div>Proceso: {pelicula.process}</div>}
                    <div class = "description">Descripcion: <br/> {pelicula.description}</div>
                    <button class = "btn btn-blue"onClick={(e) => {setShow(true)}}>Meter a un Proyecto</button><br/><br/>
                    <div class = "date">Date: {pelicula.dateAdded}</div>
                    <Volver />
                </div>
            </div>
        }
        {show && 
        <div class="modal-backdrop" onClick={(e) => { setShow(false); }}>
            <div onClick={(e) => e.stopPropagation()}>
                <Proyectos film={pelicula}/>        
            </div>
        </div>
        } 
        </>
    );
}

export default UnaPelicula;