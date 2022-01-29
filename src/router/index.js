import {createRouter, createWebHistory } from 'vue-router'
import ListCountries from '../components/ListCountries'
import DetailCountry from '../components/DetailCountry'


const routes = [
    {
        path:'/',
        name :'ListCountries',
        component: ListCountries
    },
    {
        path:'/country/:id',
        name :'DetailCountry',
        component: DetailCountry,
        props:true
    }


]

const router = createRouter({
    history : createWebHistory(process.env.BASE_URL),
    routes
})

export default router