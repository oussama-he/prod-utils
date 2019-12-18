import axios from "axios";
import apiService from '../../services/bookmarksService'

const state = {
  bookmarks: [],
  categories: {},
  activeCategory: null,
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
    if (payload.pk) {
      apiService.updateBookmark(payload)
      .then(() => {
        commit('editBookmark', payload)
      })
    } else {
      apiService.postBookmark(payload)
      .then(response => {
      // commit('addBookmark', payload)
    })
    }
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
    commit("CHANGE_ACTIVE_CATEGORY", payload);
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
  editBookmark(state, payload) {
    const bookmarkIndex = state.bookmarks.findIndex(bookmark => bookmark.id == payload.pk)
    if (bookmarkIndex > -1) {
      const bookmark = state.bookmarks[bookmarkIndex]
      bookmark.title = payload.title
      bookmark.category = payload.category
      bookmark.url = payload.url
      bookmark.description = payload.description
      bookmark.safe = payload.safe
      bookmark.archived = payload.archived
      bookmark.favorited = payload.favorited
      state.bookmarks[bookmarkIndex] = bookmark
    }
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
  CHANGE_ACTIVE_CATEGORY(state, payload) {
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
  },
  activeCategory (state) {
    return state.activeCategory
  }
}
export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
};
