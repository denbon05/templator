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
    hrName: "Harry Gooding",
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
      "Dear",
      "Company name is",
      "Where company is located (city)",
      "Company street",
      "What position",
    ];

    companyKeysValues.forEach(([key, value], idx) => {
      const companyInput = wrapper.find(`[name="${key}"]`);
      companyInput.setValue(value);

      const tokenButtons = wrapper
        .findAll("button")
        .filter((w) =>
          w.text().match(wrapper.vm.$t(`company.${key}`) as string)
        );
      tokenButtons.trigger("click");

      const prevTemplateData = (textEditor.element as HTMLInputElement).value;
      const templateContextItem = templateTexts[idx];
      textEditor.setValue(`${prevTemplateData}\n${templateContextItem} `);
    });

    const expectedTemplate = companyKeysValues
      .map(([, tokenValue], idx) => `${templateTexts[idx]} ${tokenValue}`)
      .join("\n");
    const actualTemplate = (textEditor.element as HTMLInputElement).value;

    expect(actualTemplate).toEqual(expectedTemplate);
  });
});
