import axios from "axios";
import apiService from '../../services/bookmarksService'

const state = {
  bookmarks: [],
  categories: {},
  activeCategory: {},
}

const actions = {
  getCategories ({commit}) {
    apiService.fetchCategories().then(categories => {
      commit('setCategories', categories)
    })
  },
  getBookmarksByCategory ({commit}, payload) {
    apiService.fetchBookmarksByCategory(payload).then(bookmarks => {
      commit('setBookmarksByCategory', bookmarks)
    })
  },
  addBookmark ({commit}, payload) {
    apiService.postBookmark(payload)
    .then(response => {
      // commit('addBookmark', payload)
    })
  },
  deleteBookmark ({commit}, payload) {
    apiService.deleteBookmark(payload)
    .then(response => {
      commit('deleteBookmark', payload)
    })
  },
  changeActiveCategory({commit}, payload) {
    commit("changeActiveCategory", payload);
  }
}

const mutations = {
  setCategories (state, payload) {
    state.categories = payload
  },
  setBookmarksByCategory (state, payload) {
    state.bookmarks = payload
  },
  addBookmark (state, payload) {
    return
  },
  deleteBookmark (state, payload) {
    state.bookmarks = state.bookmarks.filter(
      bookmark => !(bookmark.id === payload)
    )
  },
  changeActiveCategory(state, payload) {
    state.activeCategory = payload
  }
}

const getters = {
  categories (state) {
    return state.categories
  },
  bookmarks (state) {
    return state.bookmarks
  }
}
export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
};
