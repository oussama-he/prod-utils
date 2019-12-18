<template>
  <div id="app" class="content-expand">
    <AppHeader></AppHeader>
    <div class="main">
      <category-list @category-selected="selectCategoryHandler" :categories="categories"></category-list>
      <div class="bookmarks-area">
        <collapse v-if="activeCategory" :title="activeCategory.label">
          <template v-slot:collapse-body>
            {{activeCategory.description ? activeCategory.description : "No description provided"}}
          </template>
        </collapse>
        <bookmark-list
          :bookmarks="bookmarks"
          @delete-clicked="deleteBookmarkHandler"
          @archive-clicked="archiveBookmarkHandler"
          @info-clicked="getBookmarkInfoHandler"
          @edit-clicked="editBookmarkHandler"
        ></bookmark-list>
      </div>
    </div>
    <modal-root></modal-root>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Bus } from "@/utils/Bus";
import ModalRoot from "@/components/common/ModalRoot";
import AppHeader from "./components/bookmarks/AppHeader";
import BookmarkInfo from "@/components/bookmarks/BookmarkInfo";
import BookmarkList from "./components/bookmarks/BookmarkList";
import CategoryList from "./components/bookmarks/CategoryList";
import Modal from "./components/common/Modal";
import Cookies from "js-cookie";
import EditBookmarkForm from "./components/bookmarks/EditBookmarkForm";
import Collapse from "./components/common/Collapse"

export default {
  components: {
    AppHeader,
    BookmarkList,
    CategoryList,
    Modal,
    ModalRoot,
    Collapse
  },
  computed: {
    ...mapGetters({
      categories: "bookmarks/categories",
      bookmarks: "bookmarks/bookmarks",
      activeCategory: "bookmarks/activeCategory"
    })
  },
  methods: {
    getBookmarkInfoHandler(bookmark) {
      Bus.$emit("open-modal", {
        component: BookmarkInfo,
        title: "Bookmark Info",
        props: { bookmarkInfo: bookmark }
      });
    },
    editBookmarkHandler(bookmark) {
      Bus.$emit("open-modal", {
        component: EditBookmarkForm,
        title: "Edit Bookmark",
        props: {
          pk: bookmark.id,
          title: bookmark.title,
          url: bookmark.url,
          categoryID: this.activeCategory.id,
          safe: bookmark.safe,
          description: bookmark.description,
          archived: bookmark.archived,
          favorited: bookmark.favorited
        }
      });
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

.collapse-wrapper {
  margin: 20px
}
</style>
