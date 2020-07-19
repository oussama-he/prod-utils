<template>
  <form action="/bookmarks/api/" method="post" @submit.prevent="saveBookmarkHandler">
    <div>
      <label for="url">URL</label>
      <input name="url" type="url" v-model="bookmark.url" @change="onChangeUrl" id="url" class="form-control" />
    </div>
    <div>
      <label for="title">Title</label>
      <input type="text" name="title" id="title" v-model="bookmark.title" class="form-control" />
    </div>
    <div>
      <label for="categories">Category</label>
      <treeselect v-model="bookmark.category" :options="categories" id="categories" />
    </div>
    <div>
      <label for="description">Description</label>
      <textarea
        name="description"
        id="description"
        rows="1"
        v-model="bookmark.description"
        class="form-control"
      ></textarea>
    </div>
    <input type="submit" value="Save" />
  </form>
</template>

<script>
import { Bus } from "@/utils/Bus";
import { mapActions, mapGetters } from "vuex";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: {
    Treeselect
  },
  props: {
    bookmark: {type: Object},
  },
  computed: {
    ...mapGetters({
      categories: "bookmarks/categories"
    })
  },
  methods: {
    ...mapActions({
      saveBookmark: "bookmarks/saveBookmark"
    }),
    onChangeUrl() {
      this.axios
        .get("/api/bookmarks/get-page-title/" + this.bookmark.url)
        .then(response => {
          let pageTitle = response.data.title;
          this.bookmark.title = pageTitle;
        })
        .catch(error => {
          console.log("error when getting page title", error);
        });

      this.axios
        .get(`/api/bookmarks/check-url-existence/${this.bookmark.url}`)
        .then(response => {
          let existence = response.data.url_existence;
          if (existence) {
            alert("URL already exists");
          }
        });
    },
    saveBookmarkHandler() {
      // TODO: do some validations here
      this.saveBookmark(this.bookmark);
      // TODO: when we click submit button on form empty or fields required empty it closes the modal. try to fix this
      Bus.$emit("close-modal");
    }
  }
};
</script>