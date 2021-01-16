<template>
  <div class="notes-list">
    <h4 class="notes-list--empty w-100 mb-3 text-center " v-if="!notes.length">
      You don't have saved notes
    </h4>

    <div
      class="note note--hover"
      v-b-tooltip.hover
      title="Add new note"
      @click="$router.push({name: 'note-add'})"
    >
      <h4>+</h4>
      <p>Add new note</p>
    </div>
    <note-preview
      v-if="notes.length"
      v-for="note in notes"
      :note="note"
      :key="note.id"
    />
  </div>
</template>

<script lang="ts">
  import Vue, {PropType} from "vue";
  import {Note} from "~/types/note";
  import NotePreview from "~/components/Notes/Note.vue";

  export default Vue.extend({
  props: { notes: { type: Array as PropType<Array<Note>>, default: () => [] } },
  components: { NotePreview }
});
</script>

<style scoped lang="scss">
.notes-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
