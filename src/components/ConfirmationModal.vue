<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <h3>Confirm Logout</h3>
      <p>Are you sure you want to log out?</p>
      <div class="modal-buttons">
        <button @click="confirmLogout">Yes, Logout</button>
        <button @click="cancelLogout">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';
export default {

  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    onConfirm: {
      type: Function,
      required: true,
    },
    onCancel: {
      type: Function,
      required: true,
    },
  },
  methods: {
    confirmLogout() {
      this.onConfirm();
      router.push(this.$route.query.redirect || '/');
    },
    cancelLogout() {
      this.onCancel();
      
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  /* Ensure the modal is on top */
}

.modal {
  background: white;
  padding: 40px;
  border-radius: 5px;
  text-align: center;
  z-index: 1001;
  /* Higher than overlay */
}

.modal-buttons {
  margin-top: 20px;
  padding: 5px;
}

button {
  margin: 0 10px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}
</style>