import {ActionTree, GetterTree, MutationTree} from "vuex";
import {RootState} from "~/store";
import {Note} from "~/types/note";

export enum NotesActions {
  FETCH_NOTES = "fetchNotes"
}

export enum NotesMutations {
  SET_NOTES = "setNotes"
}

export const state = () => ({
  notes: [] as Array<Note>
});

export type NotesModuleState = ReturnType<typeof state>;

export const getters: GetterTree<NotesModuleState, RootState> = {
  notes: state => state.notes
};

export const mutations: MutationTree<NotesModuleState> = {
  [NotesMutations.SET_NOTES]: (state, notes: Array<Note>) =>
    (state.notes = notes)
};

export const actions: ActionTree<NotesModuleState, RootState> = {
  [NotesActions.FETCH_NOTES]: async function({ commit }) {
    const notes = await this.$axios.$get("/notes");
    commit(
      NotesMutations.SET_NOTES,
      notes.map(
        (note: { title: string; note: string; date: string; _id: string }) => ({
          title: note.title,
          note: note.note,
          date: new Date(note.date),
          id: note._id
        })
      )
    );
  }
};
