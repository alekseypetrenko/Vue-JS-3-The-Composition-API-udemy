<template>
  <Suspense>
    <template #default>
      <TimeLine />
    </template>
    <template #fallback> <Spinner /></template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TimeLine from './TimeLine.vue';
import Spinner from './Spinner.vue';

export default defineComponent({
  name: 'App',
  components: {
    TimeLine,
    Spinner,
  },
});
</script>
