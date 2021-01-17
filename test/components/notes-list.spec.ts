import {createLocalVue, mount} from "@vue/test-utils";
import {describe, expect, it} from "@jest/globals";
import NotesList from "~/components/Notes/NotesList.vue";
import vueBootstrap from "bootstrap-vue";

const localVue = createLocalVue();
localVue.use(vueBootstrap);

const factory = (propsData = {}) => {
  return mount(NotesList, { localVue, propsData });
};

describe("Notes List component", () => {
  it("empty notes list", () => {
    const wrapper = factory();
    const vm = wrapper.vm as any;

    expect(wrapper.findAll("h4.notes-list--empty")).toHaveLength(1);
    expect(wrapper.find("h4.notes-list--empty").text()).toContain(
      "You don't have saved notes"
    );
    expect(vm.notes.length).toEqual(0);
    expect(vm.sortedFromNewest.length).toEqual(0);
    expect(vm.sortedNotes.length).toEqual(0);
  });

  it("notes list contains objects", () => {
    const wrapper = factory({
      notes: [
        {
          id: "1",
          title: "Note 1",
          note: "Note 1 content",
          date: new Date("2020-01-01")
        },
        {
          id: "2",
          title: "Note 2",
          note: "Note 2 content",
          date: new Date("2020-01-02")
        }
      ]
    });
    const vm = wrapper.vm as any;

    expect(wrapper.findAll("h4.notes-list--empty")).toHaveLength(0);
    expect(vm.notes.length).toEqual(2);
    expect(vm.sortedFromNewest.length).toEqual(2);
    expect(vm.sortedNotes.length).toEqual(2);
    expect(wrapper.findAll(".note")).toHaveLength(3);
  });

  it("notes list contains 'add new note'", () => {
    const wrapper = factory();

    expect(wrapper.findAll(".note")).toHaveLength(1);
    expect(wrapper.find(".note h4").text()).toContain("+");
  });

  it("change sort by in notes list", async () => {
    const wrapper = factory({
      notes: [
        {
          id: "1",
          title: "Note 1",
          note: "Note 1 content",
          date: new Date("2020-01-01")
        },
        {
          id: "2",
          title: "Note 2",
          note: "Note 2 content",
          date: new Date("2020-01-02")
        }
      ]
    });
    const vm = wrapper.vm as any;

    expect(vm.notes.length).toEqual(2);
    expect(vm.sortedFromNewest.length).toEqual(2);
    expect(vm.sortedNotes.length).toEqual(2);
    expect(vm.sortFrom).toEqual("newest");

    expect(vm.sortedNotes[0].title).toEqual("Note 2");
    expect(
      wrapper.find(".bi-sort-numeric-down-alt").element.parentElement?.className
    ).toContain("active");
    expect(
      wrapper.find(".bi-sort-numeric-down").element.parentElement?.className
    ).not.toContain("active");

    await wrapper.find(".bi-sort-numeric-down").trigger("click");
    expect(vm.sortFrom).toEqual("older");
    expect(vm.sortedNotes[0].title).toEqual("Note 1");

    expect(
      wrapper.find(".bi-sort-numeric-down-alt").element.parentElement?.className
    ).not.toContain("active");
    expect(
      wrapper.find(".bi-sort-numeric-down").element.parentElement?.className
    ).toContain("active");
  });
});
