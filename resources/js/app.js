/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import ToastService from 'primevue/toastservice';
Vue.use(ToastService);


// BootstrapVue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Prime Vue Import
import OverlayPanel from 'primevue/overlaypanel';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import TabMenu from 'primevue/tabmenu';
import PanelMenu from 'primevue/panelmenu';
import MultiSelect from 'primevue/multiselect';
import Checkbox from 'primevue/checkbox';
import InputSwitch from 'primevue/inputswitch';
import MegaMenu from 'primevue/megamenu';
import AutoComplete from 'primevue/autocomplete';


// My import
import DashBoard from './components/DashBoard'
import DocumentsPage from './components/DocumentsPage'
import AgreementsPage from './components/AgreementsPage'
import HomePage from './components/HomePage'
import ToastDemo from'./components/ToastDemo'



/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// My Component
Vue.component('home-page', require('./components/HomePage.vue').default);
Vue.component('documents-table', require('./components/DocumentsTable.vue').default);
Vue.component('dashboard', require('./components/DashBoard.vue').default);
Vue.component('documents-page', require('./components/DocumentsPage.vue').default);
Vue.component('agreements-page', require('./components/AgreementsPage.vue').default);
Vue.component('toast-demo', require('./components/ToastDemo.vue').default);



// Prime Vue Component
Vue.component('InputText', InputText);
Vue.component('Button', Button);
Vue.component('Toast', Toast);
Vue.component('Card', Card);
Vue.component('OverlayPanel', OverlayPanel);
Vue.component('DataTable', DataTable);
Vue.component('Column', Column);
Vue.component('ColumnGroup', ColumnGroup);
Vue.component('TabView', TabView);
Vue.component('TabPanel', TabPanel);
Vue.component('TabMenu', TabMenu);
Vue.component('PanelMenu', PanelMenu);
Vue.component('MultiSelect', MultiSelect);
Vue.component('Checkbox' , Checkbox );
Vue.component('InputSwitch' , InputSwitch );
Vue.component('MegaMenu' , MegaMenu );
Vue.component('AutoComplete' , AutoComplete );



const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: DashBoard
        },
        {
            path: '/documents',
            name: 'documents',
            component:DocumentsPage
        },
        {
            path: '/agreement',
            name: 'agreement',
            component:ToastDemo
        },
    ],
});

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    methods:{
    }
});
