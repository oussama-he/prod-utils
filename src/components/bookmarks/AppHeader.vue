<template>
  <div class="navbar">
    <div class="search">
      <input type="text" class="input-search" placeholder="search" />
    </div>
    <div class="actions">
      <div v-if="activeCategory" style="display:inline">
        <a href="#" @click="getCategoryInfoHandler"><i class="fas fa-info-circle"></i></a>
        <a href="#" @click="editCategoryHandler"><i class="fa fa-pencil-alt"></i></a>
        <a href="#" @click="deleteCategoryHandler"><i class="fa fa-trash-alt"></i></a>
      </div>
      <dropdown>
        <template v-slot:dropdown-links>
          <a href="#" class="dropdown-item" @click="createBookmarkHandler">
            <i class="fa fa-bookmark"></i> Bookmark
          </a>
          <a href="#" class="dropdown-item" @click="createCategoryHandler">
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
        props: {}
      })
    },
    editCategoryHandler() {
      Bus.$emit("open-modal", {
        component: EditCategoryForm,
        title: "Edit Category",
        props: {
          id: this.activeCategory.id,
          label: this.activeCategory.label,
          slug: this.activeCategory.slug,
          parent: this.activeCategory.parent,
          description: this.activeCategory.description
        }
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
</style>
