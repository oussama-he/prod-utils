<template>
  <div id="app" class="content-expand">
    <modal title="New Bookmark" v-show="modalOpened" @close="modalOpened=false">
        <form action="/bookmarks/api/" method="post" @submit.prevent="createBookmark">
          <div>
            <label>URL</label>
            <input name="url" type="url" v-model="url" @change="onChangeUrl" class="form-control">
          </div>
          <div>
            <label for>Title</label>
            <input type="text" name="title" id="title" v-model="title" class="form-control">
          </div>
          <div>
            <label for="category">Category</label>
            <treeselect v-model='categoryID' :options='categories' />
          </div>
          <div>
            <label for>Description</label>
            <textarea name="description" id="description" rows="1" v-model='description' class="form-control"></textarea>
          </div>
          <div class="form-check">
            <input name="safe" class="form-check-input" type="checkbox">
            <label class="form-check-label">Safe?</label>
          </div>
          <input type="submit" value="add">
        </form>
      </modal>
    
          <modal title="New Category" v-show="categoryModalOpened" @close="categoryModalOpened=false">
        <form action>
          <div>
            <label>Category name</label>
            <input name="name" type="text" v-model="url" class="form-control">
          </div>
        </form>
      </modal>
      <navbar>
      <dropdown>
        <template v-slot:dropdown-links>
          <a href="#" class="dropdown-item" @click="openModal">
            <i class="fa fa-bookmark"></i> Bookmark
          </a>
          <a href="#" class="dropdown-item" @click="categoryModalOpened=true">
            <i class="fa fa-folder"></i> Category
          </a>
        </template>
      </dropdown>
    </navbar>
    <div class="main">
      <category-list @category-selected="selectCategoryHandler" :categories='categories'></category-list>
      <div class="bookmarks-area">
        <bookmark-list :bookmarks="bookmarks" @delete-clicked="deleteBookmarkHandler"></bookmark-list>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/bookmarks/Navbar";
import BookmarkList from "./components/bookmarks/BookmarkList";
import CategoryList from "./components/bookmarks/CategoryList";
import Dropdown from "./components/common/dropdown";
import Modal from "./components/common/modal";
import Cookies from "js-cookie";
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import {flatCategories} from "./utils/utils.js"

export default {
  components: {
    Treeselect,
    Navbar,
    BookmarkList,
    CategoryList,
    Dropdown,
    Modal
  },
  data() {
    return {
      title: "",
      url: "",
      categoryID: "",
      description: "",
      modalOpened: true,
      categoryModalOpened: false,
    };
  },
  computed: {
    categories () {
      return this.$store.getters['bookmarks/categories']
    },
    flattedCategories () {
      let catgs = this.$store.getters['bookmarks/categories']
      return this.flatCategories(catgs)
    },
    bookmarks () {
      return this.$store.getters['bookmarks/bookmarks']
    }
  },
  methods: {
    flatCategories,
    onChangeUrl() {
      this.axios
        .get("/api/bookmarks/get-page-title/" + this.url)
        .then(response => {
          let pageTitle = response.data.title;
          this.title = pageTitle;
        })
        .catch(error => {
          console.log("error when getting page title", error);
        })
        
      this.axios
      .get(`/api/bookmarks/check-url-existence/${this.url}`)
      .then(response => {
        let existence = response.data.url_existence
        if (existence) {
          alert('URL already exists')
        }
      })
    },
    deleteBookmarkHandler (bookmark) {
      let answer = confirm(
        `Want you to delete this bookmark: \n ${bookmark.title}`
      );
      if (!answer) {
        return
        }
      this.$store.dispatch('bookmarks/deleteBookmark', bookmark.id)
    },
    createBookmark() {
      let data = {
        title: this.title,
        url: this.url,
        category: this.categoryID,
        description: this.description
      }
      this.$store.dispatch('bookmarks/addBookmark', data)
      this.clearFields()
    },
    openModal() {
      this.modalOpened = true;
    },
    clearFields() {
      (this.url = ""), (this.title = ""), (this.description = "");
    },
    selectCategoryHandler(catg) {
      this.$store.dispatch('bookmarks/getBookmarksByCategory', catg.label)
      this.$store.dispatch('bookmarks/changeActiveCategory', catg)
    },
    selectCategory(event) {
      this.categoryID = event.target.value;
    }
  },
  created () {
    this.$store.dispatch('bookmarks/getCategories')
  }
};
</script>

<style>
a {
  color: #495057;
}
.content-expand {
  display: block;
  height: 100vh;
  padding: 10px 10px 0;
  background: #f8f9fa;
}
.main {
  display: flex;
  height: 80%;
  margin-left: -10px;
}
.bookmarks-area {
  /* height: 500px; */
  /* flex: none; */
  overflow-y: scroll;
  border-radius: 25px;
  background: white;
}
.bookmarks-area {
  width: 75%;
}
</style>
