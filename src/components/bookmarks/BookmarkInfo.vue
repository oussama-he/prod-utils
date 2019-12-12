<template>
  <ul style="list-style:none">
    <li>
      <strong>Title:</strong>
      {{bookmarkInfo.title}}
    </li>
    <li>
      <strong>
        URL
        <i class="fas fa-external-link-alt"></i>:
      </strong>
      <a :href="bookmarkInfo.url" target="_blank">{{bookmarkInfo.url}}</a>
    </li>
    <li>
      <strong>Bookmarked At:</strong>
      {{bookmarkInfo.bookmarkedAt | formatDate}}
    </li>
    <li>
      <strong>Last update:</strong>
      {{bookmarkInfo.lastUpdate | formatDate}}
    </li>
    <li>
      <strong>Favorited:</strong>
      {{bookmarkInfo.favorited}}
    </li>
    <li>
      <strong>Safe:</strong>
      <i :class="bookmarkInfo.safe ? 'fas fa-check-circle' : 'fas fa-ban'"></i>
    </li>
    <li>
      <strong>Archived:</strong>
      {{bookmarkInfo.archived}}
    </li>
    <li v-if="bookmarkInfo.description">
      <strong>Description:</strong>
      {{bookmarkInfo.description}}
    </li>
  </ul>
</template>

<script>
import { Bus } from "@/utils/Bus";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "BookmarkInfoModal",
  components: {},
  props: {
    bookmarkInfo: {type: Object}
  },
  filters: {
    formatDate(value) {
      let date = new Date(value);
      return `${date.toDateString()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
  }
};
</script>