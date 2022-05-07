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
                  :label="$t('company.inBigCity')"
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
              no-resize
              hide-details
              rows="15"
              name="template"
              :value="template"
              v-model="template"
            ></v-textarea>
            <section class="mt-1">
              <v-btn @click="save" class="ma-2" color="warning" outlined>{{
                $t("localStorage.saveTo")
              }}</v-btn>
              <v-btn class="ma-2" color="primary" outlined>{{
                $t("localStorage.loadFrom")
              }}</v-btn>
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
import Template from "@/Template";

export default Vue.extend({
  name: "App",

  data: () => ({
    company: {
      hrName: "",
      title: "",
      city: "",
      street: "",
      position: "",
      isBigCity: false,
    },
    companyOptionsSelect: ["isBigCity"],

    selectedToken: null,
    template: "aaaaa" as string | null,
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
  },

  methods: {
    save() {
      console.log(this.template);
      this.template += " bbbbbbb";
    },
  },

  created() {
    this.company.hrName = this.$t("company.defaultHrName") as string;
    this.company.position = this.$t("company.defaultPosition") as string;
    const template = new Template();
    this.template = template.load();
  },
});
</script>
