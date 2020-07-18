<template>
  <div class="navbar">
    <div class="search">
      <form action="">
        <input type="text" class="input-search" placeholder="search" />
      </form>
    </div>
    <div class="actions">
      <div v-if="activeCategory" class="category-actions">
        <a href="#" @click="getCategoryInfoHandler" title="Info about category"><i class="fas fa-info-circle"></i></a>
        <a href="#" @click="editCategoryHandler" title="Edit category"><i class="fa fa-pencil-alt"></i></a>
        <a href="#" @click="deleteCategoryHandler" title="Delete category"><i class="fa fa-trash-alt"></i></a>
      </div>
      <dropdown title="New ...">
        <template v-slot:dropdown-links>
          <a href="#" class="dropdown-item" @click="createBookmarkHandler" title="New bookmark">
            <i class="fa fa-bookmark"></i> Bookmark
          </a>
          <a href="#" class="dropdown-item" @click="createCategoryHandler" title="New category">
            <i class="fa fa-folder"></i> Category
          </a>
        </template>
      </dropdown>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex"
import Dropdown from "../common/dropdown";
import EditBookmarkForm from "./EditBookmarkForm";
import EditCategoryForm from "./EditCategoryForm"
import CategoryInfo from "./CategoryInfo"
import { Bus } from "@/utils/Bus";
export default {
  name: "AppHeader",
  components: {
    Dropdown,
  },
  computed: {
    ...mapGetters({
      activeCategory: "bookmarks/activeCategory",
      bookmarks: "bookmarks/bookmarks",
    })
  },
  methods: {
    ...mapActions({
      deleteCategory: 'bookmarks/deleteCategory',
    }),
    createBookmarkHandler() {
      Bus.$emit("open-modal", {
        component: EditBookmarkForm,
        title: "Add Bookmark",
        props: {}
      })
    },
    createCategoryHandler() {
      Bus.$emit("open-modal", {
        component: EditCategoryForm,
        title: "Create Category",
        props: { category: {} }
      })
    },
    editCategoryHandler() {
      const category = JSON.parse(JSON.stringify(this.activeCategory))
      Bus.$emit("open-modal", {
        component: EditCategoryForm,
        title: "Edit Category",
        props: {category}
      })
    },
    deleteCategoryHandler(){
      const answer = confirm(`Want you to delete this ${this.activeCategory.label} category?`)
      if (answer) this.deleteCategory(this.activeCategory)
    },
    getCategoryInfoHandler() {
      Bus.$emit("open-modal", {
        component: CategoryInfo,
        title: "About Category",
        props: { category: this.activeCategory, bookmarkCount: this.bookmarks.length }
      })
    },
  }
};
</script>

<style>
.navbar {
  display: flex;
  flex-direction: row;
  height: 10%;
}

.search {
  width: 25%;
  padding: 10px;
}

.input-search {
  border-radius: 15px;
  background: #eaecef;
  border: 0px;
  padding: 10px;
  width: 100%;
  /* font-weight: 500; */
  font-size: 16px;
}
.actions {
  padding: 10px;
  margin-left: auto;
  margin-right: 10px;
  vertical-align: middle;
}

.actions a {
  padding: 5px;
}

.category-actions {
  display: inline;
  margin-right: 1.2em;
}
</style>
