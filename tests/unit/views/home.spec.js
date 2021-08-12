import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Home from '@/views/Home.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Home.vue', () => {
  describe('listing without any contact', () => {
    const store = new Vuex.Store({
      state: {
        contactsList: []
      }
    })

    const wrapper = mount(Home, {
      store,
      localVue
    })

    it('matchs snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('has a logo', () => {
      expect(wrapper.findAll('img#logo').length).toEqual(1)
    })

    it('has a search bar', () => {
      expect(wrapper.findAll('input[name=search]').length).toEqual(1)
    })

    it('has a message about no contacts created', () => {
      expect(wrapper.findAll('img#book').length).toEqual(1)
      expect(wrapper.find('p').text()).toEqual('Nenhum contato foi criado ainda.')
    })

    it('has a button to add new contacts', () => {
      expect(wrapper.findAll('button[name=criar-contato]').length).toEqual(1)
      expect(wrapper.find('button[name=criar-contato]').text()).toEqual('Criar contato')
    })

    it('shows a modal if add contact button was clicked', async () => {
      expect(wrapper.vm.showNewContactModal).toBe(false)

      wrapper.find('button[name=criar-contato]').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.showNewContactModal).toBe(true)
      expect(wrapper.findAll('.modal-wrapper').exists()).toBe(true)
    })
  })

  describe('listing with contacts', () => {
    const store = new Vuex.Store({
      state: {
        contactsList: [
          {
            email: 'eequiel@email.com',
            name: 'Ezequiel Schneider',
            phone: '999999999',
            id: 0
          },
          {
            email: 'cliente@clicksign.com',
            name: 'ClickSign',
            phone: '999999999',
            id: 1
          }
        ]
      },

      getters: {
        contactsList: (state) => state.contactsList
      }
    })

    const wrapper = mount(Home, {
      store,
      localVue
    })

    it('matchs snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('has a table using a real Vuex store', () => {
      expect(wrapper.findAll('table').length).toBe(1)
    })

    it('has a table with three rows using a real Vuex store', () => {
      expect(wrapper.findAll('tr').length).toBe(3)

      const firstRow = wrapper.findAll('tr').at(1)
      const secondRow = wrapper.findAll('tr').at(2)

      expect(firstRow.findAll('td').at(1).text()).toEqual('Ezequiel Schneider')
      expect(secondRow.findAll('td').at(1).text()).toEqual('ClickSign')
    })

    it('shows a modal if edit contact icon was clicked', async () => {
      expect(wrapper.vm.showNewContactModal).toBe(false)

      wrapper.find('img[alt="A pencil icon"]').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.showNewContactModal).toBe(true)
      expect(wrapper.findAll('.modal-wrapper').exists()).toBe(true)
    })

    it('shows a modal if delete contact icon was clicked', async () => {
      expect(wrapper.vm.showContactDeleteModal).toBe(false)

      wrapper.find('img[alt="A trash can icon"]').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.showContactDeleteModal).toBe(true)
      expect(wrapper.findAll('.modal-wrapper').exists()).toBe(true)
    })
  })
})
