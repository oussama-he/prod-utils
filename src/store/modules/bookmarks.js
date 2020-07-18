import axios from "axios";
import apiService from '../../services/bookmarksService'
import { removeCategory, placeCategory } from "@/utils/utils"

const state = {
  bookmarks: [],
  categories: {},
  activeCategory: null,
  category: null,
  bookmarkInfo: {}
}

const actions = {
  getCategories ({commit}) {
    apiService.fetchCategories().then(categories => {
      commit('setCategories', categories)
    })
  },
  getCategory ({commit}, slug) {
    apiService.fetchCategory(slug)
    .then(category => {
      commit("CHANGE_ACTIVE_CATEGORY", category)
      commit("SET_CATEGORY", category)
    })
  },
  getBookmarksByCategory ({commit}, slug) {
    apiService.fetchBookmarksByCategory(slug).then(bookmarks => {
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
  saveCategory ({commit, dispatch}, category) {
    if (category.id) {
      apiService.updateCategory(category)
      .then(()=> {
        // update the active category state
        dispatch("changeActiveCategory", category)
        // to keep categories sorted
        dispatch("getCategories")
        commit("EDIT_CATEGORY", category)
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
      bookmark.last_update = payload.last_update
      bookmark.bookmarked_at = payload.bookmarked_at
      state.bookmarks[bookmarkIndex] = bookmark
    }
  },
  DELETE_CATEGORY (state, category) {
    function deleteCategory(catgs) {
      for(const catg of catgs) {
        const catgCount = catg.children.length
        catg.children = catg.children.filter(element => element.slug !== category.slug)
        if (catg.children.length === catgCount) deleteCategory(catg.children)
        else break
      }
    }
    const categoriesCount = state.categories.length
    state.categories = state.categories.filter(catg => catg.slug !== category.slug)
    if (categoriesCount === state.categories.length) deleteCategory(state.categories)

  },
  deleteBookmark (state, payload) {
    state.bookmarks = state.bookmarks.filter(
      bookmark => !(bookmark.id === payload.id)
    )
  },
  CHANGE_ACTIVE_CATEGORY(state, payload) {
    state.activeCategory = payload
  },
  EDIT_CATEGORY(state, category) {
    removeCategory(state.categories, category)
    // if parent null push category directly
    if (!category.parent) state.categories.push(category)
    // else find its parent in categories and push to parent's children
    else placeCategory(state.categories, category)
  },
  SET_CATEGORY(state, category) {
    state.category = category
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
  category (state) {
    return state.category
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
