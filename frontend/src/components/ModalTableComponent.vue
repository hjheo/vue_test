<template lang="html">
  <div v-if="sales.length > 0" id="salesTable">
    <div class="ui top attached segment">
      <div class="ui top attached label">Sales ({{ sales.length }} / {{ salesHistory.length }})
        <i class="chevron down link icon"
          :class="{ up: !salesFlag, down: salesFlag }" @click="salesOpen()"></i>
      </div>
    </div>
    <div class="ui attached segment">
      <!-- Table -->
      <table :class="tableClass" class="ui very basic small">
        <thead class="center aligned">
          <tr><th v-for="key in salesListKey">{{ key }}</th></tr>
        </thead>
        <tbody class="center aligned" id="test">
          <tr v-for="sale in sales" v-if="sale.isUse == 'Y'" class="positive"
            @click="showDetails(sale)">
            <td v-for="value in salesListValue">{{ sale[value] }}</td>
            <td>Now</td>
          </tr>
          <tr v-for="sales in salesHistory" v-if="sales.open" :class="{ negative: sales.isUse == 'N' }">
            <td v-for="value in salesListValue">{{ sales[value] }}</td>
            <td class="single line">
              <div v-if="sales.isUse == 'Y'">Done</div>
              <div v-else>Stop</div>
            </td>
          </tr>
          <tr v-for="sale in sales" v-if="sale.isUse == 'N'" class="negative" :class="{ hidden: salesFlag }">
            <td v-for="value in salesListValue">{{ sale[value] }}</td>
            <td>Stop</td>
          </tr>
          <tr v-for="sales in salesHistory" v-if="!sales.open" 
            :class="{ negative: sales.isUse == 'N', warning: sales.isUse == 'Y', hidden: salesFlag }">
            <td v-for="value in salesListValue">{{ sales[value] }}</td>
            <td class="single line">
              <div v-if="sales.isUse == 'Y'">Done</div>
              <div v-else>Stop</div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="ui form" v-if="salesCount.length > 0" id="salesCountTable">
        <modal-counts :salesCount="salesCount" :params="params"
          @update-count="updateCount" @update-qty="updateQty">
        </modal-counts>
      </div><!-- .ui.form -->
    
    </div><!-- .ui.attached.segment -->
  </div>
</template>

<script>
import mixin from '../mixin'
import mixinApi from '../mixinApi'
import ModalCounts from './ModalCountsComponent'

export default {
  mixins: [ mixin, mixinApi ],
  name: 'ModalTableComponent',
  props: [ 'sales', 'salesHistory', 'salesCount' ],
  components: { ModalCounts },
  data() {
    return {
      salesFlag: true,
      params: []
    }
  },
  methods: {
    salesOpen() {
      if(this.salesFlag == true) this.salesFlag = false
      else this.salesFlag = true
    },
    showDetails(sale) {
      this.$emit('show-details', sale)
      
      this.params = { 
        memberId: sale.memberId,
        productId: sale.productId,
        productCode: sale.productCode,
        count: sale.count+1
      }
    },
    updateCount(count) {
      this.$emit('update-count', count)
      
      this.params.count = count
      if(confirm(this.alertMessage+'Count Update?')) { 
        this.apiUpdateCount(this.params)
      } else { 
        // do nothing
      }
    },
    updateQty(qty) {
      this.$emit('update-qty', qty)
      
      let params = this.params
      delete params.count
      params.filter = qty.filter
      params.defaultQty = Number(qty.defaultQty)
      params.overQty = Number(qty.overQty)
      
      if(confirm(this.alertMessage+'Qty Update?')) {
        this.apiUpdateQty(params)
      } else {
        // do nothing
      }
    },
  }
}
</script>

<style lang="css">
/* Sales Table */
#salesTable {
  margin-top: 1em;
}
#salesTable .ui.top.attached.segment i {
  float: right;
  margin-right: 0;
}
#salesTable .ui.attached.segment:not(.top) {
  padding: 1em 0.5em 0.5em 0.5em;
}
#salesTable table th, 
#salesTable table td {
  padding-left: 6px !important;
  padding-right: 6px !important;
}
#salesTable table th:last-child, 
#salesTable table td:last-child {
  border-right: none;
}
/* SalesCounts Table */
#salesCountTable {
  margin-top: 1em;
}
#salesCountTable th {
  padding-bottom: 0.3em !important;
}
#salesCountTable input {
  text-align: center;
}
#salesCountTable th input {
  width: 128px !important;
  margin-right: 0.3em !important;
  font-weight: 700;
}
#salesCountTable .inline.fields {
  margin-bottom: 0 !important;
}
#salesCountTable .ui.action.input input {
  width: 80% !important;
}
#salesCountTable .ui.action.input button {
  padding: 6px;
}
</style>