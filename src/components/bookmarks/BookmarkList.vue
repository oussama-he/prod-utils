<template>
  <div>
    <ul class="bookmarks-list">
      <bookmark-item
        v-for="(bookmark, bookmarkIdx) in bookmarks"
        :bookmark="bookmark"
        :key="bookmarkIdx"
        @delete-clicked="deleteClicked"
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
    deleteClicked(bookmark) {
      this.$emit('delete-clicked', bookmark)
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
