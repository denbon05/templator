<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="4" xxl="3"
          ><aside>
            <v-card class="mx-auto" max-width="344" outlined>
              <v-list-item>
                <v-list-item-title>{{ company.title }}</v-list-item-title>
              </v-list-item>
              <v-list-item :key="key" v-for="{ key, type } in textFields">
                <v-text-field
                  :label="$t(`company.${key}`)"
                  outlined
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

              <v-card-actions>
                <v-btn @click="saveCompanyData" outlined rounded text>
                  Button
                </v-btn>
              </v-card-actions>
            </v-card>
          </aside></v-col
        >
        <v-col cols="12" md="8" xxl="7"
          ><v-main>{{ $t("message") }}</v-main></v-col
        >
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { omit } from "lodash";

export default Vue.extend({
  name: "App",

  data: () => ({
    company: {
      hrName: "",
      title: "",
      city: "",
      street: "",
      isBigCity: false,
    },
  }),

  computed: {
    textFields() {
      return Object.entries(omit(this.company, "isBigCity")).map(([key]) => ({
        key,
        type: "text",
      }));
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
    saveCompanyData() {
      console.log({ company: this.company });
    },
  },

  created() {
    this.company.hrName = this.$t("company.defaultHrName") as string;
  },
});
</script>
