import {ActionTree, GetterTree, MutationTree} from "vuex";
import {RootState} from "~/store";
import {Note} from "~/types/note";

export enum NotesActions {
  FETCH_NOTES = "fetchNotes",
  SAVE_NOTE = "saveNote"
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
    try {
      this._vm.$nextTick(() => {
        window.$nuxt.$loading.start();
      });
      const notes = await this.$axios.$get("/api/notes");
      commit(
        NotesMutations.SET_NOTES,
        notes.map(
          (note: {
            title: string;
            note: string;
            date: string;
            _id: string;
          }) => ({
            title: note.title,
            note: note.note,
            date: new Date(note.date),
            id: note._id
          })
        )
      );
    } catch (e) {
      // @ts-ignore
      this._vm.$bvToast.toast(e.message, {
        title: "Problem with loading data",
        variant: "danger",
        toaster: "b-toaster-bottom-right"
      });
    } finally {
      this._vm.$nextTick(() => {
        window.$nuxt.$loading.finish();
      });
    }
  },

  [NotesActions.SAVE_NOTE]: async function({ dispatch }, note: Note) {
    try {
      this._vm.$nextTick(() => {
        window.$nuxt.$loading.start();
      });
      if (note.id) {
        await this.$axios.$put("/api/notes", note);
      } else {
        await this.$axios.$post("/api/notes", note);
      }
      this._vm.$bvToast.toast("The note was saved successfully", {
        title: "Note saved",
        variant: "success",
        toaster: "b-toaster-bottom-right"
      });
      await dispatch(NotesActions.FETCH_NOTES);
      return Promise.resolve('Saved');
    } catch (e) {
      this._vm.$bvToast.toast(e.message, {
        title: "Problem with loading data",
        variant: "danger",
        toaster: "b-toaster-bottom-right"
      });
    } finally {
      this._vm.$nextTick(() => {
        window.$nuxt.$loading.finish();
      });
    }
  }
};
