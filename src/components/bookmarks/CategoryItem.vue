<template>
  <li class="category-item">
    <div
    style="width:20px;display:inline-block">
      <i
        @click="clicked"
        v-if="hasSubCategories"
        :class="expanded ? 'fa fa-chevron-down' : 'fa fa-chevron-right'"
      ></i>
    </div>
    <div class="category-title" @click="catgClicked">
      <span>
        <i :class="expanded ? 'fa fa-folder-open' : 'fa fa-folder'"></i>
        {{category.label}}
      </span>
    </div>

    <ul class="sub-category" v-if="expanded && hasSubCategories">
      <category-item
        v-for="(subCatg, subCatgIdx) in category.children"
        :category="subCatg"
        :key="subCatgIdx"
        @category-selected="subCategorySelected"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: "CategoryItem",
  props: {
    category: Object
  },
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    clicked() {
      this.toggleExpand();
    },
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    catgClicked(){
      this.$emit("category-selected", this.category);
    },
    subCategorySelected(subCategory) {
      this.$emit("category-selected", subCategory);
    },
    retrieveCatgBookmarks(category) {
      this.$store.dispatch("loadBookmarks", category);
      this.$store.dispatch("changeCategory", { category: this.category });
    }
  },
  computed: {
    hasSubCategories() {
      return this.category.children && this.category.children.length;
    }
  }
};
</script>

<style>
.category-item {
  display: block;
  padding: 4px 10px;
  font-weight: 500;
  /*! padding-left: 13px; */
  /*! margin-left: -32px; */
  /*! padding-left: 32px; */
}

.category-title {
  display: inline;
}

.category-title:hover,
.category-title.active {
  background: #ecf5fc;
  background: #dfeff3;
  border-radius: 5px;
}

.category-title:hover a,
.category-title.active a {
  color: #40a4f4;
  color: #4dabf7;
}

ul.sub-category {
  padding-left: 5px;
}
</style>
