<template>
  <b-row class="justify-content-center">
    <b-col col :lg="8" :md="10">
      <h1>Added notes</h1>
      <b-row>
        <b-col class="d-flex justify-content-end mb-5">
          <nuxt-link
            :to="{ name: 'note-add' }"
            v-b-tooltip.hover
            title="Add new note"
          >
            <b-icon-file-earmark-plus variant="success" scale="2" />
          </nuxt-link>
        </b-col>
      </b-row>
      <notes-list :notes="notes" />
    </b-col>
  </b-row>
</template>

<script lang="ts">
  import Vue from "vue";
  import {mapActions, mapGetters} from "vuex";
  import {BIconFileEarmarkPlus} from "bootstrap-vue";

  export default Vue.extend({
  data: () => ({}),
  computed: {
    ...mapGetters("notes", ["notes"])
  },
  components: {
    BIconFileEarmarkPlus
  },
  methods: {
    ...mapActions("notes", ["fetchNotes"])
  },
  mounted(): void {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });
  },

  created() {
    this.fetchNotes();
  }
});
</script>

<style lang="scss" scoped></style>
