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
    bookmarked_at: {type: null},
    last_update: {type: null},
    slug: {type: null},
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
        bookmarked_at: this.bookmarked_at,
        last_update: this.last_update,
        slug: this.slug,
      });
      // TODO: when we click submit button on form empty or fields required empty it closes the modal. try to fix this
      Bus.$emit("close-modal");
    }
  }
};
</script>