<template>
  <form action="/bookmarks/api/" method="post" @submit.prevent="saveBookmarkHandler">
    <div>
      <label>URL</label>
      <input name="url" type="url" v-model="url" @change="onChangeUrl" class="form-control" />
    </div>
    <div>
      <label for>Title</label>
      <input type="text" name="title" id="title" v-model="title" class="form-control" />
    </div>
    <div>
      <label for="category">Category</label>
      <treeselect v-model="categoryID" :options="categories" />
    </div>
    <div>
      <label for>Description</label>
      <textarea
        name="description"
        id="description"
        rows="1"
        v-model="description"
        class="form-control"
      ></textarea>
    </div>
    <div class="form-check">
      <input name="safe" class="form-check-input" type="checkbox" v-model="safe" />
      <label class="form-check-label">Safe?</label>
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
    url: {type: String, default: ""},
    pk: {type: Number},
    title: {type: String, default: ""},
    categoryID: {type: Number},
    description: {type: String, default: ""},
    safe: {type: Boolean, default: false},
    archived: {type: Boolean, default: false},
    favorited: {type: Boolean, default: false},
    bookmarkedAt: {type: null},
    lastUpdate: {type: null},
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
        .get("/api/bookmarks/get-page-title/" + this.url)
        .then(response => {
          let pageTitle = response.data.title;
          this.title = pageTitle;
        })
        .catch(error => {
          console.log("error when getting page title", error);
        });

      this.axios
        .get(`/api/bookmarks/check-url-existence/${this.url}`)
        .then(response => {
          let existence = response.data.url_existence;
          if (existence) {
            alert("URL already exists");
          }
        });
    },
    saveBookmarkHandler() {
      // TODO: do some validations here
      this.saveBookmark({
        id: this.pk,
        title: this.title,
        url: this.url,
        category: this.categoryID,
        description: this.description,
        safe: this.safe,
        archived: this.archived,
        favorited: this.favorited,
        bookmarkedAt: this.bookmarkedAt,
        lastUpdate: this.lastUpdate,
      });
      // TODO: when we click submit button on form empty or fields required empty it closes the modal. try to fix this
      Bus.$emit("close-modal");
    }
  }
};
</script>