<template>
  <a :key="post.id" class="panel-block">
    <a>{{ post.title }}</a>
    <div>{{ post.created.format("Do MMM") }}</div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Post } from "../mocks";
export default defineComponent({
  name: "TimelinePost",

  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
});
</script>
