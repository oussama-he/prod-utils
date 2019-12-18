<template>
  <div class="collapse-wrapper">
    <div class="collapse-title" @click="collapsed=!collapsed">
      <h3>
        <i class="fa fa-angle-right" :class="{'rotate-90': !collapsed}"></i> {{title}}
      </h3>
    </div>
    <transition name="fade">
      <div class="collapse-body" v-if="!collapsed">
        <slot name="collapse-body"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Collapse",
  props: {
      title: {type: String, default: ()=>""}
  },
  data() {
      return {
          collapsed: true
      }
  }
};
</script>  

<style>
.collapse-title {
  cursor: pointer;
}

.rotate-90 {
  transform: rotate(90deg);
  transition: transform 0.3s ease;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>