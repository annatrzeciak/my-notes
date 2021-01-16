<template>
  <div>
    <note-details v-if="note" :note="note" />
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
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import {mapActions, mapGetters} from "vuex";
  import {Note} from "~/types/note";
  import NoteDetails from "~/components/Notes/NoteDetails.vue";

  export default Vue.extend({
  components: { NoteDetails },
  computed: {
    ...mapGetters("notes", ["notes"]),

    note() {
      if (this.$route.params.id) {
        return this.notes.find(
          (note: Note) => note.id === this.$route.params.id
        );
      }
      return null;
    }
  },
  methods: {
    ...mapActions("notes", ["fetchNotes"])
  }
});
</script>

<style lang="scss" scoped>
.alert-warning {
  button {
    vertical-align: inherit;
  }
}
</style>
