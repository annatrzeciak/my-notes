<template>
  <div>
    <div class="note mx-auto my-5" v-b-tooltip.hover v-if="note">
      <h3>{{ note.title }}</h3>
      <p>{{ note.note }}</p>
      <p>added: {{ note.date }}</p>
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
  import {mapActions} from "vuex";

  export default Vue.extend({
  props: { note: { type: Object as PropType<Note> } },
  components: { BIconPencilSquare, BIconTrash },
  methods: {
    ...mapActions("notes", ["fetchNotes"]),

    deleteNote() {
      console.log("delete");
    }
  }
});
</script>

<style scoped lang="scss">
.note {
  color: #000;
  background: #ffc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 400px;
  max-height: 100%;
  max-width: 100%;
  padding: 50px 15px;
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  transition: transform 0.15s linear;
  position: relative;
  h3 {
    font-family: "Reenie Beanie", arial, sans-serif;
    text-align: center;
    font-size: 2.8rem;
  }
  p {
    font-size: 1.3rem;
  }
  footer {
    position: absolute;
    bottom: 15px;
    right: 15px;
    button {
      box-shadow: none;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
}
.alert-warning {
  button {
    vertical-align: inherit;
  }
}
</style>
