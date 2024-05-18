import { FunctionComponent } from "preact";
import { Film, Project } from "../types.ts";
import { useEffect, useState } from "preact/hooks";

type ProjectProps = {
    film: Film[];
    proyecto: Project[];
};

const MostrarProyectos: FunctionComponent<ProjectProps> = ({film, proyecto}) => {
    const [modal1, setModal1] = useState<boolean>(false);
    const [modal2, setModal2] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);

    const eliminarproyecto = (index: number) => {
        proyecto.splice(index, 1);
        document.cookie = `proyectos=${JSON.stringify(proyecto)}; path=/`;
    } 

    const eliminarpelicula = (index: number, id: string) => {
        const proyect = proyecto[index];
        const updatedFilmsId = proyect.filmsid.filter((filmid) => filmid !== id);
        const updatedProyecto = { ...proyect, filmsid: updatedFilmsId }; 
        proyecto.splice(index, 1, updatedProyecto);
        document.cookie = `proyectos=${JSON.stringify(proyecto)}; path=/`;
    }

    return (
        <div>
            <h1 class={"center"}>Proyectos</h1>
            <ul class = "lista">
                {proyecto.map((proyecto, i) => (
                    <>
                    <li key={proyecto.name}>
                        <h3>{proyecto.name}</h3>
                        <ul>
                            {proyecto.filmsid.map((filmid, i) => {
                                const filmFound = film.find((f) => f._id === filmid);
                                if (!filmFound) return null;
                                return <><li key={filmFound._id}>{i+1} - {filmFound.name}</li><button class = "btn btn-red" onClick={(e) => {setModal1(true); setIndex(i); }}>Eliminar</button></>;
                            })}
                        </ul>
                    </li>
                    <button class = "btn btn-red" onClick={(e) => {setModal2(true); setIndex(i)}}>Eliminar</button>
                    </>
                ))}
                {modal1 && (
                    <div class = "modal">
                        <h3 class={"center"}>Eliminar</h3>
                        <div class={"center"}>¿Estas seguro?</div>
                        <div class={"center"}>
                        <button class="btn btn-blue" onClick={(e) => {
                            eliminarpelicula(index, film[index]._id);
                            setModal1(false);
                        }}>SI</button>
                        
                        <button class="btn btn-red" onClick={(e) => {
                                setModal1(false);
                        }}>No</button>
                        </div>
                    </div>
                )}

                {modal2 && (
                    <div class = "modal">
                        <h3 class ="center">Eliminar</h3>
                        <div class={"center"}>¿Estas seguro?</div>
                        <div class={"center"}>
                        <button class={"btn btn-blue"} onClick={(e) => {
                            eliminarproyecto(index);
                            setModal2(false);
                        }}>SI</button>
                        
                        <button class={"btn btn-red"} onClick={(e) => {
                                setModal2(false);
                        }}>No</button>
                        </div>
                    </div>
                )}
            </ul>
        </div>
    );
};

export default MostrarProyectos;