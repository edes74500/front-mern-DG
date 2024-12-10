import {
  INoteCreateReqBodyDTO,
  INoteCreateResBodyDTO,
  INoteDeleteReqParamsDTO,
  INoteDeleteResBodyDTO,
  INoteGetByIdReqParamsDTO,
  INoteGetByIdResBodyDTO,
  INoteGetResBodyDTO,
  INoteGetResQueryDTO,
  NoteUpdateReqBodyDTO,
  NoteUpdateReqParamsDTO,
  NoteUpdateResBodyDTO,
} from "@edes74500/fixrepairshared";
import { apiSlice } from "../../../app/api/apiSlice";

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //* get notes with query params
    getNotes: builder.query<INoteGetResBodyDTO, INoteGetResQueryDTO>({
      query: () => ({
        url: "/notes",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [{ type: "Note", id: "LIST" }, ...result.map((note) => ({ type: "Note" as const, id: note.id }))]
          : [{ type: "Note", id: "LIST" }],
    }),

    //* get note by id
    getNoteById: builder.query<INoteGetByIdResBodyDTO, INoteGetByIdReqParamsDTO>({
      query: ({ noteId }) => ({
        url: `/notes/${noteId}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Note", id: result.id }, // Associe l'utilisateur par ID
              { type: "Note", id: "LIST" }, // Invalide aussi la liste
            ]
          : [{ type: "Note", id: "LIST" }],
    }),

    //* Ajout de l'endpoint createNote
    createNote: builder.mutation<INoteCreateResBodyDTO, INoteCreateReqBodyDTO>({
      query: (newNote) => ({
        url: "/notes",
        method: "POST",
        body: newNote,
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),

    //* Ajout de l'endpoint updateNoteById
    updateNoteById: builder.mutation<NoteUpdateResBodyDTO, NoteUpdateReqBodyDTO & NoteUpdateReqParamsDTO>({
      query: ({ noteId, title, content, assignedTo = undefined, status }) => ({
        url: `/notes/${noteId}`,
        method: "PUT",
        body: { title, content, assignedTo, status },
      }),
      invalidatesTags: (_, __, { noteId }) => [
        { type: "Note", id: "LIST" },
        { type: "Note", id: noteId },
      ],
    }),

    //* Suppression d'un note par son ID
    deleteNoteById: builder.mutation<INoteDeleteResBodyDTO, INoteDeleteReqParamsDTO>({
      query: ({ noteId }) => ({
        url: `/notes/${noteId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { noteId }) => [
        { type: "Note", id: "LIST" },
        { type: "Note", id: noteId },
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
