<template>
  <div class="navbar">
    <div class="search">
      <input type="text" class="input-search" placeholder="search" />
    </div>
    <div class="actions">
      <a href="#" v-if="activeCategory" @click="editCategoryHandler"><i class="fa fa-pencil-alt"></i></a>
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
import { mapGetters } from "vuex"
import Dropdown from "../common/dropdown";
import EditBookmarkForm from "./EditBookmarkForm";
import EditCategoryForm from "./EditCategoryForm"
import { Bus } from "@/utils/Bus";
export default {
  name: "AppHeader",
  components: {
    Dropdown,
  },
  computed: {
    ...mapGetters({
      activeCategory: "bookmarks/activeCategory"
    })
  },
  methods: {
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
    }
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
