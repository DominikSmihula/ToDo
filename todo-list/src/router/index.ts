import { createRouter, createWebHistory } from "vue-router";
import ToDoList from '../views/ToDoList.vue'
import ItemDetails from '../views/ItemDetails.vue'
const routes = [

  {
    path: "/todolist/:id",
    name: "List",
    component: ToDoList,
    props: true,
  },
  {
    path: "/itemdetails/:id",
    name: "ItemDetails",
    component: ItemDetails,
    props: true,
  },
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/*",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
