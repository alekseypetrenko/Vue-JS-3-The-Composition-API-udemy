import { createApp } from 'vue'
import App from './App.vue'
import { today, thisWeek, thisMonth, Post } from "./mocks";
import axios from 'axios';


function delay() {
  return new Promise((res) => {
    setTimeout(res, 2000);
  });
}

// @ts-ignore
axios.get = async (url: string) => {
  if(url === '/posts') {
    await delay();
    return Promise.resolve({
      data: [today, thisWeek, thisMonth]
    })
  }
}

createApp(App).mount('#app')