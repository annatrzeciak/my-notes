<template>
  <div>
    <div class="note note--xl mx-auto my-5" v-b-tooltip.hover v-if="note">
      <h3>{{ note.title }}</h3>
      <p>{{ note.note }}</p>
      <small>added: {{ note.date.toLocaleString() }}</small>
      <footer class="mt-auto w-100 d-flex justify-content-end">
        <b-button
          @click="
            $router.push({ name: 'note-id-edit', params: { id: note.id } })
          "
          variant="link"
          v-b-tooltip.hover
          title="Click to edit note"
        >
          <b-icon-pencil-square scale="1.6" variant="success" />
        </b-button>
        <b-button
          @click="$bvModal.show('delete-note-modal')"
          variant="link"
          v-b-tooltip.hover
          title="Click to delete note"
        >
          <b-icon-trash scale="1.6" variant="danger" />
        </b-button>
      </footer>
    </div>

    <b-modal
      id="delete-note-modal"
      title="Delete note"
      :ok-title="'Yes, delete'"
      :ok-variant="'danger'"
      @ok="deleteNote"
    >
      <p class="my-4">Are you sure you want to delete the note?</p>
    </b-modal>
  </div>
</template>

<script lang="ts">
  import Vue, {PropType} from "vue";
  import {Note} from "~/types/note";
  import {BIconPencilSquare, BIconTrash} from "bootstrap-vue";

  export default Vue.extend({
  props: { note: { type: Object as PropType<Note>, required: true } },
  components: { BIconPencilSquare, BIconTrash },
  methods: {
    deleteNote() {
      console.log("delete");
    }
  }
});
</script>

<style scoped lang="scss">
</style>
