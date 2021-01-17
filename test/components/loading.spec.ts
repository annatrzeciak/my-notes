import {createLocalVue, mount} from "@vue/test-utils";
import {describe, expect, it} from "@jest/globals";
import Loading from "~/components/Loading.vue";
import vueBootstrap from "bootstrap-vue";

const localVue = createLocalVue();
localVue.use(vueBootstrap);
const factory = (propsData = {}) => {
  return mount(Loading, { localVue, propsData });
};

describe("Loading component", () => {
  it("show spinner", async () => {
    const wrapper = factory();
    const vm = wrapper.vm as any;
    await vm.start();
    expect(vm.loading).toEqual(true);
    expect(wrapper.findAll(".loading")).toHaveLength(1);
    expect(wrapper.findAll(".loading--visible")).toHaveLength(1);
    expect(wrapper.find(".loading__text").text()).toContain("Loading...");
  });

  it("hide showed spinner", async () => {
    const wrapper = factory();
    const vm = wrapper.vm as any;
    await vm.start();
    expect(vm.loading).toEqual(true);

    expect(wrapper.findAll(".loading--visible")).toHaveLength(1);
    await vm.finish();
    setTimeout(() => {
      expect(vm.loading).toEqual(false);

      expect(wrapper.findAll(".loading--visible")).toHaveLength(0);
    }, 500);
  });
});
