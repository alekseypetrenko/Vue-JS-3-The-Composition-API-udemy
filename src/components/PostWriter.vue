<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New Post</div>
        <input v-model="title" type="text" class="input" />
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <div
        contentEditable="true"
        ref="contentEditable"
        @input="handleInput"
      ></div>
    </div>
    <div class="column">
      <div v-html="html"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Post } from "@/mocks";
import { defineComponent, onMounted, ref, watch, watchEffect } from "vue";
import { parse } from "marked";
import highlight from "highlight.js";

export default defineComponent({
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup(props) {
    const title = ref(props.post.title);
    const content = ref("## Title\nEnter your post content...");
    const html = ref("");
    const contentEditable = ref<HTMLDivElement | null>(null);

    watchEffect(() => {
      html.value = parse(content.value, {
        gfm: true,
        breaks: true,
        highlight: (code) => {
          return highlight.highlightAuto(code).value;
        },
      });
    });

    const handleInput = () => {
      if (!contentEditable.value) {
        throw Error("This should never happen");
      }
      content.value = contentEditable.value.innerText || "";
    };

    onMounted(() => {
      if (!contentEditable.value) {
        throw Error("This should never happen");
      }
      contentEditable.value.textContent = content.value;
    });

    return {
      html,
      contentEditable,
      title,
      content,
      handleInput,
    };
  },
});
</script>

<style>
.column {
  overflow-y: scroll;
}
</style>
