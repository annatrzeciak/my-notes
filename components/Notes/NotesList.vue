<template>
  <div class="notes-list">
    <h4 class="notes-list--empty w-100 mb-3 text-center " v-if="!notes.length">
      You don't have saved notes
    </h4>
    <div
      v-if="notes"
      class="w-100 mb-3 d-flex justify-content-end align-items-center"
    >
      <span class="mr-2">Sort:</span>
      <b-button-group>
        <b-button
          variant="outline-secondary"
          v-b-tooltip.hover
          title="Click to sort from newest"
          :pressed="sortFrom === 'newest'"
          @click="sortFrom = 'newest'"
        >
          <b-icon-sort-numeric-down-alt />
        </b-button>
        <b-button
          variant="outline-secondary"
          v-b-tooltip.hover
          title="Click to sort from oldest"
          :pressed="sortFrom === 'older'"
          @click="sortFrom = 'older'"
        >
          <b-icon-sort-numeric-down />
        </b-button>
      </b-button-group>
    </div>

    <div
      class="note note--hover"
      v-b-tooltip.hover
      title="Add new note"
      @click="$router.push({ name: 'note-add' })"
    >
      <h4>+</h4>
      <p>Add new note</p>
    </div>
    <note-preview
      v-if="notes.length"
      v-for="note in sortedNotes"
      :note="note"
      :key="note.id"
    />
  </div>
</template>

<script lang="ts">
  import Vue, {PropType} from "vue";
  import {Note} from "~/types/note";
  import NotePreview from "~/components/Notes/Note.vue";
  import {BIconSortNumericDown, BIconSortNumericDownAlt} from "bootstrap-vue";

  export default Vue.extend({
  props: { notes: { type: Array as PropType<Array<Note>>, default: () => [] } },
  components: { NotePreview, BIconSortNumericDownAlt, BIconSortNumericDown },
  data: () => ({
    sortFrom: "newest"
  }),
  computed: {
    sortedFromNewest(): Array<Note> {
      return [...this.notes].sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      );
    },
    sortedNotes(): Array<Note> {
      if (this.sortFrom === "older") {
        return [...this.sortedFromNewest].reverse();
      }
      return this.sortedFromNewest;
    }
  }
});
</script>

<style scoped lang="scss">
.notes-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
