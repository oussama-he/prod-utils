<template>
  <ul class="categories">
    <category-item
      v-for="(catg, catgIdx) in categories"
      :category="catg"
      :key="catgIdx"
      @category-selected="categorySelected"
    />
  </ul>
</template>

<script>
import CategoryItem from "./CategoryItem";

export default {
  name: "CategoryList",
  props: ['categories'],
  components: {
    CategoryItem
  },
  methods: {
    categorySelected(category) {
      this.$emit("category-selected", category);
    }
  }
};
</script>

<style>
.categories {
  /*! height: 500px; */
  overflow: auto;
}
.categories {
  display: block;
  width: 25%;
  background: #f8f9fa;
  padding-left: 0;
  margin-left: 0;
  margin-right: 0;
}

.categories a {
  display: block;
  text-decoration: none;
}
</style>
