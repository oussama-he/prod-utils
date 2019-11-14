<template>
  <div id="app" class="content-expand">
    <AppHeader></AppHeader>
    <div class="main">
      <category-list @category-selected="selectCategoryHandler" :categories="categories"></category-list>
      <div class="bookmarks-area">
        <bookmark-list
          :bookmarks="bookmarks"
          @delete-clicked="deleteBookmarkHandler"
          @archive-clicked="archiveBookmarkHandler"
          @info-clicked="getBookmarkInfoHandler"
        ></bookmark-list>
      </div>
      <bookmark-info-modal v-show="modalIsOpen=='bookmark-info-modal'"></bookmark-info-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Bus } from "@/utils/Bus";
import AppHeader from "./components/bookmarks/AppHeader";
import BookmarkInfoModal from "./components/bookmarks/BookmarkInfoModal"
import BookmarkList from "./components/bookmarks/BookmarkList";
import CategoryList from "./components/bookmarks/CategoryList";
import Modal from "./components/common/modal";
import Cookies from "js-cookie";

export default {
  components: {
    AppHeader,
    BookmarkList,
    CategoryList,
    Modal,
    BookmarkInfoModal
  },
  data() {
    return {
      modalIsOpen: false,
      alert: false,
    };
  },
  computed: {
    ...mapGetters({
      categories: "bookmarks/categories",
      bookmarks: "bookmarks/bookmarks"
    })
  },
  methods: {
    getBookmarkInfoHandler(bookmark) {
      this.modalIsOpen = "bookmark-info-modal";
      Bus.$emit("open", bookmark);
    },
    deleteBookmarkHandler(bookmark) {
      let answer = confirm(
        `Want you to delete this bookmark: \n ${bookmark.title}`
      );
      if (!answer) {
        return;
      }
      this.$store.dispatch("bookmarks/deleteBookmark", bookmark.id);
    },
    archiveBookmarkHandler(bookmark) {
      let answer = confirm(
        `Want you to archive this bookmark: \n ${bookmark.title}`
      );
      if (!answer) {
        return;
      }
      this.$store.dispatch("bookmarks/archiveBookmark", bookmark.id);
    },
    selectCategoryHandler(catg) {
      this.$store.dispatch("bookmarks/getBookmarksByCategory", catg.label);
      this.$store.dispatch("bookmarks/changeActiveCategory", catg);
    }
  },
  created() {
    Bus.$on("close-modal", ()=>this.modalIsOpen=false)
    this.$store.dispatch("bookmarks/getCategories");
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
