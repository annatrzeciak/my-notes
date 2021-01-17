import {createLocalVue, mount} from "@vue/test-utils";
import {beforeEach, describe, expect, it, jest} from "@jest/globals";
import NoteAdd from "~/pages/note/add.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Note add page", () => {
  let actions: any;
  let mockStore: any;
  let wrapper: any;

  beforeEach(() => {
    actions = {
      saveNote: jest.fn()
    };

    mockStore = new Vuex.Store({
      modules: {
        notes: {
          namespaced: true,
          actions
        }
      }
    });

    wrapper = mount(NoteAdd, {
      store: mockStore,
      localVue,
      propsData: {},
      mocks: {
        $store: mockStore
      }
    });
  });

  it("Add note action", () => {
    const vm = wrapper.vm;
    vm.addNote({ title: "note 1", note: "Note 1" });
    expect(actions.saveNote).toHaveBeenCalled();
  });
});
