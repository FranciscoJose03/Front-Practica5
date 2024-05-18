import { FunctionComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";
import { Film, Project } from "../types.ts";
import { useEffect, useState } from "preact/hooks";

type Props = {
    film: Film | undefined;
}

const Proyectos: FunctionComponent<Props> = ({ film }) => {
    const [proyectos, setProyectos] = useState<Project[]>([]);
    const [crear, setCrear] = useState<boolean>(true);
    const [anadir, setAnadir] = useState<boolean>(false);
    const [namep, setNamep] = useState<string>(" ");
    const [indecp, setIndecp] = useState<number>(0);
    useEffect(() => {
        const cookies = document.cookie.split("; ").find((c) => 
            c.startsWith("proyectos"));
        if(!cookies) {
            document.cookie = `proyectos=${JSON.stringify([])}`;;
        }
        if(cookies)
        setProyectos(JSON.parse(cookies.split("=")[1]));
    }, []);

    const crearProyecto = (name: string, film: Film) => {
        proyectos.push({ name, filmsid: [film._id] });
        document.cookie = `proyectos=${JSON.stringify(proyectos)}; path=/`;
    }

    const añadirProyecto = (index: number, film: Film) => {
        const proyecto = proyectos[index];
        if(!proyecto) return alert("No existe el proyecto");
        proyecto.filmsid.push(film._id);
        document.cookie = `proyectos=${JSON.stringify(proyectos)}; path=/`;
    }

    return (
        <div class = "modal">
            <h3 class = "center">Proyectos</h3>
            <div class="center">
                <button class="btn btn-blue" onClick={(e) => {setAnadir(false); setCrear(true)}}>
                Crear nuevo Proyecto
            </button>
            <button class="btn btn-blue" onClick={(e) => {setCrear(false); setAnadir(true)}}>
                Añadir a un Proyecto
            </button>
            </div>
        {crear && 
            <form class={"center"}>
                <input class={"center"} type="text" placeholder="Nombre del Proyecto" onInput={(e) => setNamep(e.currentTarget.value)}/>
            </form>
        }
        {anadir && 
            <form class={"center"}>
                <select onInput={(e) => setIndecp(Number(e.currentTarget.value))}>
                    {proyectos.map((proyecto, i) => (
                        <option key={i+proyecto.name} value={i}>{proyecto.name}</option>
                    ))}
                </select>
            </form>
        }
        <button class="modal_close" onClick={(e) => {
                if(crear && film && namep !== " ") {
                    crearProyecto(namep, film)
                }else alert("No se puede crear el proyecto")
                if(anadir && film){
                    añadirProyecto(indecp, film)
                }
            }
        }>Crear/Añadir</button>
        </div>
        
    )
}

export default Proyectos;