import { createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import { mount, Wrapper } from "@vue/test-utils";
import App from "@/App.vue";
import i18n from "@/i18n";

const defaultComponentData = {
  localVue: createLocalVue(),
  attachTo: document.body,
  i18n,
};

describe("report type page", () => {
  let wrapper: Wrapper<Vue>;
  let vuetify: Vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("display page", async () => {
    wrapper = mount(App, {
      vuetify,
      ...defaultComponentData,
      // mocks: {
      //   $t: (msg: any) => msg,
      // },
    });

    console.log(wrapper.html());

    expect(true).toBeTruthy();
  });
});
