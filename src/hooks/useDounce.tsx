// src/hooks/useDebounce.ts
import { useState, useEffect } from "react";

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

//*
// import { useState } from "react";
// import { useDebounce } from "../hooks/useDebounce";

// const SearchComponent = () => {
//   const [query, setQuery] = useState("");
//   const debouncedQuery = useDebounce(query, 500); // Ajout d'un délai de 500ms

//   useEffect(() => {
//     if (debouncedQuery) {
//       // Effectuer une recherche avec la valeur retardée
//       console.log("Recherche pour:", debouncedQuery);
//     }
//   }, [debouncedQuery]);

//   return <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />;
// };

//*

// import React, { useState } from "react";
// import { useDebounce } from "./utils/useDebounce";

// export const DebouncedSearch = () => {
//   const [search, setSearch] = useState("");
//   const debouncedSearch = useDebounce(search, 500); // 500 ms de délai

//   // Simuler un effet ou une requête API déclenchée par la valeur différée
//   React.useEffect(() => {
//     if (debouncedSearch) {
//       console.log("Requête pour :", debouncedSearch);
//       // Effectue une requête API ou autre traitement ici
//     }
//   }, [debouncedSearch]);

//   return (
//     <div>
//       <input type="text" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} />
//       <p>Valeur immédiate : {search}</p>
//       <p>Valeur différée : {debouncedSearch}</p>
//     </div>
//   );
// };
