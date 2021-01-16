<template>
  <div
    class="note note--hover mx-auto my-2"
    v-b-tooltip.hover
    title="Click to show details"
    @click="$router.push({ name: 'note-id', params: { id: note.id } })"
  >
    <h3>{{ title }}</h3>
  </div>
</template>

<script lang="ts">
  import Vue, {PropType} from "vue";
  import {Note} from "~/types/note";

  export default Vue.extend({
  props: { note: { type: Object as PropType<Note>, required: true } },
  computed: {
    title(): string {
      if (this.note && this.note.title.length > 60) {
        return this.note.title.substring(0, 60) + "...";
      }
      return this.note.title;
    }
  }
});
</script>

<style scoped lang="scss"></style>
