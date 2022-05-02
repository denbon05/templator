import { createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import { mount, Wrapper } from "@vue/test-utils";
import App from "@/App.vue";

const defaultComponentData = {
  localVue: createLocalVue(),
  attachTo: document.body,
};

describe("report type page", () => {
  let wrapper: Wrapper<Vue>;
  let vuetify: Vuetify;
  // const localVue = createLocalVue();

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("display page", async () => {
    wrapper = mount(App, { vuetify, ...defaultComponentData });

    console.log(wrapper.html());

    expect(true).toBeTruthy();
  });
});
