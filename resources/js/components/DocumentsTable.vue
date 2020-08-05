
<template>
        <div class="documents-table">
            <div class="row justify-content-center " style="display: contents;" >
                <div class="card">
                    <DataTable
                        editMode="row"
                        @row-edit-init="onRowEditInit"
                        @row-edit-cancel="onRowEditCancel"
                        :editingRows.sync="editingRows"
                        dataKey="id"
                        removableSort
                        :value="tableData"
                        class="p-datatable-responsive-demo"
                        :resizableColumns="toogleResize"
                        :reorderableColumns="true"
                        columnResizeMode="fit"
                        @column-resize-end="saveThisColumtSize"
                        :filters.sync="filters"
                        :selection.sync="selectedTableData"
                        @filter='getFiltredItems'
                        @column-reorder='columnReorder'
                        :paginator="true"
                        :rows="10"
                    >
                        <template #header>
                            <div style="text-align:left">


                                <Button icon="pi pi-cog" type="button" label="USTAWIENIA" @click="toggle" />
                                <Button  icon="pi pi-refresh" type="button" label="WYCZYŚĆ FILTRY" @click="filters={}  , makeToast('info' , 'Wyczyszczono filtrowanie') , showMessage = true" />
                                <OverlayPanel ref="op" :showCloseIcon="false" :dismissable="true">

                                    <div id="table-header-options">
                                        <div  class="table-options-row"  >

                                            <div class="table-options-row-tittle"  > SZEROKOŚĆ KOLUMN </div>

                                            <div class="teable-header-options-resizeable-column" >
                                                <Checkbox v-model="toogleResize" :binary="true" id="resizeable-check" style="float:left; margin-top: 2px" />
                                                <label for="resizeable-check"><p style="float:left; margin:0; margin-left: 15px;cursor: pointer;" > ZMIENNY ROZMIAR </p> </label>
                                                <button style="float: right; cursor: pointer;" @click="fitColumnsToWindowWidth">WYRÓWNAJ</button>
                                            </div>


                                            <div class="table-options-row-tittle"  > DOSTOSUJ KOLUMNY </div>
                                            <MultiSelect
                                                :value="selectedColumns"
                                                :options="columns" optionLabel="header"
                                                @input="onToggle"
                                                placeholder="Dopasuj kolumny" style="width: 20em"/>

                                        </div>
                                    </div>



                                </OverlayPanel>


                            </div>


                        </template>
                        <Column sortable v-for="(col, index) of selectedColumns" :field="col.field" :columnKey="col.field"   :key="col.field + '_' + index">
                                <template #header>
                                    <span style="float:left" > {{ col.header }}</span>
                                    <AutoComplete style="float: right" v-model="filters[col.field]" :placeholder="'Search by '+col.field " :suggestions="selectedTableData" @complete="searchItems( col.field , $event )" >
                                        <template #item="slotProps">
                                            <div>{{slotProps.item}}</div>
                                        </template>
                                    </AutoComplete>
                                </template>
                                <template v-if="col.field != 'id'" #editor="slotProps">
                                    <InputText  v-model="slotProps.data[slotProps.column.field]" autofocus />
                                </template>
                        </Column>
                        <Column :rowEditor="true" >
                            <template #header style="max-width:100px">
                                EDYCJA
                            </template>
                        </Column>

                    </DataTable>
                </div>
            </div>
            {{resizedColumnTableLength}}

    </div>
</template>



<script>
import saveState from 'vue-save-state';
const arrayMove = require('array-move');

