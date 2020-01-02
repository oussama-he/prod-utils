<template>
  <form method="post" @submit.prevent="saveCategoryHandler">
    <div>
      <label for>Label</label>
      <input type="text" class="form-control" v-model="label" placeholder="Category Label" />
    </div>
    <div>
      <label for>Parent</label>
      <treeselect v-model="parent" :options="categories" />
    </div>
    <div>
      <label for>Description</label>
      <textarea
        v-model="description"
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
export default {
  name: "EditCategoryForm",
  components: {
    Treeselect
  },
  computed: {
    ...mapGetters({
      categories: "bookmarks/categories"
    })
  },
  props: {
    id: { type: Number },
    label: { type: String, default: () => "" },
    parent: { type: Number },
    description: { type: String, default: () => "" }
  },
  methods: {
    ...mapActions({
      saveCategory: "bookmarks/saveCategory"
    }),
    saveCategoryHandler() {
      // TODO: add some validation here
      this.saveCategory({
        id: this.id,
        label: this.label,
        parent: this.parent,
        description: this.description
      });
      Bus.$emit("close-modal");
    }
  }
};
</script>