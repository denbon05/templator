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

describe("main component", () => {
  let wrapper: Wrapper<Vue>;
  let vuetify: Vuetify;
  let textEditor: Wrapper<Vue>;
  const company = {
    appealTo: "Harry Gooding",
    title: "Fantasy company",
    city: "Newerland",
    street: "77 Newerstreet",
    position: "jr. Magician",
  };
  const companyKeysValues = Object.entries(company);

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(App, {
      vuetify,
      ...defaultComponentData,
    });
    textEditor = wrapper.find('[name="template"]');
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("template", async () => {
    const templateTexts = [
      "Dear: ",
      "Company name: ",
      "Where company is located (city): ",
      "Company street: ",
      "What position: ",
    ];
    const tokenKeys = companyKeysValues.map(([key]) =>
      wrapper.vm.$data.template.formatToken(key)
    );

    for (let idx = 0; idx < companyKeysValues.length; idx++) {
      const [key, value] = companyKeysValues[idx];
      const companyInput = wrapper.find(`[name="${key}"]`);
      companyInput.setValue(value);

      const prevTemplateData = (textEditor.element as HTMLInputElement).value;
      const templateContextItem = templateTexts[idx];
      textEditor.setValue(`${prevTemplateData}\n${templateContextItem}`);

      await wrapper.find(`#token_btn_${key}`).trigger("click");
    }

    const expectedRawTemplate = tokenKeys
      .map((tokenKey, idx) => `${templateTexts[idx]}${tokenKey}`)
      .join("\n");
    const actualRawTemplate = (
      textEditor.element as HTMLInputElement
    ).value.trimStart();

    expect(actualRawTemplate).toEqual(expectedRawTemplate);
  });
});
