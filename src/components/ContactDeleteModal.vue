<template>
  <div class="modal-wrapper" v-if="this.showModal">
    <div class="modal-blur">
    </div>
    <div class="modal-card">
      <div class="modal-header">
        <p>Excluir contato</p>
        <hr>
      </div>

      <div class="message-wrapper">
        <p>Deseja realmente excluir o contato?</p>
      </div>

      <hr>

      <div class="buttons-form-wrapper">
        <button
          type="button"
          name="cancelar-contato"
          class="modal-button-text"
          @click="updateModalVisibility"
        >
          Cancelar
        </button>
        <button
          type="button"
          name="deletar-contato"
          class="modal-button"
          @click="deleteContact"
        >
          Excluir
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    contactId: {
      type: Number,
      default: null
    }
  },
  methods: {
    deleteContact () {
      this.$store.commit('deleteContact', this.contactId)

      this.updateModalVisibility()
    },
    updateModalVisibility () {
      this.$emit('updateModalVisibility', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/atoms/buttons';
@import '../assets/atoms/input';

.modal-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;

  .modal-blur {
    background-color: black;
    width: 100%;
    height: 100%;
    opacity: .5;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
  }

  .modal-card {
    width: 30vw;
    min-width: 380px;
    height: auto;
    border-radius: 16px;
    box-shadow: 0 16px 10px 0 rgba(0, 0, 0, 0.16);
    background-color: var(--white-two);
    z-index: 2;
    padding: 16px 0;

    hr {
      border: solid 1px var(--cloudy-blue);
    }

    .modal-header {
      p {
        margin: 0 16px;
        margin-bottom: 12.5px;
      }
    }

    .message-wrapper {
      padding: 24px;

      p {
        font-size: 14px;
        color: var(--dark);
        margin: 0 0 24px 0;
      }
    }

    .buttons-form-wrapper {
      float: right;
      margin: 8px 8px 0 0;
    }
  }
}
</style>
