<script>
export default {
  name: 'PontoAnalise',
  props: {
    IdPonto: {
      type: Number,
      required: true
    },
    NomePonto: {
      type: String,
      required: true
    },
    X: {
      type: Number,
      required: true
    },
    Y: {
      type: Number,
      required: true
    },
    largImg: {
      type: Number,
      required: true
    },
    altImg: {
      type: Number,
      required: true
    }
  },
  emits: ['click'], // Emit a custom event to the parent when clicked
  data() {
    console.log(window.innerWidth, window.innerHeight);
    return {
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      }     
    };

  },
  computed: {
    // Calculate styles for positioning the point based on the image and current window size
    pontoStyles() {
      let scaleX, scaleY;
      // Adjust scaling factors based on window width
      if (this.windowSize.width < 476) {
        scaleX = this.largImg / 340;
        scaleY = this.altImg / (this.altImg * (340 / this.largImg));
      } else if (this.windowSize.width < 641) {
        scaleX = this.largImg / 435;
        scaleY = this.altImg / (this.altImg * (435 / this.largImg));
      } else if (this.windowSize.width < 769) {
        scaleX = this.largImg / 600;
        scaleY = this.altImg / (this.altImg * (600 / this.largImg));
      } else if (this.windowSize.width < 1024) {
        scaleX = this.largImg / 728;
        scaleY = this.altImg / (this.altImg * (728 / this.largImg));
      }else if (this.windowSize.width < 1260) {
        scaleX = this.largImg / 1024;
        scaleY = this.altImg / (this.altImg * (1024 / this.largImg));
      }else if (this.windowSize.width < 1367) {
        scaleX = this.largImg / 900;
        scaleY = this.altImg / (this.altImg * (900 / this.largImg));
      } 
      else if (this.windowSize.width < 1537) {
        scaleX = this.largImg / 950;
        scaleY = this.altImg / (this.altImg * (950 / this.largImg));
      } 
      else {
        // Default scaling factors for larger screens
        scaleX = this.largImg / 1024;
        scaleY = this.altImg / (this.altImg * (1024 / this.largImg));
      }
      return {
        left: `${(this.X / scaleX) - 8}px`,
        top: `${(this.Y / scaleY) - 8}px`
      };
    }
  },
  mounted() {
    // Add window resize event listener
    window.addEventListener('resize', this.updateWindowSize);
  },
  beforeUnmount() {
    // Remove the event listener on component destruction
    window.removeEventListener('resize', this.updateWindowSize);
  },
  methods: {
    // Update window dimensions on resize
    updateWindowSize() {
      this.windowSize.width = window.innerWidth;
      this.windowSize.height = window.innerHeight;
    },
    // Emit click event with point ID to the parent component
    handleClick() {
      this.$emit('click', this.idPonto);
    }
  }
  
};
</script>

<template>
  <div
    class="ponto"
    :id="IdPonto"
    :style="pontoStyles"
    @click="handleClick"
  >
    {{ NomePonto }}
  </div>
</template>

<style scoped>
.ponto {
  position: absolute;
  background-color: rgb(0, 0, 0);
  width: 17px;
  height: 17px;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 700;
  color: block;
  text-shadow: 1px 1px 0.2rem white;
  padding-top: 6px;
  text-align: center;
  transition: background-color 0.3s, font-weight 0.3s, transform 0.5s; /* Add transition for background-color, font-weight, and transform */
}

.ponto:hover {
  cursor: pointer;
  background-color: antiquewhite;
  font-weight: bolder;
  padding: 6px;
  color: white;
  text-shadow: 1px 1px 0.2rem black;
  transform: scale(1.1);
}
</style>
