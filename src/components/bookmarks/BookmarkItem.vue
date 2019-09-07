<template>
  <li
    @click="selectedCat = bookmark"
    class="bookmark-item"
    @mouseover="actionsShow = true"
    @mouseleave="actionsShow = false"
  >
    <div class="bookmark-title">
      <a href="#">
        <i :class="bookmark.favorite ? 'fa fa-bookmark' : 'far fa-bookmark'"></i>
      </a>
      <a href="#">
        <i :class="bookmark.safe ? 'fas fa-ban' : 'fas fa-check-circle'"></i>
      </a>
      <a :href="bookmark.url" target="_blank">
        {{bookmark.title}}
        <span class="url" v-show="actionsShow">
          <em style="color:#ced0d3">{{bookmark.url}}</em>
        </span>
      </a>
    </div>
    <div class="bookmark-actions" v-show="actionsShow">
      <a href="#" @click="archiveClicked">
        <i class="f-icon fa fa-archive"></i>
      </a>
      <a :href="bookmark.url" target="_blank">
        <i class="f-icon fa fa-external-link-alt"></i>
      </a>
      <a href="#" @click="deleteClicked">
        <i class="f-icon fa fa-trash"></i>
      </a>
      <a href="#">
        <i class="f-icon fa fa-info-circle"></i>
      </a>
    </div>
  </li>
</template>

<script>
export default {
  name: "BookmarkItem",
  props: {
    bookmark: { type: Object }
  },
  data() {
    return {
      actionsShow: false
    };
  },
  methods: {
    deleteClicked() {
      this.$emit('delete-clicked', this.bookmark)
      // console.log(typeof this.bookmark.safe)
    },
    archiveClicked() {
      this.$emit('archive-clicked', this.bookmark)
    }
  }
};
</script>

<style>
.bookmark-item {
  display: flex;
  /* justify-content: space-between; */
  /* flex-direction: row; */
  list-style: none;
  /* border-top: 1px solid #efefef; */
  padding: 2px 20px;
  border-radius: 5px;
  /* flex-wrap: wrap; */
}

.bookmark-item:nth-child(odd) {
  background: #f3fafc;
}

.bookmark-item:nth-child(even) {
  background: #fff;
}
.bookmark-title {
  /* width: 75%; */
  padding: 5px 0 5px 5px;
  display: flex;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  align-items: center;
}

.bookmark-title a {
  text-decoration: none;
}

.bookmark-title i {
  padding: 5px;
}

.bookmark-item:hover {
  background: #f6f6f6;
  background: #ecf5fc;
}

.bookmark-item:hover > .bookmark-actions {
  display: block;
}

.bookmark-actions {
  display: none;
  padding: 5px 5px;
}

.f-icon {
  padding: 2px;
}
</style>

