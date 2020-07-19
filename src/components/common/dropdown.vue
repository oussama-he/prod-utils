<template>
  <div class="dropdown" @mouseenter="visible=true" @mouseleave="visible=false">
    <i class="fa fa-plus dropdown-btn"></i>
    <transition name="fade">
      <div class="dropdown-content" v-show="visible">
        <slot name='dropdown-links'></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  created() {
    window.onclick = event => {
      if (!event.target.matches(".dropdown-btn")) {
        this.visible = false;
      }
    };
  },
  data() {
    return {
      visible: false
    };
  },
};
</script>

<style>
.dropdown {
  display: inline-block;
}

.dropdown-btn {
  cursor: pointer;
}

.dropdown-content {
  display: block;
  position: absolute;
  right: 2em;
  margin-top: 0.5em;
  padding: 0.5em 1em;
  z-index: 1000;
  box-shadow: 0 0 12px rgba(0,0,0,.16),0 8px 24px rgba(0,0,0,.2);
  background-color: #ffffff;
  border-radius: 3px;
}

.dropdown-item {
  display: block;
  text-decoration: none;
}

.dropdown-item i.fa {
  margin-right: 10px;
}
</style>
