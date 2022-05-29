<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-col gap-2">
      <h1 id="title" class="leading-tight text-4xl">Github</h1>
      <div style="display: flex; flex-direction: row; align-items: center; gap: 0.25em">
        <div>@ <input type="text" v-model="user" class="rounded px-1"/></div>
        <button @click="updateData()">get</button>
      </div>
      <a href="#repositories" class="bg-neutral-800 w-min whitespace-nowrap px-1 text-sm pb-1 rounded">go to repositories</a>
    </div>
    <h1 id="gists" class="text-3xl">gists</h1>
    <div
      v-if="repos"
      v-for="(item, key, index) in repos"
      :key="index + 'repos'"
      class="flex flex-col gap-2 leading-tight"
    >
      <h2 class="text-xl">{{ item.name }}</h2>
      <div>{{ item.description }}</div>
      <a
        :href="item.html_url"
        target="_blank"
        class="text-sm rounded bg-neutral-800 px-1 pb-1 text-sm w-min whitespace-nowrap"
        >see in github</a
      >
      <hr class="border-neutral-800" />
    </div>
    <h1 id="repositories" class="text-3xl">repositories</h1>
    <a href="#title" class="bg-neutral-800 w-min whitespace-nowrap px-1 text-sm pb-1 rounded">return to top</a>
    <div v-if="gists" v-for="(item, key, index) in gists" :key="index + 'gists'">
      <div v-for="(value, name) in item" :key="name + 'gistsitem'">
        <h2 class="text-xl mb-[0.25em]">{{ name }}</h2>
        <Highlight
          :highlight="{
            url: value.raw_url,
            language: String(value.language).toLowerCase(),
            size: String(value.size / 1000),
          }"
        ></Highlight>
        <hr class="border-neutral-800" />
      </div>
    </div>
    <a href="#title" class="bg-neutral-800 rounded text-center pb-1 text-sm"
      >return to top</a
    >
    <div style="margin-top: 1em">
      developed by
      <a href="https://github.com/cjfswd" target="_blank" style="font-weight: 600"
        >@cjfswd</a
      >
    </div>
  </div>
</template>
<script async setup lang="ts">
import { ref } from "vue";
import Highlight from "../components/highlight.vue";
import * as composable from "../composables/data";

const getGists = async (user: string) => {
  return await composable
    .useData(`https://api.github.com/users/${user}/gists`)
    .then((res) => res.onlyFiles)
    .catch((err) => console.log(err));
};

const getRepos = async (user: string) => {
  return await fetch(`https://api.github.com/users/${user}/repos`)
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error("Status code error :" + res.status);
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};

let user = ref("cjfswd");
let gists = ref(await getGists(user.value));
let repos = ref(await getRepos(user.value));

const updateData = async () => {
  gists.value = await getGists(user.value);
  repos.value = await getRepos(user.value);
};
</script>
<style>
div.size {
  width: 100%;
  text-align: end;
}
</style>
