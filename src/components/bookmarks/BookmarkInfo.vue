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
      {{bookmarkInfo.bookmarked_at | formatDate}}
    </li>
    <li>
      <strong>Last update:</strong>
      {{bookmarkInfo.updated_at | formatDate}}
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