<template>
  <div>
    <h3 class="bookmarks-title">{{selectedCategory()}}</h3>
    <p class="bookmarks-description"></p>
    <ul class="bookmarks-list">
      <bookmark-item
        v-for="(bookmark, bookmarkIdx) in bookmarks"
        :bookmark="bookmark"
        :key="bookmarkIdx"
        @delete-clicked="deleteClicked"
        @archive-clicked="archiveClicked"
        @info-clicked="infoClicked"
        @edit-clicked="editClicked"
      />
    </ul>
  </div>
</template>


<script>
import BookmarkItem from "./BookmarkItem";

export default {
  name: "BookmarkList",
  props: {
    bookmarks: {type: Array, default: ()=>[]}
  },
  components: { BookmarkItem },
  methods: {
    selectedCategory() {
      let category = this.$store.state.activeCategory;
      if (category) {
        return category.name;
      }
    },
    deleteClicked(bookmark) {
      this.$emit('delete-clicked', bookmark)
    },
    archiveClicked(bookmark) {
      this.$emit('archive-clicked', bookmark)
    },
    infoClicked (bookmark) {
      this.$emit('info-clicked', bookmark)
    },
    editClicked (bookmark) {
      this.$emit('edit-clicked', bookmark)
    }
  }
};
</script>

<style>
p.bookmarks-description {
  padding: 0 25px;
  text-align: justify;
}
.bookmarks-list {
  display: block;
  margin: 20px;
  padding-left: 0;
}

.bookmarks-title {
  padding-left: 25px;
}
</style>
