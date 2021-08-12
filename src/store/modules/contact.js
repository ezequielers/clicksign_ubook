export default {
  state: {
    contactsList: [],
    name: '',
    email: '',
    phone: '',
    contactId: 0
  },
  mutations: {
    addNewContact (state, contact) {
      contact.id = state.contactId
      state.contactId += 1
      state.contactsList.push(contact)
      localStorage.setItem('contactsList', JSON.stringify(state.contactsList))
    },
    updateContact (state, contactInfo) {
      const contact = {
        name: contactInfo.name,
        email: contactInfo.email,
        phone: contactInfo.phone,
        id: contactInfo.id
      }

      state.contactsList[contactInfo.arrayId] = contact
      localStorage.setItem('contactsList', JSON.stringify(state.contactsList))
    },
    deleteContact (state, contactId) {
      const index = state.contactsList.findIndex(contact => contact.id === contactId)
      state.contactsList.splice(index, 1)

      localStorage.setItem('contactsList', JSON.stringify(state.contactsList))
    },
    updateContactsList (state) {
      state.contactsList = JSON.parse(localStorage.getItem('contactsList'))
      state.contactId = state.contactsList[state.contactsList.length - 1].id + 1
    }
  },
  getters: {
    contactsList (state) {
      return state.contactsList
    }
  },
  actions: {}
}
