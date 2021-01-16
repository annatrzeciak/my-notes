<template>
  <note-details :note="note" />
</template>

<script lang="ts">
  import Vue from "vue";
  import {mapGetters} from "vuex";
  import {Note} from "~/types/note";

  export default Vue.extend({
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
  }
});
</script>

<style lang="scss" scoped></style>
