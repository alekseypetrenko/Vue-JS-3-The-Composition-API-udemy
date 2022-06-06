<template>
  <nav class="panel">
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        :class="{ 'is-active': period === currentPeriod }"
        @click="setPeriod(period)"
        :data-test="period"
      >
        {{ period }}</a
      >
    </span>
    <timeline-post
      v-for="post in posts"
      :post="post"
      :key="post.id"
      class="panel-block"
    />
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import moment from "moment";
import { Post } from "../mocks";
import { useStore } from "../store";
import TimelinePost from "./TimelinePost.vue";

type Period = "Today" | "This Week" | "This Month";

export default defineComponent({
  name: "TimeLine",
  components: { TimelinePost },
  async setup() {
    const periods: Period[] = ["Today", "This Week", "This Month"];
    const currentPeriod = ref<Period>("Today");
    const setPeriod = (period: Period): void => {
      currentPeriod.value = period;
    };
    const store = useStore();

    if (!store.getState().posts.loaded) {
      await store.fetchPosts();
    }

    const allPosts: Post[] = store
      .getState()
      .posts.ids.reduce<Post[]>((acc, id) => {
        const thePost = store.getState().posts.all.get(id);
        if (!thePost) {
          throw new Error("There are no posts");
        }

        return [...acc, thePost];
      }, []);

    const posts = computed(() => {
      return allPosts.filter((post) => {
        if (currentPeriod.value === "Today") {
          return post.created.isAfter(moment().subtract(1, "day"));
        }
        if (currentPeriod.value === "This Week") {
          return post.created.isAfter(moment().subtract(1, "week"));
        }
        if (currentPeriod.value === "This Month") {
          return post.created.isAfter(moment().subtract(1, "month"));
        }
      });
    });

    return { posts, periods, currentPeriod, setPeriod };
  },
});
</script>

<style scoped></style>
