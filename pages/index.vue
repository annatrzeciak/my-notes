<template>
  <b-row class="justify-content-center">
    <b-col col :lg="8" :md="10">
      <h1>Added notes</h1>
      <b-row>
        <b-col :col="12" class="d-flex justify-content-end mb-5">
          <nuxt-link :to="{ name: 'note-add' }">
            <svg
              v-b-tooltip.hover
              title="Add new note"
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              class="bi bi-file-earmark-plus-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z"
              />
            </svg>
          </nuxt-link>
        </b-col>
      </b-row>
      <notes-list :notes="notes" />
    </b-col>
  </b-row>
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
  mounted(): void {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });
  },
  async created() {
    try {
      await this.fetchNotes();
    } catch (e) {
      console.error(e);
    } finally {
      this.$nuxt.$loading.finish();
    }
  }
});
</script>

<style lang="scss" scoped>
a {
  svg {
    fill: var(--success);
    opacity: 0.8;
  }
  &:hover svg {
    opacity: 1;
  }
}
</style>
