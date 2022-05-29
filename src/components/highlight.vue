<template>
  <div v-if="highlight">
    <pre
      v-if="highlight.language != 'markdown'"
      style="display: flex; flex-direction: column; width: 100%; height: fit-content"
    >
<code :class="highlight.language.toLowerCase()" style="padding:0.5em 1em;">{{text}}</code>
</pre>
    <div class="markdown" v-else>
      <Markdown :source="text" :html="true" :breaks="true" />
    </div>
    <div
      style="
        display: flex;
        flex-direction: row;
        justify-items: space-between;
        margin-top: 0.25em;
        margin-bottom: 1em;
      "
    >
      <button @click="copy()">copy | {{ highlight.size }}mb</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

// //@ts-ignore
import Markdown from "vue3-markdown-it";

const properties = defineProps<{
  highlight: { url: string; language: string; size: string };
}>();

const text = await fetch(properties.highlight.url).then((res) => res.text());

const copy = () => {
  navigator.clipboard.writeText(text);
};

onMounted(() => {
  //@ts-ignore
  hljs.highlightAll();
});
</script>

<style>
div.markdown {
  color: #a9b7c6;
  background: #282b2e;
  border-radius: 0.25em;
  padding:0.5em 0.8em;
}
</style>
