import {createLocalVue, mount} from "@vue/test-utils";
import {beforeEach, describe, expect, it, jest} from "@jest/globals";
import NoteDetails from "~/components/Notes/NoteDetails.vue";
import Vuex from "vuex";
import vueBootstrap from "bootstrap-vue";

const localVue = createLocalVue();
localVue.use(vueBootstrap);
localVue.use(Vuex);

describe("Note details component", () => {
  let actions: any;
  let mockStore: any;
  let wrapper: any;

  beforeEach(() => {
    actions = {
      removeNote: jest.fn(() => {
        return Promise.resolve("Removed");
      })
    };

    mockStore = new Vuex.Store({
      modules: {
        notes: {
          namespaced: true,
          actions
        }
      }
    });

    wrapper = mount(NoteDetails, {
      store: mockStore,
      localVue,
      propsData: {
        note: {
          id: "1",
          title: "Note 1",
          note: "Note 1 content",
          date: new Date("2020-01-01")
        }
      },
      mocks: {
        $store: mockStore
      }
    });
  });

  it("show note preview", () => {
    expect(wrapper.findAll(".note--xl")).toHaveLength(1);
    expect(wrapper.find(".note > h3").text()).toContain("Note 1");
    expect(wrapper.find(".note > p").text()).toContain("Note 1 content");
    expect(wrapper.find(".note > small").text()).toContain(
      "added: " + new Date("2020-01-01").toLocaleString()
    );
  });

  it("delete note", async () => {
    const vm = wrapper.vm as any;

    vm.deleteNote();
    expect(actions.removeNote).toHaveBeenCalled();
  });
});
