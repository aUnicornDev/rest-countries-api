import {createRouter, createWebHistory } from 'vue-router'
import ListCountries from '../components/ListCountries'


const routes = [
    {
        path:'/',
        name :'ListCountries',
        component: ListCountries
    }

]

const router = createRouter({
    history : createWebHistory(process.env.BASE_URL),
    routes
})

export default router