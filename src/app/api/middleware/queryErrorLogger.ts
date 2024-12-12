// import { isRejectedWithValue } from "@reduxjs/toolkit";

// export const rtkQueryErrorLogger = (api) => (next) => (action) => {
//   if (isRejectedWithValue(action)) {
//     console.error("RTK Query Error:", action.payload);

//     // Si meta est présent, loguez les headers
//     const meta = action?.meta;
//     if (meta?.response) {
//       console.log("Headers:", {
//         limit: meta.response.headers.get("RateLimit-Limit"),
//         remaining: meta.response.headers.get("RateLimit-Remaining"),
//         reset: meta.response.headers.get("RateLimit-Reset"),
//       });
//     }
//   }
//   return next(action);
// };
