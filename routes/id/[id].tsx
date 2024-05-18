import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Film } from "../../types.ts";
import Axios from "npm:axios";
import UnaPelicula from "../../islands/UnaPelicula.tsx";

type Info = {
    id: string;
    peli: Film[];
}

export const handler: Handlers = {
    GET: async (_req: Request, ctx: FreshContext<unknown, {id: string, peli: Film[]}>) => {
        const { id } = ctx.params;
        try{
            const pelis = await Axios.get<Film[]>("https://filmapi.vercel.app/api/films")
    
            return ctx.render({
                id: id,
                peli: pelis.data
            })
        }catch(e){
            return ctx.render({
                id: id,
                peli: []
            })
        }
    },
}

const Page = (props: PageProps<Info>) => {
    const id = props.data.id;
    const peli = props.data.peli;
    return <UnaPelicula id={id} peli={peli}/>
}

export default Page;