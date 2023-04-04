<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn v-if="addItem" icon="mdi-plus" block v-bind="props"> </v-btn>
        <v-btn v-else color="primary" block v-bind="props">Add list </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <v-row class="mt-2 ml-2">
            <span class="text-h5"
              >Add new ToDo {{ addItem ? "item" : "list" }}</span
            >
            <v-spacer></v-spacer>
            <v-btn class="mr-3" icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
          <Form @closeDialog="dialog = false" :createNewItem="addItem" />
        </v-card-title>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Form from "./Form.vue";
export default defineComponent({
  components: { Form },
  props: {
    addItem: {
      readonly: true,
      type: Boolean,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
});
</script>
