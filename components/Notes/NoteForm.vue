<template>
  <b-form class="note note--xl" @submit.stop.prevent="submit">
    <b-form-group class="w-100 px-3" label="Title:">
      <b-form-input
        v-model="form.title"
        placeholder="Enter title"
        :state="$v.form.title.$error ? false : null"
        @keypress="$v.form.title.$reset"
      ></b-form-input>
      <b-form-invalid-feedback
        v-if="!$v.form.title.required"
        :state="$v.form.title.$error && !$v.form.title.required ? false : null"
      >
        Title is required </b-form-invalid-feedback
      ><b-form-invalid-feedback
        v-else-if="!$v.form.title.minLength"
        :state="$v.form.title.$error && !$v.form.title.minLength ? false : null"
      >
        Title must contain at least 3 characters
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group class="w-100 px-3" label="Note:">
      <b-form-textarea
        v-model="form.note"
        placeholder="Enter note"
        rows="3"
        :state="$v.form.note.$error ? false : null"
        @keypress="$v.form.note.$reset"
      ></b-form-textarea>
      <b-form-invalid-feedback
        v-if="!$v.form.note.required"
        :state="$v.form.note.$error && !$v.form.note.required ? false : null"
      >
        Note is required </b-form-invalid-feedback
      ><b-form-invalid-feedback
        v-if="!$v.form.note.minLength"
        :state="$v.form.note.$error && !$v.form.note.minLength ? false : null"
      >
        Note must contain at least 3 characters
      </b-form-invalid-feedback>
    </b-form-group>
    <footer class="mt-auto w-100 d-flex justify-content-end">
      <b-button
        @click="cancel"
        variant="link"
        v-b-tooltip.hover
        title="Click to return"
      >
        <b-icon-box-arrow-left scale="1.6" variant="secondary" />
      </b-button>
      <b-button
        variant="link"
        type="submit"
        v-b-tooltip.hover
        title="Click to save note"
      >
        <b-icon-check-square scale="1.6" variant="success"></b-icon-check-square>
      </b-button>
    </footer>
  </b-form>
</template>

<script lang="ts">
  import Vue, {PropType} from "vue";
  import {Note} from "~/types/note";

  import {validationMixin} from "vuelidate";
  import {minLength, required} from "vuelidate/lib/validators";
  import {BIconBoxArrowLeft, BIconCheckSquare} from "bootstrap-vue";

  export default Vue.extend({
  props: { note: { type: Object as PropType<Note>, required: false } },
  mixins: [validationMixin],
  components: { BIconCheckSquare, BIconBoxArrowLeft },
  validations: {
    form: {
      title: { required, minLength: minLength(3) },
      note: { required, minLength: minLength(3) }
    }
  },
  data: () => ({
    form: {
      title: "",
      note: ""
    } as {
      title: string;
      note: string;
    }
  }),
  created(): void {
    if (this.note) {
      this.form.title = this.note.title;
      this.form.note = this.note.note;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$bvToast.toast(
          "Form contains errors, please correct and try again",
          {
            title: `Invalid form`,
            variant: "danger",
            toaster: "b-toaster-bottom-right"
          }
        );
      } else {
        this.$emit("submitted", this.form);
      }
    },
    cancel() {
      if (this.note && this.note.id) {
        this.$router.push({ name: "note-id", params: { id: this.note.id } });
      } else {
        this.$router.push({ name: "index" });
      }
    },
    reset() {
      this.$v.$reset();
      this.form = {
        title: "",
        note: ""
      };
    }
  }
});
</script>

<style scoped lang="scss"></style>
