import { apiSlice } from "../../../app/api/apiSlice";
import { IApiNote, IApiNoteWithPopulatedUser, INote, INoteWithPopulatedUser } from "../../../types/note";

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<INoteWithPopulatedUser[], void>({
      query: () => ({
        url: "/notes",
        method: "GET",
      }),
      transformResponse: (response: IApiNoteWithPopulatedUser[]) => {
        return response.map((note) => ({
          ...note,
          id: note._id, // Ajout d'un champ `id` basé sur `_id`
        }));
      },
      providesTags: (result) =>
        result
          ? [{ type: "Note", id: "LIST" }, ...result.map((note) => ({ type: "Note" as const, id: note._id }))]
          : [{ type: "Note", id: "LIST" }],
      // refetchOnInvalidate: true,
    }),

    getNoteById: builder.query<INoteWithPopulatedUser, { noteId: string }>({
      query: ({ noteId }) => ({
        url: `/notes/${noteId}`,
        method: "GET",
      }),
      transformResponse: (response: IApiNoteWithPopulatedUser) => {
        return {
          ...response,
          id: response._id, // Ajout d'un champ `id` basé sur `_id`
        };
      },
      providesTags: (result) =>
        result
          ? [
              { type: "Note", id: result.id }, // Associe l'utilisateur par ID
              { type: "Note", id: "LIST" }, // Invalide aussi la liste
            ]
          : [{ type: "Note", id: "LIST" }],
    }),

    // Ajout de l'endpoint createNote
    createNote: builder.mutation<INote, { title: string; content: string; userId: string }>({
      query: (newNote) => ({
        url: "/notes",
        method: "POST",
        body: newNote,
      }),

      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),

    // Ajout de l'endpoint updateNoteById
    updateNoteById: builder.mutation<
      INote,
      { id: string; title?: string; content?: string; assignedTo?: string; createdBy?: string; status: string }
    >({
      query: ({ id, title, content, assignedTo = undefined, createdBy, status }) => ({
        url: `/notes/${id}`,
        method: "PATCH",
        body: { title, content, assignedTo, createdBy, status },
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Note", id: "LIST" },
        { type: "Note", id: id },
      ],
    }),

    deleteNoteById: builder.mutation<INote, { id: string }>({
      query: ({ id }) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Note", id: "LIST" },
        { type: "Note", id: id },
      ],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useGetNoteByIdQuery,
  useDeleteNoteByIdMutation,
  useUpdateNoteByIdMutation,
} = notesApiSlice;

// // Sélecteur pour les résultats bruts de l'API
// export const selectNotesResult = (queryArg: {
//   page: number;
//   limit: number;
//   sort?: "asc" | "desc";
//   sortBy?: string;
//   search?: string;
//   roles?: string[];
//   active?: boolean;
// }) => notesApiSlice.endpoints.getNotes.select(queryArg);

// // Créez un sélecteur pour accéder aux données de l'utilisateur transformées
// const selectNotesData =
//   (queryArg: {
//     page: number;
//     limit: number;
//     sort?: "asc" | "desc";
//     sortBy?: string;
//     search?: string;
//     roles?: string[];
//     active?: boolean;
//   }) =>
//   (state: RootState) => {
//     const notesResult = notesApiSlice.endpoints.getNotes.select(queryArg)(state); // Appeler avec l'état Redux
//     return notesResult?.data ?? initialState; // Retourner les données ou l'état initial
//   };

// Sélecteurs pour accéder aux utilisateurs via l'adapter
// export const {
//   selectAll: selectAllNotes,
//   selectById: selectNoteById,
//   selectIds: selectNoteIds,
// } = notesAdapter.getSelectors((state: RootState) =>
//   selectNotesData({ page: 1, limit: 10, sort: "asc", sortBy: "notename" })(state),
// );
