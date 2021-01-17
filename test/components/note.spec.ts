import {mount} from "@vue/test-utils";
import {describe, expect, it} from "@jest/globals";
import Note from "~/components/Notes/Note.vue";

const factory = (propsData = {}) => {
  return mount(Note, { propsData });
};

describe("Note component", () => {
  it("show note preview", () => {
    const wrapper = factory({
      note: {
        id: "1",
        title: "Note 1",
        note: "Note 1 content",
        date: new Date("2020-01-01")
      }
    });

    expect(wrapper.findAll(".note")).toHaveLength(1);
    expect(wrapper.find(".note > h3").text()).toContain("Note 1");
  });

  it("shorten the name that is too long", () => {
    const wrapper = factory({
      note: {
        id: "1",
        title:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        note: "Note 1 content",
        date: new Date("2020-01-01")
      }
    });
    // 63 = 60 charts from string and 3 dots
    expect(wrapper.find(".note > h3").text().length).toBeLessThanOrEqual(63);
  });
});
