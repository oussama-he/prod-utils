<template>
  <form method="post" @submit.prevent="saveCategoryHandler">
    <div>
      <label for>Label</label>
      <input
        type="text"
        class="form-control"
        v-model="category.label"
        placeholder="Category Label"
      />
    </div>
    <div>
      <label for>Parent</label>
      <treeselect v-model="category.parent" :options="clonedCategories" />
    </div>
    <div>
      <label for>Description</label>
      <textarea
        v-model="category.description"
        name="description"
        class="form-control"
        placeholder="Writ a short description here..."
        rows="3"
      ></textarea>
    </div>
    <input type="submit" value="Save" />
  </form>
</template>

<script>
import { Bus } from "@/utils/Bus";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { mapGetters, mapActions } from "vuex";
import { removeCategory } from "@/utils/utils";
export default {
  name: "EditCategoryForm",
  components: {
    Treeselect,
  },
  data() {
    return {
      clonedCategories: [],
    };
  },
  computed: {
    ...mapGetters({
      categories: "bookmarks/categories",
    }),
  },
  props: {
    category: { type: Object },
  },
  methods: {
    ...mapActions({
      saveCategory: "bookmarks/saveCategory",
    }),
    removeCurrentCategory() {
      this.clonedCategories = JSON.parse(JSON.stringify(this.categories));

      removeCategory(this.clonedCategories, this.category);
    },
    saveCategoryHandler() {
      // TODO: add some validation here
      this.category.parent = this.category.parent || null;
      this.saveCategory(this.category);
      Bus.$emit("close-modal");
    },
  },
  mounted() {
    this.removeCurrentCategory();
  },
};
</script>
