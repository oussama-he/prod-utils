<template>
  <div id="app" class="content-expand">
    <AppHeader></AppHeader>
    <div class="main">
      <category-list @category-selected="selectCategoryHandler" :categories="categories"></category-list>
      <main>
        <router-view></router-view>
      </main>
    </div>
    <toast v-if="toast.visible" :msg="toast.message"></toast>
    <modal-root></modal-root>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModalRoot from "@/components/common/ModalRoot";
import AppHeader from "./components/bookmarks/AppHeader";
import CategoryList from "./components/bookmarks/CategoryList";
import Toast from "@/components/common/Toast"
import Cookies from "js-cookie";

export default {
  components: {
    AppHeader,
    CategoryList,
    ModalRoot,
    Toast,
  },
  computed: {
    ...mapGetters({
      categories: "bookmarks/categories",
      toast: "bookmarks/toast",
    }),
  },
  methods: {
    ...mapActions({
      getCategories: "bookmarks/getCategories",
      changeActiveCategory: "bookmarks/changeActiveCategory"
      
    }),
    selectCategoryHandler(category) {
      this.$router.push(`/${category.slug}`)
      this.changeActiveCategory(category);
    }
  },
  created() {
    this.getCategories()
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
main {
  overflow-y: scroll;
  border-radius: 25px;
  background: white;
  width: 75%;
  padding: 2em
}

.collapse-wrapper {
  margin-bottom: 20px;
}
</style>
