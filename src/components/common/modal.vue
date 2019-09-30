<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">{{title}}</h2>
        <i class="fas fa-times" @click="$emit('close')"></i>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: () => "" }
  },
};
</script>

<style>
.modal {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: #4a4a4a;
  display: block;
  width: 500px;
  position: fixed;
  top: 70px;
  left: calc(50% - 250px);
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 0 1.5rem;
}

.modal-header i {
  line-height: 2rem;
  cursor: pointer;
}

.modal-title {
  margin-top: 0;
}
.modal-body {
  overflow: auto;
  height: 70vh;
  padding: 1.5rem 1.5rem 0 1.5rem;
}
</style>
