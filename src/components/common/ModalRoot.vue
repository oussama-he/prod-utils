<template>
    <modal :isOpen="!!component" :title="title" @close="handleModalClose">
      <template v-slot:modal-body>
        <component :is="component" v-bind="props"></component>
      </template>
    </modal>
</template>

<script>
import { Bus } from "@/utils/Bus";
import Modal from "./Modal";
export default {
  components: {
    Modal
  },
  data() {
    return {
      component: null,
      title: "",
      props: null,
      closeOnClick: true
    };
  },
  created() {
    Bus.$on(
      "open-modal",
      ({ component, title, props = null, closeOnClick=true }) => {
        this.open = true;
        this.component = component;
        this.title = title;
        this.props = props;
        this.closeOnClick = closeOnClick;
      }
    );

    Bus.$on("close-modal", () => {this.component = null})
    document.addEventListener("keyup", this.handleKeyup);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.handleKeyup);
  },
  methods: {
    handleModalClose(force = false) {
      if (!this.closeOnClick && !force) return;
      this.handleClose();
    },
    handleClose() {
      this.component = null;
    },
    handleKeyup(event) {
      if (event.keyCode === 27) this.handleClose();
    }
  }
};
</script>