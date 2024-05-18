import { FunctionComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";
import { useEffect, useState } from "preact/hooks";
import { Film } from "../types.ts";

const Listapelis: FunctionComponent = () => {
  const [peliculas, setPeliculas] = useState<Film[]>([]);
  const [name, setName] = useState<string>(" ");
  const [iso, setIso] = useState<number>();
  const [brand, setMarca] = useState<string>("");
  const [formato, setFormato] = useState<string>("");
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pelis = await fetch("api/API", {
          method: "GET",
        });
        const data = await pelis.json();
        setPeliculas(data);
      } catch (e) {
        return e;
      }
    };
    fetchData();
  }, []);

  const filteredPeliculas = peliculas.filter((pelicula) => {
    if (brand && pelicula.brand !== brand) {
      return false;
    }
    if (iso && pelicula.iso !== iso) {
      return false;
    }
    if (formato) {
      if (formato === "35" && !pelicula.formatThirtyFive) {
        return false;
      }
      if (formato === "120" && !pelicula.formatOneTwenty) {
        return false;
      }
    }
    if (color) {
      if (color === "true" && !pelicula.color) {
        return false;
      }
      if (color === "false" && pelicula.color) {
        return false;
      }
    }
    if (name && !pelicula.name.includes(name)) {
      return false;
    }
    return true;
  });
  return (
    <>
      <h1 class="center">Lista de Peliculas</h1>
      <div class="center">
        <select value={brand} onChange={(e) => setMarca(e.currentTarget.value)}>
          <option value="">Selecciona una Marca</option>
          {Array.from(
            new Set(filteredPeliculas.map((pelicula) => pelicula.brand)),
          ).sort().map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
        <select
          value={iso}
          onChange={(e) => setIso(Number(e.currentTarget.value))}
        >
          <option value="">Selecciona ISO</option>
          {Array.from(
            new Set(filteredPeliculas.map((pelicula) => pelicula.iso)),
          ).sort((x, y) => x - y).map((iso) => (
            <option key={iso} value={iso}>{iso}</option>
          ))}
        </select>
        <select
          value={color.toString()}
          onChange={(e) => setColor(e.currentTarget.value)}
        >
          <option value="">Selecciona Color</option>
          <option value="true">A color</option>
          <option value="false">Blanco y Negro</option>
        </select>
        <select
          value={formato.toString()}
          onChange={(e) => setFormato(e.currentTarget.value)}
        >
          <option value="">Selecciona Formato</option>
          <option value="35">3.5mm</option>
          <option value="120">120mm</option>
        </select>
      </div>
      <form class="center">
        <input
          type="text"
          placeholder="Buscar Pelicula por Nombre"
          onInput={(e) => setName(e.currentTarget.value)}
        />
      </form>

      <div class="peliculas">
        {filteredPeliculas.map((pelicula) => (
          <a href={`/id/${pelicula._id}`} key={pelicula._id}>
            <div key={pelicula._id}>
              <h2 class={"center"}>{pelicula.name}</h2>
              <img class="center" src={pelicula.staticImageUrl} />
              <div>
                Brand: {pelicula.brand}
                <br />
                ISO: {pelicula.iso}
                <br />
                Color: {pelicula.color ? "Si" : "Black&White"}
                <br />
                Formato: {pelicula.formatOneTwenty && "3.5mm"}{" "}
                {pelicula.formatOneTwenty && pelicula.formatThirtyFive && " y "}
                {" "}
                {pelicula.formatThirtyFive && "120mm"}
                <br />
                {pelicula.color && <div>Proceso: {pelicula.process}</div>}
              </div>
            </div>
          </a>
        ))}
      </div>

      {filteredPeliculas.length === 0 &&
        (
          <>
            <br />
            <div class={"final-message"}>
              No hay peliculas que coincidan con tu busqueda
            </div>
            <br />
            <div class="center">
              <button
                class="btn btn-blue"
                onClick={() => {
                  setMarca("");
                  setIso(undefined);
                  setColor("");
                  setFormato("");
                  setName("");
                }}
              >
                Eliminar filtros
              </button>
            </div>
          </>
        )}
    </>
  );
};

export default Listapelis;
