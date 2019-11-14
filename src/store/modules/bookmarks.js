import axios from "axios";
import apiService from '../../services/bookmarksService'

const state = {
  bookmarks: [],
  categories: {},
  activeCategory: {},
  bookmarkInfo: {}
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
  saveBookmark ({commit}, payload) {
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
  archiveBookmark ({commit}, payload) {
    apiService.archiveBookmark(payload)
    .then(response => {
      commit('archiveBookmark', payload)
    })
  },
  getBookmarkInfo ({commit}, payload) {
    apiService.getBookmarkInfo(payload)
    .then(response => {
      commit('setBookmarkInfo', response)
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
  setBookmarkInfo (state, payload) {
    state.bookmarkInfo = payload
  },
  addBookmark (state, payload) {
    return
  },
  deleteBookmark (state, payload) {
    state.bookmarks = state.bookmarks.filter(
      bookmark => !(bookmark.id === payload)
    )
  },
  archiveBookmark( state, payload) {
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
  },
  bookmarkInfo (state) {
    return state.bookmarkInfo
  }
}
export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
};
