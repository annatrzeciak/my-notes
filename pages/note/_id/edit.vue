<template>
  <b-row class="justify-content-center">
    <b-col col :lg="8" :md="10">
      <h1>Edit note</h1>
      <note-form v-if="note" :note="note" @submitted="save" ref="noteForm" />
      <b-alert v-else show variant="warning">
        <h4 class="alert-heading">No data to display</h4>
        <p>
          No data to display.
          <b-button
            class="p-0"
            @click="fetchNotes"
            variant="link"
            v-b-tooltip.hover
            title="Click to edit note"
            >Fetch details again</b-button
          >
          or return to <nuxt-link :to="{ name: 'index' }">home page</nuxt-link>
        </p>
      </b-alert>
    </b-col>
  </b-row>
</template>

<script lang="ts">
  import Vue from "vue";
  import {mapActions, mapGetters} from "vuex";
  import {Note} from "~/types/note";

  export default Vue.extend({
  components: {},
  computed: {
    ...mapGetters("notes", ["notes"]),

    note(): Note | null {
      if (this.$route.params.id) {
        return this.notes.find(
          (note: Note) => note.id === this.$route.params.id
        );
      }
      return null;
    }
  },
  methods: {
    ...mapActions("notes", ["fetchNotes", "saveNote"]),
    async save(form: { title: string; note: string }) {
      if (this.note) {
        const response = await this.saveNote({
          id: this.note.id,
          title: form.title,
          note: form.note,
          date: this.note.date
        });
        if (response) {
          this.$router.push({ name: "note-id", params: { id: this.note.id } });
        }
      }
    }
  }
});
</script>

<style lang="scss" scoped></style>
