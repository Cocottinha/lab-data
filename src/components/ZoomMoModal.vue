<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <img :src="file" alt="Full size" class="modal-image"/>
      <div class="modal-buttons"> 
        <a :href="`${file}`" download>
          <button>Baixar Imagem</button>
        </a>
        <button @click="exit">Fechar</button>     
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    onExit: {
      type: Function,
      required: true,
    },
  },
  methods: {
    exit() {
      this.onExit(); // Close the modal
    },
  },
};
</script>

<style scoped>
/* Modal Styles */
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
}

.modal {
  background: none;
  padding: 40px;
  border-radius: 5px;
  text-align: center;
  z-index: 1001;
}

.modal-buttons {
  margin-top: 10px;
  padding: 0px;
}

button {
  padding: 10px;
  background-color: rgb(201, 199, 199);
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  transition: 0.5s ease;
}
button:hover {
  background-color: red;
}

.modal-image {
  max-width: 100%;
  max-height: 90vh;
  margin-top: 10px;
}
</style>
