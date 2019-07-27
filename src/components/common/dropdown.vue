<template>
  <div class="dropdown">
    <i class="fa fa-plus dropdown-btn" 
    @click="toggleDropdown"
    style="cursor:pointer"></i>

    <transition name="slide-fade">
      <div class="dropdown-content" v-if="visible">
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
  methods: {
    toggleDropdown() {
      console.log('from toggle dropdown')
      this.visible = !this.visible;
    }
  }
};
</script>

<style>
.dropdown {
  display: inline-block;
}

.dropdown-content {
  display: block;
  position: absolute;
  right: 5px;
  z-index: 1;
  max-width: 110px;
  background-color: #f8f9fa
}

.dropdown-item {
  display: block;
  padding: 12px 16px;
  text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
