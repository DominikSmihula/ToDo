import { MutationTree } from "vuex";
import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    filteredItem: "",
    filteredCategory: "",
    items: [],
    openedList: "",
  },
  getters: {
    filteredItem: (state) => state.filteredItem,
    filteredCategory: (state) => state.filteredCategory,
    listItems: (state) => state.items,
    openedItem: (state) => state.openedList,
  },
  mutations: <MutationTree<any>>{
    storeFilteredItem: (state, payload) => {
      return state.filteredItem = payload
    },
    storeOpenedDIalog: (state, payload) => {
      return state.dialog = payload
    },
    storeOpenedItem: (state, payload) => {
      return state.openedList = payload
    },
    storeFilteredCategory: (state, payload) => {
      return state.filteredCategory = payload
    },
    storeItems: (state, payload) => {
      return state.items = payload
    },
  },
  modules: {
  }
})


