<template>
  <div>
    <b-navbar class="mb-4" type="dark" variant="secondary">
      <b-navbar-brand :to="{ name: 'index' }" nuxt>My notes</b-navbar-brand>
    </b-navbar>
    <b-container>
      <Nuxt />
    </b-container>
  </div>
</template>

<style lang="scss"></style>
