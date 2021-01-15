<template>
  <div
    class="note mx-auto my-2"
    v-b-tooltip.hover
    title="Click to show details"
  >
    <h3>{{ note.title }}</h3>
  </div>
</template>

<script lang="ts">
  import Vue, {PropType} from "vue";
  import {Note} from "~/types/note";

  export default Vue.extend({
  props: { note: { type: Object as PropType<Note>, required: true } }
});
</script>

<style scoped lang="scss">
.note {
  font-family: "Reenie Beanie", arial, sans-serif;
  color: #000;
  background: #ffc;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10em;
  width: 10em;
  padding: 1em;
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  transition: transform 0.15s linear;
  cursor: pointer;
  h3 {
    font-size: 2rem;
  }
  &:hover {
    box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.7);
    transform: scale(1.25) !important;
    position: relative;
    z-index: 5;
  }
}
</style>
