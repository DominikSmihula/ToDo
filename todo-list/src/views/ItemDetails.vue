<template>
  <v-container>
    <v-card class="mt-10">
      <v-row>
        <v-col>
          <Form
            @showSnackbar="snackbar = true"
            :createNewItem="true"
            :item="item"
          ></Form>
        </v-col>
      </v-row>
    </v-card>
    <v-snackbar v-model="snackbar">
      Successfuly updated item!
      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ApiService from "../connectors/ApiService";
import Form from "../components/Form.vue";
import { IItem } from "../interfaces/Item.interface";
export default defineComponent({
  props: {
    id: {
      readonly: true,
      type: String,
    },
  },
  components: { Form },
  data() {
    return {
      snackbar: false,
      item: {} as IItem,
    };
  },
  methods: {
    getLitsItems(): void {
      ApiService()
        .get(`http://localhost:3000/toDoItems/${this.id}`)
        .then((result) => {
          this.item = result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateItem(): void {
      ApiService()
        .put(`http://localhost:3000/toDoItems/${this.id}`, this.item)
        .then((result) => {
          this.snackbar = true;
          this.item = result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getLitsItems();
  },
});
</script>
