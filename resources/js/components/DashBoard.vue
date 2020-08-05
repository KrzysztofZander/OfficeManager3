
<template>
        <div class="row justify-content-md-center align-items-center" style="height:100%; width:77%; margin:auto">
            <div v-for="panel in panels" v-bind:key="panel.id"
            class="panel-brick"  >
                <div class="panel-bric-icon" > <i :class="panel.icon" ></i> </div>
                <p class="panel-brick-tittle "> {{ panel.name }} </p>
            </div>
        </div>
</template>



<script>


export default {

    data() {
        return {
            panels:[
                {
                    id:1,
                    name:'Dokumenty',
                    icon:'icon-folders'
                },
                {
                    id:2,
                    name:'Umowy',
                    icon:'icon-summary'
                },
                {
                    id:5,
                    name:'Skany',
                    icon:'icon-documents'
                },
                {
                    id:3,
                    name:'Sprzęt',
                    icon:'icon-desk'
                },
                {
                    id:4,
                    name:'Użytkownicy',
                    icon:'icon-team'
                }

            ]
        }
    },
    productService: null,
    created() {
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style>
@import "~primevue/resources/primevue.css";
@import "~primevue/resources/themes/nova/theme.css";
@import "~primeicons/primeicons.css";
@import "~primeflex/primeflex.css";

.login-panel{
    background-color: #101010;
    width: 98vw;
}
.panel-brick{
    /* cursor: pointer;
    text-align: center;
    border: white;
    border-style: solid;*/
    margin: 10px;
    -webkit-box-shadow: 0 0 27px 0 #007ad91f;
    box-shadow: 0 0 27px 0 #007ad91f;
    transition: 0.5s;
    border-radius: 13px;
    cursor: pointer;
    min-width: 270px;
    min-height: 270px;

}

.panel-bric-icon{
    font-size: 130px;
    color: #007ad9;
    text-align: center;
}
.panel-brick-tittle{
    font-size: 25px;
    font-weight: 700;
    text-align: center;
}
.panel-brick:hover{
    box-shadow: 0px -1px 20px 11px #007ad926;
    transform: scale(1.05);
    transition: 0.5s;
}
.justify-content-md-center {
    justify-content: center
}
@media (min-width: 768px){
.justify-content-md-center {
    -webkit-box-pack: center!important;
    justify-content: center!important;
    margin-top: 10% !important;

}
}
@media (min-width: 767px){
.justify-content-md-center {
    -webkit-box-pack: center!important;
    justify-content: center!important;
    margin-top: 0% !important;
}
}


</style>
