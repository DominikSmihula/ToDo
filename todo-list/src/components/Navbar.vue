<template>
  <nav>
    <v-app-bar app>
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer">
      </v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">ToDo</span>
        <span>list</span>
      </v-toolbar-title>
      <v-combobox
        v-if="toggler"
        class="mt-5 mr-1"
        clearable
        style="max-width: 300px"
        :items="listItems"
        v-model="selectedItem"
        item-title="title"
        item-value="id"
        density="comfortable"
        label="What item you are looking for?"
      ></v-combobox>
      <template v-slot:append>
        <v-btn
          @click="toggler = !toggler"
          variant="text"
          icon="mdi-magnify"
        ></v-btn>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" variant="text" icon="mdi-filter"></v-btn>
          </template>
          <v-card>
            <v-list nav>
              <v-list-item
                @click="storeFilteredCategory(item.status)"
                v-for="(item, index) in categories"
                :key="index"
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
        <CreateNew :addItem="true" />
      </template>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <CreateNew class="mt-3" :addItem="false" />
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.toDolistName"
          class="mt-8"
          router
          @click.stop="
            $router.push({
              name: 'List',
              params: {
                listId: link.id,
              },
            })
          "
        >
          <v-list-item-title class="white--text">
            {{ link.toDolistName }}
          </v-list-item-title>
          <template v-slot:append>
            <v-btn
              color="grey-lighten-1"
              icon="mdi-close"
              size="small"
              variant="text"
              @click.stop="deleteList(link.id)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script lang="ts">
interface ILIst {
  toDolistName: string;
  id: string;
}
import ApiService from "../connectors/ApiService";
import CreateNew from "./CreateNew.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: { CreateNew },
  data() {
    return {
      toggler: false,
      drawer: false,
      selectedItem: "",
      links: [] as ILIst[],
      categories: [
        { name: "NOT STARTED", status: "backlog" },
        { name: "IN PROGRESS", status: "in progress" },
        { name: "DONE", status: "done" },
        { name: "ALL", status: "" },
      ],
    };
  },
  watch: {
    selectedItem(newValue) {
      if (newValue) {
        this.storeFilteredItem(newValue.id);
        this.storeFilteredCategory();
      }
    },
    fetchLists() {
      this.getLitsItems();
    },
  },
  computed: {
    ...mapGetters([
      "listItems",
      "filteredItem",
      "filteredCategory",
      "fetchLists",
    ]),
  },

  methods: {
    ...mapMutations(["storeFilteredCategory", "storeFilteredItem"]),
    storedList() {
      this.$emit("storedList");
    },
    getLitsItems(): void {
      ApiService()
        .get("http://localhost:3000/toDoLists")
        .then((result) => {
          this.links = result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteList(id: String): void {
      if (confirm(`Do you really want to delete this item with id ${id} ?`)) {
        ApiService()
          .delete(`http://localhost:3000/toDoLists/${id}`)
          .then(() => {
            this.getLitsItems();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  mounted() {
    this.getLitsItems();
  },
};
</script>
