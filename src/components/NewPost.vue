<template>
  <post-writer :post="newPost" />
</template>

<script lang="ts">
import { Post } from "@/mocks";
import moment from "moment";
import { defineComponent } from "vue";
import PostWriter from "./PostWriter.vue";

export default defineComponent({
  components: {
    PostWriter,
  },
  setup() {
    const newPost: Post = {
      id: "-1",
      title: "New post title",
      created: moment(),
    };

    return { newPost };
  },
});
</script>
