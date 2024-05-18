import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component, state }: PageProps) {
  return (
    <>
        <div class = "center">
            <a class = "btn" href = "/">Peliculas</a>
            <a class = "btn" href = "/proyecto">Proyectos</a>
            </div>
        <Component /> 
    </>
  );
}
