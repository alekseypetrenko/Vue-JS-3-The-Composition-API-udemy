import {reactive, readonly} from 'vue';
import axios from 'axios';
import { Post} from './mocks'

interface State {
  posts: PostState
}

interface PostState {
  // o(n)
  ids: string[]             // [1,2,3,4,5]
  // o(1)
  all: Map<string, Post>  // {1 => {}} 
  loaded: boolean
}

class Store {
  private state: State

  constructor(initial: State) {
    this.state = reactive(initial)
  }

  getState(){
    return readonly(this.state);
  }

  async fetchPosts() {
    const response = await axios.get<Post[]>('/posts');
    const postsState: PostState = {
      ids: [],
      all: new Map,
      loaded: true
    }

    for (const post of response.data){
      postsState.ids.push(post.id);
      postsState.all.set(post.id, post);
    }

    this.state.posts = postsState;
  }
}

const all = new Map<string, Post>();

const store = new Store({
  posts: {
    ids: [],
    all,
    loaded: false
  }
})

export function useStore(){
  return store;
}