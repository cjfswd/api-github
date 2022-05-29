import { createApp } from 'vue'
// @ts-ignore
import VueHighlightJS from 'vue3-highlightjs'
import 'highlight.js/styles/androidstudio.css'

// @ts-ignore
import Markdown from 'vue3-markdown-it';

import App from './App.vue'

createApp(App).use(Markdown).use(VueHighlightJS).mount('#app')
