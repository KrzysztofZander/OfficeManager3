
<template>
    <div>
       <documents-table
       @saveThisColumtSize="saveThisColumtSize($event)"
       @onToggle='updateSelectedColumns($event)'
       @updateToogleResize='updateToogleResize($event)'
       :columns='columns'
       pageName='documents'
       :selectedColumns='selectedColumns'
       :resizedColumnTable='resizedColumnTable'
       :toogleResize='toogleResize' >
       </documents-table>
    </div>
</template>



<script>



import saveState from 'vue-save-state';

export default {
    mixins: [saveState],

    data() {
        return {
            columns : [
                {field: 'id', header: 'ID' },
                {field: 'name', header: 'Name' },
                {field: 'category', header: 'Category' },
                {field: 'category2', header: 'Category2' },
                {field: 'category3', header: 'Category3' },
                {field: 'category4', header: 'Category4' },
                {field: 'quantity', header: 'Quantity' }
            ],
            selectedColumns:[],
            resizedColumnTable: [],
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

            console.log( 'valuee parent', updateColumns )

            this.selectedColumns = []
            updateColumns.forEach(element => {
                this.selectedColumns.push(element)
            });

            console.log( 'valuee parent2', this.selectedColumns )

        },
        updateToogleResize(updateResize){
            console.log( 'valuee updateToogleResize', updateResize )
            this.toogleResize = updateResize
        },
        saveThisColumtSize(updatedResizedColumnTable){
            this.resizedColumnTable = []
            console.log( 'valuee saveThisColumtSize', updatedResizedColumnTable )
            updatedResizedColumnTable.forEach(element => {
                this.resizedColumnTable.push(element)
            });

        },
		showSuccess() {
            console.log( this.$toast )
            this.$toast.add({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
            console.log( this.$toast )
        },
        getSaveStateConfig() {
            return {
                'cacheKey': 'DocumentsPage311111211',
            };
        },
    }
}
</script>

<style>

</style>
