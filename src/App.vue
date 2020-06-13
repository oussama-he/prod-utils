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
          :bookmarks="activeBookmarks"
          @delete-clicked="deleteBookmarkHandler"
          @archive-clicked="toggleArchiveBookmarkHandler"
          @info-clicked="getBookmarkInfoHandler"
          @edit-clicked="editBookmarkHandler"
        ></bookmark-list>
        <collapse v-if="archivedBookmarks.length" title="Archive" style="margin-top: 20px">
          <template v-slot:collapse-body>
            <bookmark-list
              :bookmarks="archivedBookmarks"
              @delete-clicked="deleteBookmarkHandler"
              @archive-clicked="toggleArchiveBookmarkHandler"
              @info-clicked="getBookmarkInfoHandler"
              @edit-clicked="editBookmarkHandler"
              style="padding-top: 20px"
            ></bookmark-list>
          </template>
        </collapse>
      </div>
    </div>
    <modal-root></modal-root>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
    }),
    activeBookmarks() {
      return this.bookmarks.filter(bookmark => bookmark.archived == false)
    },
    archivedBookmarks() {
      return this.bookmarks.filter(bookmark => bookmark.archived == true)
    }
  },
  methods: {
    ...mapActions({
      getCategories: "bookmarks/getCategories",
      toggleArchiveBookmark: "bookmarks/toggleArchiveBookmark",
      getBookmarksByCategory: "bookmarks/getBookmarksByCategory",
      changeActiveCategory: "bookmarks/changeActiveCategory"
      
    }),
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
          favorited: bookmark.favorited,
          bookmarked_at: bookmark.bookmarked_at,
          last_update: bookmark.last_update,
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
    toggleArchiveBookmarkHandler(bookmark) {
      let answer = confirm(
        `Want you to ${bookmark.archived ? 'restore' : 'archive'} this bookmark: \n ${bookmark.title}`
      );
      if (!answer) {
        return;
      }
      // toggle the archived status in front-end
      bookmark.archived = !bookmark.archived
      bookmark.category = this.activeCategory.id
      this.toggleArchiveBookmark(bookmark);
    },
    selectCategoryHandler(category) {
      this.getBookmarksByCategory(category.label);
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
.bookmarks-area {
  /* height: 500px; */
  /* flex: none; */
  overflow-y: scroll;
  border-radius: 25px;
  background: white;
}
.bookmarks-area {
  width: 75%;
  padding: 20px
}

.collapse-wrapper {
  margin-bottom: 20px;
}
</style>
