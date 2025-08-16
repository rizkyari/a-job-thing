import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/jobs' },
    { path: '/jobs', component: ()=> import('@/pages/JobList.vue') },
    { path: '/jobs/:id', component: ()=> import ('@/pages/JobDetail.vue'), props: true},
    { path: '/:pathMatch(.*)*', component: ()=> import('@/pages/NotFound.vue')},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})