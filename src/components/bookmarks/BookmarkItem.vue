<template>
  <li
    class="bookmark-item"
    @mouseover="actionsShow = true"
    @mouseleave="actionsShow = false"
  >
    <div class="bookmark-title">
      <i class="fas fa-bookmark"></i>

      <a :href="bookmark.url" target="_blank">
        {{bookmark.title}}
        <span class="url" v-show="actionsShow">
          <em style="color:#ced0d3">{{bookmark.url}}</em>
        </span>
      </a>
    </div>
    <div class="bookmark-actions" v-show="actionsShow">
      <a :href="bookmark.url" target="_blank" title="Go to site">
        <i class="f-icon fa fa-external-link-alt"></i>
      </a>
      <a href="#" @click="deleteClicked" title="Delete bookmark">
        <i class="f-icon fa fa-trash"></i>
      </a>
      <a href="#" @click="infoClicked" title="Info about bookmark">
        <i class="f-icon fa fa-info-circle"></i>
      </a>
      <a href="#" @click="editClicked" title="Edit bookmark">
        <i class="f-icon fa fa-edit"></i>
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
    },
    infoClicked () {
      this.$emit('info-clicked', this.bookmark)
    },
    editClicked () {
      this.$emit('edit-clicked', this.bookmark)
    }
  }
};
</script>

<style>
.bookmark-item {
  display: flex;
  list-style: none;
  padding: 2px 20px;
  border-radius: 5px;
}

.bookmark-item:nth-child(odd) {
  background: #f3fafc;
}

.bookmark-item:nth-child(even) {
  background: #fff;
}
.bookmark-title {
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

