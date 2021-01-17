import {createLocalVue, mount} from "@vue/test-utils";
import {beforeEach, describe, expect, it, jest} from "@jest/globals";
import Home from "~/pages/index.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Home page", () => {
  let actions: any;
  let mockStore: any;
  let wrapper: any;

  beforeEach(() => {
    actions = {
      fetchNotes: jest.fn()
    };

    mockStore = new Vuex.Store({
      modules: {
        notes: {
          namespaced: true,
          actions
        }
      }
    });

    wrapper = mount(Home, {
      store: mockStore,
      localVue,
      propsData: {},
      mocks: {
        $store: mockStore
      }
    });
  });

  it("fetch notes", () => {
    expect(actions.fetchNotes).toHaveBeenCalled();
  });
});
