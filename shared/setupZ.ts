import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

// Étendre Zod pour supporter .openapi()
extendZodWithOpenApi(z);

export { z }; // Réexporter pour une utilisation dans les autres fichiers
