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

<style lang="scss">
h1 {
  text-align: center;
}
.note {
  color: #000;
  background: #ffc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  padding: 15px;
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  word-break: break-word;
  position: relative;

  h3 {
    font-family: "Reenie Beanie", arial, sans-serif;
    font-size: 2rem;
    text-align: center;
  }
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
  &--hover {
    transition: transform 0.15s linear;
    cursor: pointer;
    &:hover {
      box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.7);
      transform: scale(1.25) !important;
      position: relative;
      z-index: 5;
    }
  }
  &--xl{
    min-height: 400px;
    width: 400px;
    height: auto;
    max-width: 100%;
    padding: 50px 15px;
    margin-right: auto;
    margin-left: auto;
    h3 {
      font-size: 2.8rem;
    }
    p {
      text-align: center;
      font-size: 1.3rem;
    }
    small{
      text-align: center;
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
}
</style>
