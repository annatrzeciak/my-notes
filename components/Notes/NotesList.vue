<template>
  <div>
    <div v-if="notes.length" class="notes-list">
      <note v-for="note in notes" :note="note" :key="note.id" />
    </div>
    <div class="notes-list--empty" v-else>you don't have saved notes</div>
  </div>
</template>

<script lang="ts">
  import Vue, {PropType} from "vue";
  import {Note} from "~/types/note";

  export default Vue.extend({
  props: { notes: { type: Array as PropType<Array<Note>>, default: () => [] } }
});
</script>

<style scoped lang="scss">
.notes-list {
  display: flex;
  flex-wrap: wrap;
  /deep/ .note {
    &:nth-of-type(even) {
      transform: rotate(4deg);
      position: relative;
      top: 5px;
      background: #cfc;
    }
    &:nth-of-type(3n) {
      transform: rotate(-3deg);
      position: relative;
      top: -5px;
      background: #ccf;
    }
    &:nth-of-type(5n) {
      transform: rotate(5deg);
      position: relative;
      top: -10px;
    }
  }
  &--empty {
    text-align: center;
  }
}
</style>
