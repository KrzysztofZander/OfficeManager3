
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
                {field: 'id', sortable:true, header: 'ID' },
                {field: 'name', sortable:true, header: 'Name' },
                {field: 'category', sortable:true, header: 'Category' },
                {field: 'category2', sortable:true, header: 'Category2' },
                {field: 'category3', sortable:true, header: 'Category3' },
                {field: 'category4', sortable:true, header: 'Category4' },
                {field: 'quantity', sortable:true, header: 'Quantity' },
                
            ],
            selectedColumns:[],
            resizedColumnTable: [],
            toogleResize:false
        }
    },
    created() {
    },
    mounted() {
        this.selectedColumns = this.columns

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
                'cacheKey': 'DocumentsPagee1ds3232',
            };
        },
    }
}
</script>

<style>

</style>
