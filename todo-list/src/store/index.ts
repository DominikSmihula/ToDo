import { MutationTree } from "vuex";
import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    filteredItem: "",
    filteredCategory: "",
    items: [],
    openedList: "",
    fetchLists: false
  },
  getters: {
    filteredItem: (state) => state.filteredItem,
    filteredCategory: (state) => state.filteredCategory,
    listItems: (state) => state.items,
    openedItem: (state) => state.openedList,
    fetchLists: (state) => state.fetchLists
  },
  mutations: <MutationTree<any>>{
    storeFilteredItem: (state) => {
      return !state.filteredItem
    },
    storeFetchLists: (state, payload) => {
      return state.fetchLists = payload
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


