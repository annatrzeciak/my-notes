<template>
  <div>
    <h1>Home</h1>
    <div>Notes : {{ notes.length }}</div>
    <div v-for="note in notes" :key="note.id">
      {{ note}}
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import {mapActions, mapState} from "vuex";

  export default Vue.extend({
  data: () => ({}),
  computed: {
    ...mapState("notes", ["notes"])
  },
  methods: {
    ...mapActions("notes", ["fetchNotes"])
  },
  created(): void {
    this.fetchNotes();
  }
});
</script>

<style lang="scss" scoped></style>
