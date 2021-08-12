<template>
  <div class="modal-wrapper" v-if="this.showModal">
    <div class="modal-blur">
    </div>
    <div class="modal-card">
      <div class="modal-header">
        <p>Criar novo contato</p>
        <hr>
      </div>
      <div class="form-wrapper">
        <label for="name">Nome</label>
        <input type="text" name="name" v-model="name">

        <label
          for="email"
          :class="[ emailError ? 'error' : '']"
        >
          E-mail
        </label>
        <input
          type="email"
          name="email"
          v-model="email"
          :class="[ emailError ? 'error' : '']"
        >
        <span v-show="emailError">{{ emailError }}</span>

        <label for="phone">Telefone</label>
        <input
          type="text"
          name="phone"
          v-model="phone"
          maxlength="11"
          class="phone-input"
        >
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
          name="salvar-contato"
          class="modal-button"
          :class="this.btnDisabledClass"
          @click="createNewContact"
          :disabled="btnDisabled"
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      name: '',
      email: '',
      emailError: '',
      phone: '',
      btnDisabledClass: 'disabled'
    }
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    contactId: {
      type: Number,
      default: null
    },
    contactObj: {
      type: Object,
      default: null
    }
  },
  methods: {
    createNewContact () {
      if (this.emailValidation(this.email) === false) {
        return
      }

      if (this.contactObj) {
        const contactInfo = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          id: this.contactObj.id,
          arrayId: this.contactId
        }

        this.$store.commit('updateContact', contactInfo)
        this.$emit('updateNewContactHighlight', this.contactObj.id)
      } else {
        const contactInfo = {
          name: this.name,
          email: this.email,
          phone: this.phone
        }

        this.$store.commit('addNewContact', contactInfo)

        const contactsList = this.$store.getters.contactsList
        this.$emit('updateNewContactHighlight', contactsList[contactsList.length - 1].id)
      }

      this.updateModalVisibility()
      this.clearForm()
    },
    updateModalVisibility () {
      this.$emit('updateModalVisibility', false)
      this.clearForm()
    },
    clearForm () {
      this.name = ''
      this.email = ''
      this.phone = ''
      this.nameError = ''
      this.emailError = ''
      this.phoneError = ''
    },
    emailValidation (email) {
      if (email.length < 1) {
        this.emailError = ''
        return true
      }

      var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const validEmail = regex.test(String(email).toLowerCase())

      if (validEmail !== true) {
        this.emailError = 'E-mail inválido!'
        return false
      }
    }
  },
  computed: {
    btnDisabled () {
      if ((this.name || this.email || this.phone) === '') {
        return true
      }

      return false
    }
  },
  watch: {
    btnDisabled (newValue, oldValue) {
      if (newValue === true) {
        this.btnDisabledClass = 'disabled'
      } else {
        this.btnDisabledClass = ''
      }
    },
    contactObj (newValue, oldValue) {
      if (newValue) {
        this.name = this.contactObj.name
        this.email = this.contactObj.email
        this.phone = this.contactObj.phone
      }
    },
    phone (newValue, oldValue) {
      if (newValue !== undefined && newValue.length === 11) {
        this.phone = newValue.replace(/[^0-9]/g, '')
          .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
      }
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

    .form-wrapper {
      display: flex;
      flex-direction: column;
      padding: 8px 24px 24px 24px;

      label {
        margin-bottom: 4px;
        font-size: 14px;
        color: var(--dark);
        margin-top: 16px;

        &.error {
          color: var(--salmon);
        }
      }

      input {
        border-radius: 4px;
        padding: 0 8px;
        color: var(--dark);
        font-size: 14px;

        &.phone-input {
          width: 33%;
        }

        &.error {
          color: var(--salmon);
          border-color: var(--salmon);
        }
      }

      span {
        font-size: 12px;
        margin-top: 4px;
        color: var(--salmon);
      }
    }

    .buttons-form-wrapper {
      float: right;
      margin: 8px 8px 0 0;
    }
  }
}
</style>
