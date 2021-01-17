<template>
  <div :class="['loading', { 'loading--visible': loading }]">
    <b-spinner variant="primary" class="mb-2" />
    <div class="loading__text">Loading...</div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      // for better animation
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }
});
</script>

<style scoped lang="scss">
.loading {
  color: white;
  z-index: -1;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  background: #34393e;
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transition: opacity 0.5s, z-index 0s 0.5s;
}
.loading--visible {
  opacity: 0.95;
  z-index: 200;
  transition: opacity 0.5s;
}
</style>
