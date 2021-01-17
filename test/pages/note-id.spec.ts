import {createLocalVue, mount} from "@vue/test-utils";
import {beforeEach, describe, expect, it, jest} from "@jest/globals";
import NoteId from "~/pages/note/_id/index.vue";
import Vuex from "vuex";
import BootstrapVue from "bootstrap-vue";
import VueRouter from 'vue-router'

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue)
localVue.use(VueRouter)
const router = new VueRouter()

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

    wrapper = mount(NoteId, {
      store: mockStore,
      localVue,
      router,
      propsData: {},
      mocks: {
        $store: mockStore
      }
    });
  });


  it("Empty note", () => {
    expect(wrapper.findAll(".alert-warning")).toHaveLength(1);
    expect(wrapper.find(".alert-warning h4").text()).toContain(
      "No data to display"
    );
  });
});
