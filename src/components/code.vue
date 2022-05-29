<template>
  <pre
    v-if="language.toLocaleLowerCase() != 'markdown'"
    v-highlightjs="text"
  ><code :class="language.toLowerCase()"></code></pre>
  <div class="markdown" v-else>
    <Markdown :source="text" :html="true" :breaks="true" />
  </div>
  <div
    style="
      display: flex;
      flex-direction: row;
      justify-items: space-between;
      margin-top: 0.25em;
    "
  >
    <button @click="copy()">copy | {{ size }}mb</button>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import Markdown from "vue3-markdown-it";

const properties = defineProps<{ url: string; language: string; size: string }>();

const text = await fetch(properties.url).then((res) => res.text());

const copy = () => {
  navigator.clipboard.writeText(text);
};
</script>

<style>
div.markdown {
  color: #a9b7c6;
  background: #282b2e;
  border-radius: 0.25em;
  padding: 0.5em;
}
</style>
