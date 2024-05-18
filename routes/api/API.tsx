import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
    GET: async (_req: Request) => {
        try {
            const pelis = await fetch("https://filmapi.vercel.app/api/films")
            const data = await pelis.json()
            return new Response(JSON.stringify(data), {
                status: 200
            }
        )
        }catch(e){
            return new Response(JSON.stringify({error: e}), {
                status: 500
            }
        )
        }
    }
  }