<template>
  <div style="display: flex; flex-direction: column">
    <label>Github</label>
    <div>
       @ <input type="text" v-model="user" />
    </div>
  </div>
  <div
    v-if="data.length > 0"
    v-for="(item, key, index) in data"
    :key="index + 'container'"
    style="margin-top:1em"
  >
    <div v-for="(value, name) in item" :key="name + 'item'">
      <h2>{{ name }}</h2>
      <Code :url="value.raw_url" :language="value.language" :size="String(value.size / 1000)"></Code>
    </div>
  </div>
  <div style="margin-top:1em">
  developed by <a href="https://github.com/cjfswd" target="_blank" style="font-weight: bold;">@cjfswd</a>
  </div>
</template>
<script async setup lang="ts">
import { ref, watchEffect } from "vue";
import Code from "../components/code.vue";
import * as composable from "../composables/data";

let user = ref("cjfswd");
let data = ref<{ [key: string]: { [key: string]: string & number } }[]>([]);

const getData = async (user: string) => {
  data.value = (await composable
    .useData(`https://api.github.com/users/${user}/gists`)
    .then((res) => res.onlyFiles)
    .catch((err) => console.log(err))) as {
    [key: string]: { [key: string]: string & number };
  }[];
};

watchEffect(() => getData(user.value));
</script>
<style>
div.size {
  width: 100%;
  text-align: end;
}
</style>
