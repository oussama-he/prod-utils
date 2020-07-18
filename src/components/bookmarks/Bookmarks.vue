<template>
  <div>
    <collapse v-if="category" :title="category.label">
      <template
        v-slot:collapse-body
      >{{category.description ? category.description : "No description provided"}}</template>
    </collapse>
    <bookmark-list
      :bookmarks="bookmarks"
      @delete-clicked="deleteBookmarkHandler"
      @info-clicked="getBookmarkInfoHandler"
      @edit-clicked="editBookmarkHandler"
    ></bookmark-list>
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
          pk: bookmark.id,
          title: bookmark.title,
          url: bookmark.url,
          categoryID: this.category.id,
          description: bookmark.description,
          bookmarked_at: bookmark.bookmarked_at,
          last_update: bookmark.last_update,
          slug: bookmark.slug,
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