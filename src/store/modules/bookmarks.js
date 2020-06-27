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
  getBookmarksByCategory ({commit}, category) {
    apiService.fetchBookmarksByCategory(category).then(bookmarks => {
      commit('setBookmarksByCategory', bookmarks)
    })
  },
  saveBookmark ({commit}, bookmark) {
    if (bookmark.id) {
      apiService.updateBookmark(bookmark)
      .then(() => {
        commit('EDIT_BOOKMARK', bookmark)
      })
    } else {
      apiService.postBookmark(bookmark)
      .then((bookmark) => {
        commit('ADD_BOOKMARK', bookmark)
    })
    }
  },
  saveCategory ({commit}, category) {
    if (category.id) {
      apiService.updateCategory(category)
      .then(()=> {
        commit("EDIT_CATEGORY")
      })
    } else {
      apiService.postCategory(category)
      .then((category)=> {
        commit("ADD_CATEGORY", category)
      })
    }
  },
  deleteCategory ({commit}, category) {
    apiService.deleteCategory(category)
    .then(()=> {
      commit('DELETE_CATEGORY', category)
    })
  },
  deleteBookmark ({commit}, bookmark) {
    apiService.deleteBookmark(bookmark)
    .then(response => {
      commit('deleteBookmark', bookmark)
    })
  },
  toggleArchiveBookmark ({commit}, bookmark) {
    apiService.updateBookmark(bookmark)
    .then(() => {
      commit('TOGGLE_ARCHIVE_BOOKMARK', bookmark)
    })
  },
  getBookmarkInfo ({commit}, bookmark) {
    apiService.getBookmarkInfo(bookmark)
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
  ADD_BOOKMARK (state, bookmark) {
    if (state.activeCategory && state.activeCategory.id == bookmark.category) state.bookmarks.unshift(bookmark)
  },
  EDIT_BOOKMARK(state, payload) {
    const bookmarkIndex = state.bookmarks.findIndex(bookmark => bookmark.id == payload.id)
    if (bookmarkIndex > -1) {
      const bookmark = state.bookmarks[bookmarkIndex]
      bookmark.title = payload.title
      bookmark.category = payload.category
      bookmark.url = payload.url
      bookmark.description = payload.description
      bookmark.safe = payload.safe
      bookmark.archived = payload.archived
      bookmark.favorited = payload.favorited
      bookmark.last_update = payload.last_update
      bookmark.bookmarked_at = payload.bookmarked_at
      state.bookmarks[bookmarkIndex] = bookmark
    }
  },
  DELETE_CATEGORY (state, category) {
    state.categories = state.categories.filter(catg => catg.slug !== category.slug)
  },
  deleteBookmark (state, payload) {
    state.bookmarks = state.bookmarks.filter(
      bookmark => !(bookmark.id === payload.id)
    )
  },
  TOGGLE_ARCHIVE_BOOKMARK( state, bookmark) {
    for(let item of state.bookmarks) {
      if (item.id == bookmark.id) {
        item.archived = bookmark.archived
        break
      }
    }
  },
  CHANGE_ACTIVE_CATEGORY(state, payload) {
    state.activeCategory = payload
  },
  EDIT_CATEGORY(state, category) {
    // think how you can edit parent of category
    // and move it to correspond place
  },
  ADD_CATEGORY(state, category) {
    function addCategory(catgs) {
      for(const catg of catgs) {
        if (category.parent === catg.id ) {
          catg.children.unshift(category)
          return
        } else {
          addCategory(catg.children)
        }
      }
    }
    if (category.parent) addCategory(state.categories)
    else state.categories.unshift(category)
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
