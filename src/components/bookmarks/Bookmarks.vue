<template>
  <div style="height:100%">
    <collapse v-if="category" :title="category.label">
      <template
        v-slot:collapse-body
      >{{category.description ? category.description : "No description provided"}}</template>
    </collapse>
    <bookmark-list
      v-if="bookmarks.length"
      :bookmarks="bookmarks"
      @delete-clicked="deleteBookmarkHandler"
      @info-clicked="getBookmarkInfoHandler"
      @edit-clicked="editBookmarkHandler"
    ></bookmark-list>
    <div v-else class="no-bookmarks">
      <div>
        <i class="fas fa-bookmark fa-10x"></i>
        <p class="no-bookmarks--heading">No Bookmarks</p>
        <p class="no-bookmarks--text">Try creating new ones using plus sign (<i class="fas fa-plus"></i>) at top right of the page</p>
      </div></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BookmarkList from "@/components/bookmarks/BookmarkList";
import BookmarkInfo from "@/components/bookmarks/BookmarkInfo"
import EditBookmarkForm from "@/components/bookmarks/EditBookmarkForm"
import Collapse from "@/components/common/Collapse";
import { Bus } from "@/utils/Bus"

export default {
  name: "Home",
  components: {
    BookmarkList,
    Collapse
  },
  watch: {
    $route(to, from) {
      this.getBookmarks(to.params.category);
    }
  },
  computed: {
    ...mapGetters({
      bookmarks: "bookmarks/bookmarks",
      catg: "bookmarks/category",
      activeCategory: "bookmarks/activeCategory"
    }),
    category() {
      return this.activeCategory ? this.activeCategory : this.catg;
    }
  },
  methods: {
    ...mapActions({
      getBookmarks: "bookmarks/getBookmarksByCategory",
      getCategory: "bookmarks/getCategory",
      deleteBookmark: "bookmarks/deleteBookmark"
    }),
    deleteBookmarkHandler(bookmark) {
      let answer = confirm(
        `Want you to delete this bookmark: \n ${bookmark.title}`
      );
      if (answer) this.deleteBookmark(bookmark);
    },
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
          bookmark: {...bookmark},
        }
      });
    },
  },
  mounted() {
    const categorySlug = this.$route.params.category;
    this.getCategory(categorySlug);
    this.getBookmarks(categorySlug);
  }
};
</script>

<style scoped>
.no-bookmarks {
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  height:80%;
  text-align: center;
}

.no-bookmarks--heading {
  font-size: 2em;
}

.no-bookmarks--text {
  color: #656970;
}
</style>