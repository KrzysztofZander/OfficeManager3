
<template>
    <div>
    </div>
</template>



<script>



import saveState from 'vue-save-state';

export default {
    mixins: [saveState],

    data() {
        return {
            columns : [
                {field: 'name', header: 'Name' },
                {field: 'agre', header: 'Agre' , delta:0},
            ],
            resizedColumnTable: [],
            selectedColumns : [],
            toogleResize:false
        }
    },
    created() {
    },
    mounted() {
    },
    computed:{
    },
    methods: {
        updateSelectedColumns( updateColumns ){

            this.selectedColumns = []
            updateColumns.forEach(element => {
                this.selectedColumns.push(element)
            });

        },
        saveThisColumtSize(updatedResizedColumnTable){
            this.resizedColumnTable = []
            console.log( updatedResizedColumnTable.length )
            updatedResizedColumnTable.forEach(element => {
                this.resizedColumnTable.push(element)
            });

        },
        getSaveStateConfig() {
            return {
                'cacheKey': 'AgreementsPage1',
            };
        },
    }
}
</script>

<style>

</style>
