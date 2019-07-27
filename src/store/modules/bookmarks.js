import axios from "axios";


export default {
  state: {
    bookmarks: {},
    activeCategory: {},
    selectedCategory: {}
  },
  mutations: {
    changeActiveCategory(state, payload) {
      this.state.activeCategory = payload.category;
    },
    changeSelectedCategory(state, payload) {
      this.state.selectedCategory = payload.category;
    }
  },
  actions: {
    changeCategory(state, category) {
      state.commit("changeActiveCategory", category);
    },
    changeSelectedCategory(state, category) {
      state.commit('changeSelectedCategory', category)
    },
    loadBookmarks(state, category) {
      axios({
        method: "get",
        url: `/api/bookmarks/${category.name}/`
      })
        .then(response => {
          this.state.bookmarks = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
