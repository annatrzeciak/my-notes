<template>
  <b-row class="justify-content-center">
    <b-col col :lg="8" :md="10">
      <h1>Added notes</h1>
      <notes-list :notes="notes" />
    </b-col>
  </b-row>
</template>

<script lang="ts">
  import Vue from "vue";
  import {mapActions, mapGetters} from "vuex";
  import NotesList from "~/components/Notes/NotesList.vue";

  export default Vue.extend({
  data: () => ({}),
  computed: {
    ...mapGetters("notes", ["notes"])
  },
  components: {
    NotesList
  },
  methods: {
    ...mapActions("notes", ["fetchNotes"])
  },

  created() {
    this.fetchNotes();
  }
});
</script>

<style lang="scss" scoped></style>
