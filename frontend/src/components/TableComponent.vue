<template lang="html">
  <div id="workTable">
    <table :class="tableClass" class="ui single line">
      <thead class="center aligned">
        <tr><th rowspan="2">No.</th>
        <th rowspan="2" v-for="key in workListKey[0]">{{ key }}</th>
        <th colspan="5">Card</th>
        <th rowspan="2">Updated</th></tr>
        <tr><th v-for="key in workListKey[1]">{{ key }}</th></tr>
      </thead>
      <tbody class="center aligned">
        <tr v-for="(list, index) in workList">
          <td>{{ index+1 }}</td>
          <td>{{ list.workDate | dashYmd }}</td>
          <td><a class="link" @click="moveManagerPage(list)">{{ list.manager.name }}</a></td>
          <td><a class="link" @click="moveMemberPage(list)">{{ list.member }}</a> &nbsp;
            <i v-if="list.isRegular[0] == 'N'" class="user times icon"></i>
          </td>
          <td><a class="link" @click="showModal(list)">{{ list.workType }}</a></td>
          <td v-for="value in workListValue">{{ list[value] }}</td>
        </tr>
      </tbody>
    </table>
    
    <modal-component 
      :title="title" :installs="installs" :parts="parts" :isRegular="isRegular"
      :sales="sales" :salesHistory="salesHistory" :records="records" :loader="loader">
    </modal-component>
  </div>
</template>

<script>
import mixin from '../mixin'
import mixinApi from '../mixinApi'
import ModalComponent from './ModalComponent'

export default {
  mixins: [ mixin, mixinApi ],
  name: 'TableComponent',
  props: [ 'workList' ],
  components: { ModalComponent },
  data() {
    return {
      installs: [],
      parts: [],
      sales: [],
      salesHistory: [],
      records: [],
      isRegular: '',
      title: '',
      useProduct: [],
      loader: true,
    }
  },
  methods: {
    getWorkDetail(list) {
      this.apiGetWorkDetail(list.workId)
        .then((response) => {
          this.parts = response[1]
          this.isRegular = list.isRegular.split('/')
          
          let array = new Array()
          response[0].forEach(x => {
            x.text = this.category[x.sortThird]
            if(x.sortFirst == 3) array.push(x)
          })
          this.installs = array
        })
    },
    getSales(list) {
      this.apiGetSales(list.memberId)
        .then((response) => {
          this.sales = response[0]
          this.salesHistory = response[1]
          this.setOpen(this.sales, this.salesHistory)
        })
    },
    setOpen(sales, salesHistory) {
      sales.forEach(x => {
        if(x.isUse == 'Y') this.useProduct.push(x.productCode)
      })
      salesHistory.forEach(x => {
        if(this.useProduct.indexOf(x.productCode) != -1) x.open = true
        else x.open = false
      })
    },
    getRecords(list) {
      this.apiGetRecords(list.memberId)
        .then((response) => {
          this.records = response
        })
    },
    showModal(list) {
      this.title = list.member + '(' + list.memberId + ')'
      this.loader = false
      
      $('#workDetailModal')
        .modal({ 
          onShow:() => { 
            this.getWorkDetail(list)
            this.getSales(list)
            this.getRecords(list)
          },
          onVisible:() => { this.loader = true },
          onHidden:() => { this.clearData() },
          inverted: true
        }).modal('show')
    },
    clearData() {
      this.clearArray([this.installs, this.parts, this.sales, this.salesHistory, this.records])
    },
  }
}
</script>

<style lang="css">
#workTable {
  overflow-x: auto;
}
.link {
  color: rgba(0,0,0,.85);
  font-weight: 600;
}
.link:hover {
  color: #1e70bf;
  text-decoration: none;
  cursor: pointer;
}
.link.open {
  margin-right: 0.7em;
}
</style>