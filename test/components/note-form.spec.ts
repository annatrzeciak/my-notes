import {createLocalVue, mount} from "@vue/test-utils";
import {describe, expect, it} from "@jest/globals";
import NoteForm from "~/components/Notes/NoteForm.vue";
import Vuex from "vuex";
import vueBootstrap from "bootstrap-vue";

const localVue = createLocalVue();
localVue.use(vueBootstrap);
localVue.use(Vuex);

const factory = (propsData = {}) => {
  return mount(NoteForm, { localVue, propsData });
};

describe("Note form", () => {
  it("show empty form", () => {
    const wrapper = factory({});
    expect(wrapper.findAll("input")).toHaveLength(1);

    expect((<HTMLInputElement>wrapper.find("input").element).value).toEqual("");
    expect(wrapper.findAll("textarea")).toHaveLength(1);
    expect((<HTMLInputElement>wrapper.find("textarea").element).value).toEqual(
      ""
    );

    expect(wrapper.findAll("button")).toHaveLength(2);
  });

  it("empty form - show errors after submit", () => {
    const wrapper = factory({});
    const vm = wrapper.vm as any;
    expect(vm.form.title).toEqual("");
    expect(vm.form.note).toEqual("");
    vm.submit();
    expect(wrapper.findAll(".invalid-feedback")).toHaveLength(2);
  });

  it("submit correct form", () => {
    const wrapper = factory({
      note: { title: "Note 123", note: "Note 123 content" }
    });
    const vm = wrapper.vm as any;
    expect(vm.form.title).toEqual("Note 123");
    expect(vm.form.note).toEqual("Note 123 content");
    vm.submit();
    expect(wrapper.findAll(".invalid-feedback")).toHaveLength(0);
    expect(wrapper.emitted().submitted).toEqual([
      [
        {
          title: "Note 123",
          note: "Note 123 content"
        }
      ]
    ]);
  });


  it("reset form", () => {
    const wrapper = factory({
      note: { title: "Note 123", note: "Note 123 content" }
    });
    const vm = wrapper.vm as any;
    expect(vm.form.title).toEqual("Note 123");
    expect(vm.form.note).toEqual("Note 123 content");
    vm.reset();
    expect(vm.form.title).toEqual("");
    expect(vm.form.note).toEqual("");
  });
});
