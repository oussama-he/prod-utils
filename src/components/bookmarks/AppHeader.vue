<template>
  <div class="navbar">
    <div class="search">
      <input type="text" class="input-search" placeholder="search" />
    </div>
    <div class="actions">
      <dropdown>
        <template v-slot:dropdown-links>
          <a href="#" class="dropdown-item" @click="createBookmarkHandler">
            <i class="fa fa-bookmark"></i> Bookmark
          </a>
          <a href="#" class="dropdown-item" @click="modalIsOpen='new-category-modal'">
            <i class="fa fa-folder"></i> Category
          </a>
        </template>
      </dropdown>
    </div>
  </div>
</template>


<script>
import Dropdown from "../common/dropdown";
import EditBookmarkForm from "./EditBookmarkForm";
import { Bus } from "@/utils/Bus";
export default {
  name: "AppHeader",
  components: {
    Dropdown,
  },
  methods: {
    createBookmarkHandler() {
      Bus.$emit("open-modal", {
        component: EditBookmarkForm,
        title: "Add Bookmark",
        props: {}
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
