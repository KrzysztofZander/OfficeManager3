
<template>
        <div class="documents-table">
            <div class="row justify-content-center " style="display: contents;" >
                <div class="card">
                    <DataTable
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Wyniki od {first} do {last} z {totalRecords}"
                        :rowsPerPageOptions="[5,10,15,20,30,50]"
                        editMode="row"
                        dataKey="id"
                        @row-edit-init="onRowEditInit"
                        @row-edit-cancel="onRowEditCancel"
                        @row-edit-save="onRowEditSave"
                        :editingRows.sync="editingRows"
                        removableSort
                        :value="filtredTableDataByMatch"
                        class="p-datatable-responsive-demo"
                        :style="'font-size:'+fontSize+'px'"
                        :resizableColumns="true"
                        :reorderableColumns="true"
                        :selection.sync="selectedProducts"
                        columnResizeMode="fit"
                        @column-resize-end="saveThisColumtSize"
                        @filter='getFiltredItems'
                        @column-reorder='columnReorder'
                        :paginator="true"
                        :rows="15"
                    >
                        <template #header>
                            <div style="text-align:left">


                                <Button icon="pi pi-cog" type="button" label="USTAWIENIA" @click="toggle" />
                                
                                
                                <OverlayPanel ref="op" :showCloseIcon="false"  :dismissable="true" >

                                            <div class="table-header-options" >
                                                <div class="table-header-options-tittle">
                                                    WYRÓWNAJ KOLUMNY
                                                </div>
                                                <div class="table-header-options-items" >
                                                    <Button class="icon-btn" @click="fitColumnsToWindowWidth"> <i class="pi pi-align-left"></i> <i class="pi pi-align-center"></i> <i class="pi pi-align-right"></i> </Button>
                                                </div>
                                                
                                            </div>
                                            <div class="table-header-options" >
                                                <div class="table-header-options-tittle">
                                                    WYRÓWNAJ KOLUMNY
                                                </div>
                                                <div class="table-header-options-items" >
                                                    <Button class="icon-btn" @click="fitColumnsToWindowWidth"> <i class="pi pi-align-left"></i> <i class="pi pi-align-center"></i> <i class="pi pi-align-right"></i> </Button>
                                                </div>
                                                
                                            </div>
                                            <!-- <div class="table-header-options" >
                                                <p> ROZMIAR CZCIONKI </p>  
                                                <Button type="button" @click="fontSize--" icon="pi pi-minus-circle" class="font-sizer" > </Button>  
                                                <p>{{ fontSize }}</p>
                                                <Button type="button" @click="fontSize++" icon="pi pi-plus-circle" class="font-sizer" > </Button> 
                                            </div> -->

                                            <MultiSelect
                                                :value="selectedColumns"
                                                :options="columnsToToggle" optionLabel="header"
                                                @input="onToggle"
                                                placeholder="Dopasuj kolumny" style="width: 20em"/>



                                </OverlayPanel>

                                <div style="float:right" >
                                        <AutoComplete type="text" ref="myAutoComplete" v-model="filters['global']"  @item-select="itemSelect" @keyup.enter="enterClicked($event)"  placeholder="Wyszukaj" :multiple="true" @clear="nowSearch=''" :suggestions="selectedTableData" @complete="searchItems( $event )" >
                                            
                                            <template #item="slotProps">
                                                <div>{{slotProps.item}}</div>
                                            </template>
                                        </AutoComplete>
                                        <Button style="float:right"  icon="pi pi-refresh" type="button" label="WYCZYŚĆ FILTRY" @click="clearFilter()" />
                                </div>
                                


                            </div>
                        </template>

                        <Column selectionMode="multiple" headerStyle="width: 2em" :key="'col_check'" :columnKey="'col_check'" > </Column>
                        
                        <Column v-for="(col, index) of selectedColumns" 
                            :headerStyle="col.headerStyle"
                            :sortable="col.sortable" 
                            :selectionMode='col.selectionMode' 
                            :field="col.field" 
                            :header="col.header" 
                            :columnKey="col.field" 
                            :key="col.field + '_' + index"
                            :rowEditor='col.rowEditor'
                            >
                            <template #editor="slotProps">
                                <InputText v-if="col.field != 'id' " v-model="slotProps.data[slotProps.column.field]"/>
                                <span v-else > {{ slotProps.data[slotProps.column.field] }} </span>
                            </template>

                        </Column>
                        <Column :rowEditor="true" headerStyle="width:7rem" bodyStyle="text-align:center" :key="'col_edit'" :columnKey="'col_edit'" >
                        </Column>
                        <Column headerStyle="width:4rem" bodyStyle="text-align:center" :key="'col_remove'" :columnKey="'col_remove'" >
                            <template #body="slotProps">
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
                            </template>
                        </Column>
                        

                        <template #paginatorLeft>
                            <Button type="button" icon="pi pi-refresh" class="p-button-text" />
                        </template>
                        <template #paginatorRight>
                            <Button type="button" icon="pi pi-cloud" class="p-button-text" />
                        </template>
                    </DataTable>
                </div>
            </div>
            <div v-if="showTheFog" class="show-me-the-fog"></div>
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
            editingRows: [],
            editingCellRows: {},
            selectedProducts:null,
            refreshRotate:0,
            filterIsActive:true,
            showTheFog:false,
            nowSearch:'',
            fontSize:14,
            tableData:[
                { id:212132 ,name: 'Bamboo Watch', category: "Nowa nazwa", quantity: 40, agre: 54406, thisYearProfit: 43342},
                { id:21,name: 'Black Watch', category: "Stara nazwa", quantity: 9, agre: 423132, thisYearProfit: 312122},
                { id:2111 ,name: 'Blue Band', category: "38", quantity: 5, agre: 12321, thisYearProfit: 8500},
                { id:21111 ,name: 'Blueadsads T-Shirt', category: "49", quantity: 22, agre: 745232, thisYearProfit: 65323},
                { id:211111 ,name: 'Browdsan Purse', category: "17", quantity: 79, agre: 643242, thisYearProfit: 500332},
                { id:2 ,name: 'Chakewra Bracelet', category: "52", quantity:  65, agre: 421132, thisYearProfit: 150005},
                { id:33 ,name: 'w Earrings', category: "82", quantity: 12, agre: 131211, thisYearProfit: 100214},
                { id:213 ,name: 'Gamed Controller', category: "44", quantity: 45, agre: 66442, thisYearProfit: 53322},
                { id:2133 ,name: 'Gaming Set', category: "90", quantity: 56, agre: 765442, thisYearProfit: 296232},
                { id:214 ,name: 'Goldsd Phone Case', category: "75", quantity: 54, agre: 21212, thisYearProfit: 12533},
                { id:2144 ,name: 'Bamboo Watch', category: "32131313", quantity: 40, agre: 54406, thisYearProfit: 43342},
                { id:21444 ,name: 'Blacdsak Watch', category: "83", quantity: 9, agre: 423132, thisYearProfit: 312122},
                { id:215 ,name: 'Blue Band', category: "38", quantity: 5, agre: 12321, thisYearProfit: 8500},
                { id:2155 ,name: 'Blue T-Shirt', category: "49", quantity: 22, agre: 745232, thisYearProfit: 65323},
                { id:21555 ,name: 'Browdsadsan Purse', category: "17", quantity: 79, agre: 643242, thisYearProfit: 500332},
                { id:216 ,name: 'Chakra Earrings', category: "82", quantity: 12, agre: 131211, thisYearProfit: 100214},
                { id:2166 ,name: 'Gameddsadsa Controller', category: "44", quantity: 45, agre: 66442, thisYearProfit: 53322},
                { id:21666 ,name: 'Gaming Set', category: "90", quantity: 56, agre: 765442, thisYearProfit: 296232},
                { id:216666 ,name: 'Gold Psdshone Case', category: "75", quantity: 54, agre: 21212, thisYearProfit: 12533},
                { id:217 ,name: 'Bamboo Watch', category: "32131313", quantity: 40, agre: 54406, thisYearProfit: 43342},
                { id:2177 ,name: 'Black dsdsdsdsWatch', category: "83", quantity: 9, agre: 423132, thisYearProfit: 312122},
                { id:21777 ,name: 'Blue Band', category: "38", quantity: 5, agre: 12321, thisYearProfit: 8500},
                { id:2431 ,name: 'Bludsewewdsdse T-Shirt', category: "49", quantity: 22, agre: 745232, thisYearProfit: 65323},
                { id:5421 ,name: 'Browdsn Purse', category: "17", quantity: 79, agre: 643242, thisYearProfit: 500332},
                { id:265561 ,name: 'Charreasdsdswewxy Earrings', category: "82", quantity: 12, agre: 131211, thisYearProfit: 100214},
                { id:256561 ,name: 'Gamreree Controller', category: "44", quantity: 45, agre: 66442, thisYearProfit: 53322},
                { id:2544531 ,name: 'Gaming Srerreet', category: "90", quantity: 56, agre: 765442, thisYearProfit: 296232},
                { id:24341 ,name: 'Gold Phone Case', category: "75", quantity: 54, agre: 21212, thisYearProfit: 12533}
            ],
            filtredTableData:[],
            filtredTableDataByMatch:[],
            selectedTableData:[],
            resizedColumnTableLength :0,
            filters:{
                global:[]
            },
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
    originalRows: null,
    created() {
        this.originalRows = {};
        this.filtredTableDataByMatch = this.tableData
    },
    mounted() {
        this.showTheFog = false
        this.refreshRotate=0,
        this.getSizeOfComulns()
        this.filtredTableData = this.tableData
        {
            this.$watch(
                () => {
                    return this.$refs.op.visible
                },
            (val) => {
                if (val == false){
                    document.getElementsByClassName('pi-cog')[0].style.transform = 'rotate('+0+'deg)'
                }

                this.showTheFog = val
            }
            )
        }
    },
    updated(){
    },
    computed:{

        columnsToToggle(){
            var col = []

            this.columns.forEach(element => {
                if( !element.lockToToggle ){
                    col.push(element)
                }
            });
            return col
        }
    },
    methods: {
        updatedTableData(){

            let values = this.filters['global']
            let keys = this.columns
            
            if( this.filterIsActive ){
                try {

                    let howManyToFind = values.length
                    
                    this.filtredTableDataByMatch = this.tableData.filter(element => {
                        let find = 0
                        
                        keys.forEach(key => {
                            
                            values.forEach(val => {
                                try {
                                    if( element[key.field].toString().toLowerCase().includes(  val.toLowerCase()  ) ){
                                        console.log( 'updatedTableDatahowManyToFind2' , find , howManyToFind )
                                        find++
                                    }
                                } catch (error) {
                                    
                                }
                                
                            });

                        });
                        console.log( 'updatedTableDatahowManyToFind3' , find , howManyToFind )

                        if( find == howManyToFind ){
                            return true
                        }else{
                            return false
                        }

                    });
                }
                catch (error) {
                }
            }
            let result = this.filtredTableDataByMatch


            

            return result
        },
        onRowEditSave(event) {
            console.log( 'onRowEditSave'  )
            this.filterIsActive = true
            
        },
        onCellEdit(newValue, props) {
            if (!this.editingCellRows[props.index]) {
                this.editingCellRows[props.index] = {...props.data};
            }
            console.log( 'onCellEdit' , this.editingCellRows[props.index][props.column.field] ,  newValue  )
            this.editingCellRows[props.index][props.column.field] = newValue;
        },
        onRowEditInit(event) {
            this.originalRows[event.index] = {...this.filtredTableDataByMatch[event.index]};
            console.log( 'onRowEditInit' , this.originalRows[event.index]  )

            this.filterIsActive = false
        },
        onRowEditCancel(event) {
            console.log( 'onRowEditCancel' , this.originalRows[event.index] )
            Vue.set(this.filtredTableDataByMatch, event.index, this.originalRows[event.index]);
            this.filterIsActive = true
        },
        clearFilter(){
            this.filters={}
            this.showMessage = true
            this.makeToast('info' , 'Wyczyszczono filtrowanie')
            this.refreshRotate+=360
            var rotate = this.refreshRotate

            document.getElementsByClassName('pi-refresh')[0].style.transition = '1s'
            document.getElementsByClassName('pi-refresh')[0].style.transform = 'rotate('+rotate+'deg)'
            

        },
        itemSelect(event){
            this.nowSearch = event.value
        },
        enterClicked(event){
            if( this.containsObject( this.nowSearch , this.filters['global']  ) == false && this.nowSearch.length > 1 ){
                this.filters.global.push( this.nowSearch )
                console.log( 'enterClicked222' ,  this.$refs.myAutoComplete  )
            }

        },
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
            // this.selectedColumns = arrayMove(this.selectedColumns, position+1, position);
        },
        onToggle(value) {

            var correct_array_to_filter = []
            var selectedColumns = []

            value.forEach(element => {
                correct_array_to_filter.push(element)
            });

            correct_array_to_filter.filter((element) => {

                if( this.containsObject( element , value ) ){
                    selectedColumns.splice( selectedColumns.length-1 , 0 , element )
                }else{
                    console.log('no')
                }

            });

            this.$emit( 'onToggle' , selectedColumns  )

        },
        toggle(event) {
            document.getElementsByClassName('pi-cog')[0].style.transition = '1s'
            document.getElementsByClassName('pi-cog')[0].style.transform = 'rotate(180deg)'


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
        searchItems(event){
            var value = event.query

            this.nowSearch = value

            

            this.selectedTableData = []

            this.columns.forEach(col => {
                var by  = col.field
            
                this.filtredTableDataByMatch.filter((element) => {

                        try {
                            console.log('SUGGESTEDLEN' ,  element[by].toString().toLowerCase().includes( value.toLowerCase() ) && this.containsObject( element[by].toString() , this.selectedTableData  ) == false )
                            if( element[by].toString().toLowerCase().includes( value.toLowerCase() ) && this.containsObject( element[by].toString() , this.selectedTableData  ) == false ){
                                this.selectedTableData.push( element[by].toString() )
                            }
                        } catch (error) {
                            
                        }
                });
            });
            
            if ( this.selectedTableData.length < 1 ){
                    this.selectedTableData = ['Nie znaleziono wyników']
            }
        },
        getSaveStateConfig() {
            return {
                'cacheKey': 'DocumentsTable1ds1342321231d23dds32sddss11'+this.pageName,
            };
        },

    },
    watch:{
        'selectedColumns': function (newVal, oldVal){
            this.getSizeOfComulns()
        },
        'toogleResize': function (newVal, OldVal) {

                this.getSizeOfComulns()

        },
        'filters.global': function (newVal, oldVal) {

                if ( newVal[ newVal.length-1  ] == 'Nie znaleziono wyników' ){
                    this.filters['global'] = oldVal
                }
                this.filtredTableDataByMatch = this.updatedTableData()
            
        }
    }
}
</script>

<style>
.show-me-the-fog{
    width: 100%;
    height: 100%;
    position: absolute;
    background: #00000029;
    top: 0;
    left: 0;
}
.icon-btn{
    cursor: pointer;
    padding: 2px;
}
.table-header-options-tittle{
    float: left;
}
.table-header-options-items{
    float: right;
}
.table-header-options{
    margin-top: 10px;
    display: flow-root;
}
.font-sizer{
    padding: 0px !important;
    margin: 0px !important;
    width: 20px !important;
    height: 20px !important;
}
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

#main-container > div > div > div > div > div > div.p-datatable-wrapper > table > thead > tr > th:nth-child(6){
    max-width: 100px !important;
}

/* 
 DATA TABLE STYLE */
 .p-datatable-resizable .p-datatable-thead > tr > th, .p-datatable-resizable .p-datatable-tfoot > tr > td, .p-datatable-resizable .p-datatable-tbody > tr > td {
    overflow: unset !important;
    padding: 2px;
    padding-left: 10px;
}
tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}
.p-overlaypanel{
    left: 15px !important;
    width: 250px;
    font-size: 13px;
    padding: 10px;
}
</style>
