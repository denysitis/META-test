import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '../i18n'
import HomeView from '../views/HomeView.vue'

const routes = [
    {
        path: '/',
        redirect: '/ua'
    },
    {
        path: '/:locale(ua|ru)',
        name: 'Layout',
        component: () => import('../layouts/MainLayout.vue'),
        children: [
            { path: '', name: 'home', component: HomeView },
            { path: 'news', name: 'news', component: () => import('../views/NewsView.vue') },
            { path: 'sport', name: 'sport', component: () => import('../views/SportView.vue') },
            { path: 'finance', name: 'finance', component: () => import('../views/FinanceView.vue') },
            { path: 'showbiz', name: 'showbiz', component: () => import('../views/ShowbizView.vue') },
            { path: 'lifestyle', name: 'lifestyle', component: () => import('../views/LifestyleView.vue') },
            { path: 'it', name: 'it', component: () => import('../views/ITView.vue') },
            { path: 'auto', name: 'auto', component: () => import('../views/AutoView.vue') }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const paramLocale = to.params.locale
    if (paramLocale) {
        if (i18n.global.locale.value !== paramLocale) {
            i18n.global.locale.value = paramLocale
        }
    }
    next()
})

export default router
