<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{title}}</h3>
        <i class="fas fa-times" @click="handleClose"></i>
      </div>
      <div class="modal-body">
        <slot name="modal-body">The main content here</slot>
      </div>
      <div class="modal-footer">
        <slot name="modal-footer">A Good Place To Add Some Actions</slot>
      </div>
    </div>
  </div>
</template>

<script>
import {Bus} from '@/utils/Bus'
export default {
  props: {
    title: { type: String, default: () => "" }
  },
  methods: {
    handleClose() {
      Bus.$emit('close-modal')
    }
  }
};
</script>

<style>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top:0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #FFF;
  width: 600px;
  max-width: calc(100vw - 20px);
  max-height: calc(100vh - 20px);
  overflow: auto;
  border-radius: 0.5em;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  padding: 1em;
  border-bottom: 1px solid #dee2e6;
}

.modal-header i {
  cursor: pointer;
}

.modal-body {
  padding: 1em;
}

.modal-footer {
  padding: 1em;
  border-top: 1px solid #dee2e6;
}
</style>
