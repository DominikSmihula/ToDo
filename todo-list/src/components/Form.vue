<template>
  <v-card-text>
    <v-container>
      <form>
        <div v-if="!createNewItem">
          <v-text-field
            v-model="formData.listName"
            :error-messages="
              v$.formData.listName.$errors.map((e) => e.$message)
            "
            :counter="10"
            label="ListName"
            required
            @input="v$.formData.listName.$touch"
            @blur="v$.formData.listName.$touch"
          ></v-text-field>
        </div>

        <div v-else>
          <v-text-field
            v-model="formData.itemName"
            :error-messages="
              v$.formData.itemName.$errors.map((e) => e.$message)
            "
            label="Item Name"
            required
            @input="v$.formData.itemName.$touch"
            @blur="v$.formData.itemName.$touch"
          ></v-text-field>
          <v-textarea
            no-resize
            variant="filled"
            v-model="formData.description"
            :error-messages="
              v$.formData.description.$errors.map((e) => e.$message)
            "
            label="Description"
            required
            @input="v$.formData.description.$touch"
            @blur="v$.formData.description.$touch"
          ></v-textarea>
          <v-list-item-subtitle v-if="item" class="mt-2">
            Status of item :
            <v-select v-model="formData.status" :items="statuses" />
          </v-list-item-subtitle>
          <v-text-field
            v-model="formData.deadlineTermin"
            :error-messages="
              v$.formData.deadlineTermin.$errors.map((e) => {
                return 'Can not select past date.';
              })
            "
            label="Deadline"
            required
            type="date"
            @input="v$.formData.deadlineTermin.$touch"
            @blur="v$.formData.deadlineTermin.$touch"
          ></v-text-field>
        </div>

        <v-btn class="me-4" @click="clickHandler()"> submit </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </form>
    </v-container>
  </v-card-text>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import ApiService from "../connectors/ApiService";

export default defineComponent({
  name: "Form",
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    createNewItem: Boolean,
    item: {} as any,
  },
  watch: {
    item() {
      this.formData.itemName = this.item.title;
      this.formData.description = this.item.description;
      this.formData.deadlineTermin = this.item.deadline;
      this.formData.status = this.item.status;
    },
  },
  data() {
    return {
      statuses: ["backlog", "in progress", "done"],
      formData: {
        listName: "",
        itemName: "",
        description: "",
        deadlineTermin: "",
        status: "",
      },
    };
  },
  validations() {
    return {
      formData: {
        listName: { required, minLength: minLength(4) },
        itemName: { required, minLength: minLength(4) },
        description: { required, minLength: minLength(10) },
        deadlineTermin: {
          required,
          minValue: (value: Date) => value > new Date().toISOString(),
        },
        status: { required },
      },
    };
  },
  computed: {
    ...mapGetters(["openedItem"]),
  },
  methods: {
    ...mapMutations(["storeFetchLists"]),
    storeNewList() {
      ApiService()
        .post("http://localhost:3000/toDoLists", {
          toDolistName: this.formData.listName,
        })
        .then((result) => {
          this.storeFetchLists();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    showSnackbar() {
      this.$emit("showSnackbar");
    },
    storeNewItem() {
      return ApiService()
        .post("http://localhost:3000/toDoItems", {
          title: this.formData.itemName,
          description: this.formData.description,
          deadline: this.formData.deadlineTermin,
          listId: this.openedItem,
          status: "backlog",
        })
        .then(() => this.storeFetchLists())
        .catch((err) => {
          console.log(err);
        });
    },
    updateItem(id: string): void {
      ApiService()
        .put(`http://localhost:3000/toDoItems/${id}`, {
          title: this.formData.itemName,
          description: this.formData.description,
          deadline: this.formData.deadlineTermin,
          listId: this.item.listId,
          status: this.formData.status,
        })
        .then(() => {
          this.storeFetchLists();
          this.showSnackbar();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    storeData() {
      return this.createNewItem ? this.storeNewItem() : this.storeNewList();
    },
    clickHandler() {
      if (this.v$.$invalid) {
        if (this.item) {
          this.updateItem(this.item.id);
        } else {
          this.storeData();
          this.closeDialog();
        }
      }
    },
    clear() {
      return (this.formData = {
        listName: "",
        itemName: "",
        description: "",
        deadlineTermin: "",
        status: "",
      });
    },
  },
});
</script>


