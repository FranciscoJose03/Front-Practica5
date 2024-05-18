import MostrarProyectos from "../islands/MostrarProyectos.tsx";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Film, Project } from "../types.ts";
import Axios from "npm:axios";
import { getCookies } from "$std/http/cookie.ts";

type Info = {
    proyectos: Project[];
    peli: Film[];
}

export const handler: Handlers = {
    GET: async (req: Request, ctx: FreshContext<unknown | Info>) => {
        try{
            const pelis = await Axios.get<Film[]>("https://filmapi.vercel.app/api/films")
            const projectsCookie = getCookies(req.headers).proyectos;
            if (!projectsCookie) {
            return ctx.render({ 
                projects: [], 
                peli: pelis.data 
            });
            }
            const projects = JSON.parse(projectsCookie);
            return ctx.render({
                peli: pelis.data,
                proyectos: projects
            })
        }catch(e){
            return ctx.render({
                peli: []
            })
        }
    },
}


const Page = (props: PageProps<Info>) => {
    return (
        <>
            <MostrarProyectos film={props.data.peli} proyecto={props.data.proyectos} />
        </>
    );
}

export default Page;
  