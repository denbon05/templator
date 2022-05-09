<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="10" lg="3"
          ><aside>
            <v-card class="mx-auto" outlined>
              <v-list-item>
                <v-list-item-title>{{ company.title }}</v-list-item-title>
              </v-list-item>
              <v-list-item
                :key="`input_${key}`"
                v-for="{ key, type } in keyWords"
              >
                <v-text-field
                  :label="$t(`company.${key}`)"
                  outlined
                  :name="key"
                  size="small"
                  dense
                  :type="type"
                  v-model="keyMapper[key]"
                ></v-text-field>
              </v-list-item>
              <v-list-item>
                <v-checkbox
                  v-model="company.isBigCity"
                  :label="$t('company.isBigCity')"
                ></v-checkbox>
              </v-list-item>
            </v-card></aside
        ></v-col>

        <v-col cols="12" md="11" lg="7" xxl="7"
          ><v-main class="d-flex flex-column">
            <section class="d-flex flex-wrap">
              <div class="text-subtitle-1 mt-1">{{ $t("token.add") }}:</div>
              <div>
                <v-btn-toggle
                  dense
                  group
                  class="mb-2 d-flex flex-wrap"
                  v-model="selectedToken"
                >
                  <v-btn
                    small
                    :id="`token_btn_${key}`"
                    text
                    :key="`token_${key}`"
                    v-for="{ key } in keyWords"
                  >
                    {{ $t(`company.${key}`) }}
                  </v-btn>
                </v-btn-toggle>
              </div>
            </section>
            <v-textarea
              outlined
              :readonly="!isEditorMode"
              no-resize
              hide-details
              rows="15"
              name="template"
              :value="template.getData()"
              v-model="templateData"
            ></v-textarea>
            <section class="mt-1">
              <v-btn
                @click="switchEditorMode"
                class="ma-2"
                :color="btnVisibleColor"
                outlined
                >{{ $t("template.show") }}</v-btn
              >
              <v-btn
                @click="saveTemplate"
                class="ma-2"
                color="warning"
                outlined
                >{{ $t("localStorage.saveTo") }}</v-btn
              >
              <v-btn
                @click="loadTemplate"
                class="ma-2"
                color="primary"
                outlined
                >{{ $t("localStorage.loadFrom") }}</v-btn
              >
            </section>
          </v-main></v-col
        >
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { omit } from "lodash";
import Template from "@/models/Template";

export default Vue.extend({
  name: "App",

  data: () => ({
    company: {
      appealTo: "",
      title: "",
      city: "",
      street: "",
      position: "",
      isBigCity: false,
    },
    companyOptionsSelect: ["isBigCity"],
    isEditorMode: true,
    selectedToken: null,

    template: new Template("company"),
  }),

  computed: {
    keyWords() {
      return Object.entries(omit(this.company, this.companyOptionsSelect)).map(
        ([key]) => ({
          key,
          type: "text",
        })
      );
    },

    keyMapper() {
      return new Proxy(this.company, {
        get(company: any, key: string) {
          return company[key];
        },
      });
    },

    btnVisibleColor() {
      return this.isEditorMode ? "secondary" : "success";
    },

    templateData: {
      get() {
        return this.template.getData();
      },
      set(value: string) {
        this.template.setData(value);
      },
    },
  },

  methods: {
    switchEditorMode() {
      this.isEditorMode = !this.isEditorMode;
      this.template.switchTemplateMode();
    },

    loadTemplate() {
      this.template.load();
    },

    saveTemplate() {
      this.template.save();
    },
  },

  watch: {
    selectedToken(newBtnIdx, oldBtnIdx) {
      const { template, keyWords } = this;
      const { key: tokenKey } = keyWords[newBtnIdx ?? oldBtnIdx];

      template.setToken(tokenKey);
    },
  },

  created() {
    this.company.appealTo = this.$t("company.defaultAppealTo") as string;
    this.company.position = this.$t("company.defaultPosition") as string;
    this.template.setTokensData(this.company);
  },
});
</script>
