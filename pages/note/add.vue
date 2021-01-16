<template>
  <b-row class="justify-content-center">
    <b-col col :lg="8" :md="10">
      <h1>Add new note</h1>
      <note-form @submitted="addNote" ref="noteForm" />
    </b-col>
  </b-row>
</template>

<script lang="ts">
  import Vue from "vue";
  import NoteForm from "~/components/Notes/NoteForm.vue";
  import {mapActions} from "vuex";

  export default Vue.extend({
  components: { NoteForm },
  methods: {
    ...mapActions("notes", ["saveNote"]),
    async addNote(form: { title: string; note: string }) {
      const response = await this.saveNote({
        id: "",
        title: form.title,
        note: form.note,
        date: new Date()
      });
      if (response) {
        this.$refs.noteForm.reset();
      }
    }
  }
});
</script>

<style lang="scss" scoped></style>
