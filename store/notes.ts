import {ActionTree, GetterTree, MutationTree} from "vuex";
import {RootState} from "~/store";
import {Note} from "~/types/note";

export enum NotesActions {
  FETCH_NOTES = "fetchNotes",
  SAVE_NOTE = "saveNote",
  REMOVE_NOTE = "removeNote"
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
      this._vm.$bvToast.toast(e.response.data, {
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
      if (note.id.length) {
        await this.$axios.$put("/api/notes/" + note.id, note);
      } else {
        await this.$axios.$post("/api/notes", note);
      }
      this._vm.$bvToast.toast("The note was saved successfully", {
        title: "Note saved",
        variant: "success",
        toaster: "b-toaster-bottom-right"
      });
      await dispatch(NotesActions.FETCH_NOTES);
      return Promise.resolve("Saved");
    } catch (e) {
      this._vm.$bvToast.toast(e.response.data, {
        title: "Problem with saving data",
        variant: "danger",
        toaster: "b-toaster-bottom-right"
      });
    } finally {
      this._vm.$nextTick(() => {
        window.$nuxt.$loading.finish();
      });
    }
  },
  [NotesActions.REMOVE_NOTE]: async function({ dispatch }, note: Note) {
    try {
      this._vm.$nextTick(() => {
        window.$nuxt.$loading.start();
      });
      await this.$axios.$delete("/api/notes/" + note.id);

      this._vm.$bvToast.toast("The note was removed successfully", {
        title: "Note saved",
        variant: "success",
        toaster: "b-toaster-bottom-right"
      });
      await dispatch(NotesActions.FETCH_NOTES);
      return Promise.resolve("Removed");
    } catch (e) {
      this._vm.$bvToast.toast(e.response.data, {
        title: "Problem with removing data",
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
