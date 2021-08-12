<template>
  <div class="home">
    <div class="header">
      <img
        id="logo"
        src="../assets/imgs/ic-logo.svg"
        alt="Ubook logo with pink coloring"
      >

      <button
        type="button"
        name="criar-contato"
        class="add-button"
        @click="openContactForm()"
        v-if="this.contacts.length > 0"
      >
        + Criar contato
      </button>

      <Modal
        :showModal="this.showNewContactModal"
        :contactId="this.editContactId"
        :contactObj="this.editContactObj"
        @updateModalVisibility="onChildShowCreateContactModal"
        @updateNewContactHighlight="onChildNewContactHighlight"
      />

      <ContactDeleteModal
        :showModal="this.showContactDeleteModal"
        :contactId="this.contactDeleteId"
        @updateModalVisibility="onChildShowContactDeleteModal"
      />

      <div class="input-icon">
        <input
          type="text"
          name="search"
          placeholder="Buscar..."
          aria-label="Busque pela agenda"
          v-model="search"
        >
        <img
          src="../assets/imgs/ic-search.svg"
          alt="" />
      </div>

    </div>

    <div class="home-content-wrapper" v-if="this.contacts.length > 0">
      <table >
        <tr>
          <th></th>
          <th>Contatos</th>
          <th>E-mail</th>
          <th>Telefone</th>
          <th></th>
        </tr>
        <tr
          v-for="(contact) in this.filteredContacts"
          :key="contact.id"
          :class="[ newContactHighlight === contact.id ? 'new-contact' : '']"
          :id="contact.id"
        >
          <td>
            <span>
              {{ contact.name.charAt(0) }}
            </span>
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.phone }}</td>
          <td class="action-icons">
            <img
              src="../assets/imgs/ic-edit.svg"
              alt="A pencil icon"
              @click="openContactForm(contact.id)"
            >
            <img
              src="../assets/imgs/ic-delete.svg"
              alt="A trash can icon"
              @click="openContactDeleteForm(contact.id)"
            >
          </td>
        </tr>
      </table>
    </div>

    <div class="no-contacts-wrapper" v-else>
      <img
        id="book"
        src="../assets/imgs/ic-book.svg"
        alt="A opened book illustration with grey coloring"
      >

      <p class="no-contact-text">Nenhum contato foi criado ainda.</p>

      <button
        type="button"
        name="criar-contato"
        class="add-button"
        @click="showNewContactModal = !showNewContactModal"
      >
        <img
          src="../assets/imgs/ic-plus.svg"
          alt="A plus icon"
        >
        Criar contato
      </button>
    </div>

  </div>
</template>

<script>
import Modal from '@/components/Modal'
import ContactDeleteModal from '@/components/ContactDeleteModal'

export default {
  name: 'Home',
  components: {
    Modal,
    ContactDeleteModal
  },
  data: function () {
    return {
      showNewContactModal: false,
      showContactDeleteModal: false,
      editContactId: null,
      editContactObj: null,
      contactDeleteId: null,
      newContactHighlight: false,
      search: ''
    }
  },
  methods: {
    onChildShowCreateContactModal (value) {
      this.showNewContactModal = value
      this.editContactId = null
      this.editContactObj = null
    },
    onChildShowContactDeleteModal (value) {
      this.showContactDeleteModal = value
      this.editContactId = null
      this.editContactObj = null
    },
    onChildNewContactHighlight (value) {
      this.newContactHighlight = value
      this.search = ''

      setTimeout(() => {
        this.newContactHighlight = false
      }, 10000)
    },
    openContactForm (editContactId = '') {
      if (editContactId !== '') {
        const index = this.contacts.findIndex(contact => contact.id === editContactId)
        const contactEdit = Object.assign({}, this.contacts[index])

        this.editContactId = index
        this.editContactObj = contactEdit
      }

      this.showNewContactModal = !this.showNewContactModal
    },
    openContactDeleteForm (contactDeleteId = '') {
      if (contactDeleteId !== '') {
        this.contactDeleteId = contactDeleteId
      }

      this.showContactDeleteModal = !this.showContactDeleteModal
    }
  },
  computed: {
    contacts () {
      if (this.$store.getters.contactsList !== undefined) {
        return this.$store.getters.contactsList
      }

      return []
    },
    filteredContacts () {
      if (this.search) {
        const that = this

        return this.contacts.filter(contact => {
          return contact.name.toLowerCase().includes(that.search.toLowerCase())
        })
      }

      return this.contacts
    }
  },
  mounted () {
    if (localStorage.getItem('contactsList')) {
      this.$store.commit('updateContactsList')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/atoms/buttons';
@import '../assets/atoms/input';

.home {
  height: 100vh;

  .header {
    max-width: 100vw;
    max-height: 6.25vh;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      padding: 8px 16px;
    }

    #logo {
      height: 50%;
      width: auto;
    }

    .input-icon {
      position: relative;
      display: flex;
      align-items: center;
      min-height: 100%;

      input {
        width: 72vw;
        padding: 0 8px;

        @media only screen and (max-width: 1180px) {
          width: 60vw;
        }
      }

      img {
        position: absolute;
        right: 8px;
      }
    }
  }

  .home-content-wrapper {
    display: flex;
    flex-direction: column;
    max-height: 93.75vh;
    padding: 16px;

    table {
      width: 100%;
      border-radius: 4px;
      height: auto;
      background-color: var(--white-two);
      border: solid 1px var(--white);
      border-collapse: collapse;

      th {
        padding: 16px 0;
        font-family: 'Roboto';
        font-size: 13px;
        color: var(--bluey-grey);
        width: 29%;

        &:nth-child(1) {
          width: 48px;
        }

        &:last-child {
          width: 80px;
        }
      }

      tr {
        text-align: left;
        background-color: var(--white-two);
        border: solid 1px var(--white);
        border-radius: 4px;
        font-size: 14px;
        color: var(--dark);
        transition: .5s;

        &:nth-child(1) {
          &:hover {
            background-color: var(--white-two);
          }
        }

        &:hover {
          background-color: var(--very-light-pink);
        }

        &.new-contact {
          background-color: var(--very-light-pink);
        }

        &:nth-child(8n+0) {
          span {
            background-color: #f55a5a;
          }
        }

        &:nth-child(8n+1) {
          span {
            background-color: #fa8d68;
          }
        }

        &:nth-child(8n+2) {
          span {
            background-color: var(--pale-olive-green);
          }
        }

        &:nth-child(8n+3) {
          span {
            background-color: var(--sky-blue);
          }
        }

        &:nth-child(8n+4) {
          span {
            background-color: #fab668;
          }
        }

        &:nth-child(8n+5) {
          span {
            background-color: #8368fa;
          }
        }

        &:nth-child(8n+6) {
          span {
            background-color: #fa68b5;
          }
        }

        &:nth-child(8n+7) {
          span {
            background-color: #5fe2c4;
          }
        }

        td {
          padding: 12px 0;

          &:nth-child(1) {
            display: flex;
            justify-content: center;

            span {
              height: 24px;
              width: 24px;
              border-radius: 50%;
              display: flex;
              text-align: center;
              justify-content: center;
              align-items: center;
              font-size: 16px;
              color: var(--white-two);
              text-transform: capitalize;
            }
          }
        }
      }

      .action-icons {
        img {
          height: 16px;
          width: auto;
          margin-right: 24px;

          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }

  .no-contacts-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 93.75vh;

    #book {
      width: 16.45vw;
      height: auto;
      margin-top: 10vh;
    }

    p {
      margin: 24px 0;
    }
  }
}
</style>
