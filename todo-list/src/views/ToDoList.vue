<template>
  <v-app>
    <div>
      <v-row class="mt-5">
        <v-col
          v-for="(category, idx) in categories"
          :key="idx"
          cols="12"
          md="3"
          offset="1"
          class="mt-10"
        >
          <v-card class="mb-3" style="text-align: center">{{
            category.name
          }}</v-card>

          <!-- <draggable
            group="list"
            v-model="items"
            @start="drag = true"
            @end="getDroppableCategory($event, category.name)"
            tag="v-card"
            item-key="id"
          >
            <template #item="{ element }"> -->
          <div v-for="(element, idx) in getFilteredItems()" :key="idx">
            <v-card
              :data-id="category.name"
              v-if="element.status == category.status"
            >
              <v-list lines="three">
                <v-list-item
                  @click.stop="
                    $router.push({
                      name: 'ItemDetails',
                      params: {
                        id: element.id,
                      },
                    })
                  "
                  :title="element.title"
                  :subtitle="element.description"
                >
                  <template v-slot:append>
                    <v-btn
                      color="grey-lighten-1"
                      icon="mdi-close"
                      variant="text"
                      @click.stop="deleteItem(element.id)"
                    ></v-btn>
                  </template>
                </v-list-item>
              </v-list>
            </v-card>
          </div>
          <!-- </template>
          </draggable> -->
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ApiService from "../connectors/ApiService";
import { mapGetters, mapMutations } from "vuex";
import { IItem } from "../interfaces/Item.interface";
//TODO draggable update status of item
// import draggable from "vuedraggable";

export default defineComponent({
  props: {
    id: {
      readonly: true,
      type: String,
    },
  },
  // components: { draggable },
  data() {
    return {
      drag: false,
      categories: [
        { name: "NOT STARTED", status: "backlog" },
        { name: "IN PROGRESS", status: "in progress" },
        { name: "DONE", status: "done" },
      ],
      items: [] as IItem[],
    };
  },
  computed: {
    ...mapGetters(["filteredItem", "filteredCategory"]),
  },
  methods: {
    ...mapMutations([
      "storeItems",
      "storeFilteredCategory",
      "storeFilteredItem",
      "storeOpenedItem",
    ]),
    // getDroppableCategory(e: any, name: any) {
    //   console.log(e);
    //   console.log(name);
    //   console.log(this.items);
    // },
    getFilteredItems(): IItem[] {
      if (this.filteredCategory) {
        console.log(this.filteredCategory);
        return this.items.filter(
          (item) => item.status == this.filteredCategory
        );
      }
      if (this.filteredItem) {
        return this.items.filter((item) => item.id == this.filteredItem);
      }
      if (this.filteredCategory && this.filteredItem) {
        return this.items.filter(
          (item) =>
            item.status == this.filteredCategory && item.id == this.filteredItem
        );
      } else {
        return this.items;
      }
    },

    getLitsItems(): void {
      ApiService()
        .get(`http://localhost:3000/toDoItems/?listId=${this.id}`)
        .then((result) => {
          this.storeItems(result);
          this.items = result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteItem(id: String): void {
      if (confirm(`Do you really want to delete this item with id ${id} ?`)) {
        ApiService()
          .delete(`http://localhost:3000/toDoItems/${id}`)
          .then((result) => {
            console.log(result);
            this.getLitsItems();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        this.getLitsItems();
        this.storeFilteredCategory("");
        this.storeFilteredItem("");
      }
    },
  },
  mounted() {
    this.storeOpenedItem(this.id);
    this.getLitsItems();
  },
});
</script>
