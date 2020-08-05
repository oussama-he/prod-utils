<template>
  <transition name="show-slide" appear>
    <div class="toast">
      <span class="fas fa-check-circle"></span>
      <span class="msg">{{msg}}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  props: {
    msg: {
      type: String,
      default: "",
    }
  }
}
</script>
<style scoped>
.toast {
  display: flex;
  position: absolute;
  bottom: 80px;
  right: 30px;
  color: #495057;
  background: #f8f9fa;
  padding: 1em 1em;
  border-radius: 4px;
  border-left: 8px solid #495057;
  overflow: hidden;
}

.show-slide-enter-active {
  animation: show-slide 1s ease forwards;
}

.show-slide-leave-active {
  animation: hide-slide 1s ease forwards;
}

@keyframes show-slide {
  0% {
    transform: translateX(100%);
  }
  40% {
    transform: translateX(-10%);
  }
  80% {
    transform: translateX(0%);
  }
  90% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes hide-slide {
  0% {
    transform: translateX(-10px);
  }
  40% {
    transform: translateX(0%);
  }
  80% {
    transform: translateX(-10%);
  }
  100% {
    transform: translateX(100%);
  }
}

.toast .fa-check-circle {
  font-size: 1.5em;
}

.toast .msg {
  padding: 0 1.25em 0 0.75em;
}
</style>