export default {
    mixins: [saveState],
    props:['pageName' ,  'columns' , 'resizedColumnTable' , 'selectedColumns' , 'toogleResize'],
    data() {
        return {
            tableData:[
                { id:211 ,name: 'Bamboo Watch', category: 32131313, quantity: 40, agre: 54406, thisYearProfit: 43342},
                { id:21,name: 'Black Watch', category: 83, quantity: 9, agre: 423132, thisYearProfit: 312122},
                { id:2111 ,name: 'Blue Band', category: 38, quantity: 5, agre: 12321, thisYearProfit: 8500},
                { id:21111 ,name: 'Blueadsads T-Shirt', category: 49, quantity: 22, agre: 745232, thisYearProfit: 65323},
                { id:211111 ,name: 'Browdsan Purse', category: 17, quantity: 79, agre: 643242, thisYearProfit: 500332},
                { id:2 ,name: 'Chakewra Bracelet', category: 52, quantity:  65, agre: 421132, thisYearProfit: 150005},
                { id:33 ,name: 'w Earrings', category: 82, quantity: 12, agre: 131211, thisYearProfit: 100214},
                { id:213 ,name: 'Gamed Controller', category: 44, quantity: 45, agre: 66442, thisYearProfit: 53322},
                { id:2133 ,name: 'Gaming Set', category: 90, quantity: 56, agre: 765442, thisYearProfit: 296232},
                { id:214 ,name: 'Goldsd Phone Case', category: 75, quantity: 54, agre: 21212, thisYearProfit: 12533},
                { id:2144 ,name: 'Bamboo Watch', category: 32131313, quantity: 40, agre: 54406, thisYearProfit: 43342},
                { id:21444 ,name: 'Blacdsak Watch', category: 83, quantity: 9, agre: 423132, thisYearProfit: 312122},
                { id:215 ,name: 'Blue Band', category: 38, quantity: 5, agre: 12321, thisYearProfit: 8500},
                { id:2155 ,name: 'Blue T-Shirt', category: 49, quantity: 22, agre: 745232, thisYearProfit: 65323},
                { id:21555 ,name: 'Browdsadsan Purse', category: 17, quantity: 79, agre: 643242, thisYearProfit: 500332},
                { id:216 ,name: 'Chakra Earrings', category: 82, quantity: 12, agre: 131211, thisYearProfit: 100214},
                { id:2166 ,name: 'Gameddsadsa Controller', category: 44, quantity: 45, agre: 66442, thisYearProfit: 53322},
                { id:21666 ,name: 'Gaming Set', category: 90, quantity: 56, agre: 765442, thisYearProfit: 296232},
                { id:216666 ,name: 'Gold Psdshone Case', category: 75, quantity: 54, agre: 21212, thisYearProfit: 12533},
                { id:217 ,name: 'Bamboo Watch', category: 32131313, quantity: 40, agre: 54406, thisYearProfit: 43342},
                { id:2177 ,name: 'Black dsdsdsdsWatch', category: 83, quantity: 9, agre: 423132, thisYearProfit: 312122},
                { id:21777 ,name: 'Blue Band', category: 38, quantity: 5, agre: 12321, thisYearProfit: 8500},
                { id:21 ,name: 'Bludsewewdsdse T-Shirt', category: 49, quantity: 22, agre: 745232, thisYearProfit: 65323},
                { id:21 ,name: 'Browdsn Purse', category: 17, quantity: 79, agre: 643242, thisYearProfit: 500332},
                { id:21 ,name: 'Charreasdsdswewxy Earrings', category: 82, quantity: 12, agre: 131211, thisYearProfit: 100214},
                { id:21 ,name: 'Gamreree Controller', category: 44, quantity: 45, agre: 66442, thisYearProfit: 53322},
                { id:21 ,name: 'Gaming Srerreet', category: 90, quantity: 56, agre: 765442, thisYearProfit: 296232},
                { id:21 ,name: 'Gold Phone Case', category: 75, quantity: 54, agre: 21212, thisYearProfit: 12533}
            ],
            filtredTableData:[],
            selectedTableData:[],
            resizedColumnTableLength :0,
            filters:{},
            TableOptionsItems:[
                {
                    id:0,
                    name:'FORMATOWANIE KOLUMN'
                },
                {
                    id:1,
                    name:'WYBOR KOLUMN'
                }
            ],
            showMessage : true,
        }
    },
    created() {
        this.onToggle(selectedColumns)
        this.fitColumnsToWindowWidth()

    },
    mounted() {
        this.getSizeOfComulns()
        this.filtredTableData = this.tableData
    },
    updated(){
        this.howManyColumnsIsActive()
    },
    computed:{

    },
    methods: {
        howManyColumnsIsActive(){
            var resizedColumnTable = []

            resizedColumnTable = document.getElementsByClassName('p-resizable-column')
            console.log('howManyColumnsIsActive2', resizedColumnTable )
            this.resizedColumnTableLength = resizedColumnTable.length
            this.getSizeOfComulns()

        },
        getFiltredItems(event){
            console.log( 'getFiltredItems' , event )

            if(event.filteredValue.length <= 0 && this.showMessage){
                this.makeToast('danger', 'Nie znaleziono wyników')
                this.showMessage = false
            }
            else if(event.filteredValue.length > 0){
                this.showMessage = true
            }
            this.filtredTableData = event.filteredValue
        },
        makeToast(variant = null , message) {
            this.$bvToast.toast(message, {
            title: `Variant ${variant || 'default'}`,
            variant: variant,
            solid: true
            })
        },
        containsObject(obj, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (list[i] === obj) {
                    return true;
                }
            }

            return false;
        },
        moveElementUp(element, position){
            console.log('moveElementUp', element, position )
            this.selectedColumns = arrayMove(this.selectedColumns, position+1, position);
        },
        onToggle(value) {

            var correct_array_to_filter = []
            var selectedColumns = []

            value.forEach(element => {
                correct_array_to_filter.push(element)
            });

            correct_array_to_filter.filter((element) => {

                if( this.containsObject( element , value ) ){
                    selectedColumns.push( element )
                }else{
                    console.log('no')
                }

            });

            this.$emit( 'onToggle' , selectedColumns  )

        },
        toggle(event) {
            console.log(event)
            this.$refs.op.toggle(event);
        },
        columnReorder(event){
            console.log( 'columnReorder' , event )
        },
        saveThisColumtSize(event){


            var resizedColumnTable = document.getElementsByClassName("p-resizable-column");

            if (event != undefined){
                var element = event.element
            }else{
                var element = null
            }



            for (let index = 0; index < resizedColumnTable.length; index++) {

                if ( resizedColumnTable[resizedColumnTable.length-2] == element ){
                    console.log('ELEMENSTS')
                    this.getSizeOfComulns()
                    break
                }else{
                    console.log('NO ELEMENSTS')
                    var positionInfo = resizedColumnTable[index].getBoundingClientRect();
                    var height = positionInfo.height;
                    var width = positionInfo.width;
                    this.resizedColumnTable[index] =  `${width.toString()}px`
                }



            }

            this.$emit( 'saveThisColumtSize' , this.resizedColumnTable )
            this.$emit( 'updateToogleResize' , this.toogleResize )

        },
        getSizeOfComulns(){
            var vm = this
            setTimeout(function(){
            console.log('dsasdadsad')
            var resizedColumnTable = document.getElementsByClassName("p-resizable-column");
            console.log( vm.resizedColumnTable , vm.ii )
                for (let index = 0; index < resizedColumnTable.length; index++) {
                        console.log( vm.resizedColumnTable[index] )
                        resizedColumnTable[index].style.width = vm.resizedColumnTable[index]
                }
            console.log(resizedColumnTable)


                 }, 1);
        },
        updateToogleResize(){
            if (this.toogleResize){
                this.fitColumnsToWindowWidth()
            }
            this.toogleResize = !this.toogleResize
            this.$emit( 'updateToogleResize' , this.toogleResize )
        },
        fitColumnsToWindowWidth(){

            var resizedColumnTable = document.getElementsByClassName("p-resizable-column")

            var windowWidth = window.innerWidth
            var divideBy = resizedColumnTable.length

            var value = windowWidth/divideBy - 20


                for (let index = 0; index < resizedColumnTable.length; index++) {
                        resizedColumnTable[index].style.width = `${value.toString()}px`
                }


            resizedColumnTable[resizedColumnTable.length-1].style.width = '100px'


            this.saveThisColumtSize()
        },
        searchItems( by , event){
            var value = event.query

            this.selectedTableData = []

            console.log(  )

            this.filtredTableData.filter((element) => {
                        if( element[by].toString().toLowerCase().startsWith( value.toLowerCase() ) ){
                            console.log('yes')
                            this.selectedTableData.push( element[by].toString() )
                        }

                    });
            console.log( 'sugestedEND' , this.selectedTableData )
        },
        getSaveStateConfig() {
            return {
                'cacheKey': 'DocumentsTable4111'+this.pageName,
            };
        },

    },
    watch:{
        'selectedColumns': function (newVal, oldVal){
            this.getSizeOfComulns()
        },
        'toogleResize': function (newVal, OldVal) {

                this.getSizeOfComulns()

        }
    }
}
</script>

<style>
.items-align-center{
    text-align: center;
}

.p-overlaypanel{
    top:60px !important;


}
.p-overlaypanel-content{
    display: flow-root !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
}
.to-right{
    float: right;
    margin-top: 5px;
    margin-left: 5px;
}
.table-options-row{
    cursor: pointer;
    display: grid;
    padding-left: 5px;
    padding-right: 5px;
    margin-bottom: 2px;
    padding: 10px;
}
.table-options-row-tittle{
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: center;
    background: aliceblue;

}
.p-datatable-resizable .p-datatable-thead > tr > th, .p-datatable-resizable .p-datatable-tfoot > tr > td, .p-datatable-resizable .p-datatable-tbody > tr > td {
    overflow: unset !important;
}
.p-datatable-wrapper{
    min-height: 600px !important;
}
#main-container > div > div > div > div > div > div.p-datatable-wrapper > table > thead > tr > th:nth-child(6){
    max-width: 100px !important;
}
</style>
