
<template>
    <div class="justify-content-center">
        <div >

            <div class="nav-bar">
                <div id="nav-bar-left">
                    <TabMenu :model="navTabs" />
                </div>
                <div id="nav-bar-right">
                        <PanelMenu :model="userTabs" />
                </div>
            </div>
            <div class="content">

                <div class="container" id="main-container">
                    <router-view />
                </div>
            </div>

        </div>
    </div>
</template>



<script>



export default {

    data() {
        return {
            userName: 'Krzysztof Zander',
			navTabs: [
                {label: 'OfficeManager', icon: 'pi pi-fw pi-home', to: '/'},
                {label: 'Dokumenty', icon: 'icon-folders', to: '/documents'},
                {label: 'Umowy', icon: 'icon-summary', to: '/agreement'},
                {label: 'Skany', icon: 'icon-documents', to: '/library'},
                {label: 'Sprzęt', icon: 'icon-desk', to: '/equipment'},
                {label: 'Użytkownicy', icon: 'icon-team', to: '/users'}
            ],
            userTabs:[
                {
                   label: 'Users',
                   icon:'pi pi-fw pi-user',
                   items: [
                      {
                         label: 'Moje Dokumenty',
                         icon:'pi pi-fw pi-folder-open',

                      },
                      {
                         label: 'Wyloguj',
                         icon:'pi pi-fw pi-power-off',
                      }
                   ]
                }
             ]
        }
    },
    productService: null,
    created() {
        this.userTabs[0].label = this.userName
    },
    mounted() {
    },
    computed:{
    },
    methods: {
    }
}
</script>

<style>
#main-container{
    min-width: 100%;
    height: 100%;
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 140px;
    overflow: auto;
}
.content{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;

}
.nav-bar{
    background: white;
    max-height: 85px;
    min-height: 85px;
    width: 100%;
    float: left;
    padding: 1%;
    box-shadow:1px 9px 12px 3px #88888826
}

#nav-bar-left{
    float: left;
}
#nav-bar-right{
    float : right;
}


</style>
