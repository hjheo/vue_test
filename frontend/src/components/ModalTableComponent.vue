<template lang="html">
  <div v-if="sales.length > 0" id="salesTable">
    <div class="rightAlign">
      <i class="chevron down link icon"
        :class="{ up: !salesFlag, down: salesFlag }" @click="salesOpen()"></i>
    </div>
    <table :class="tableClass" class="ui basic">
      <thead class="center aligned">
        <tr><th v-for="key in salesListKey">{{ key }}</th></tr>
      </thead>
      <tbody class="center aligned">
        <tr v-for="sale in sales" v-if="sale.isUse == 'Y'" class="positive">
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
    
    <div class="ui divider"></div>
  </div>
</template>

<script>
import mixin from '../mixin'
import mixinApi from '../mixinApi'

export default {
  mixins: [ mixin, mixinApi ],
  name: 'ModalTableComponent',
  props: [ 'sales', 'salesHistory' ],
  data() {
    return {
      salesFlag: true,
    }
  },
  methods: {
    salesOpen() {
      if(this.salesFlag == true) this.salesFlag = false
      else this.salesFlag = true
    },
  }
}
</script>

<style lang="css">
.rightAlign {
  text-align: right;
}
#salesTable {
  margin-top: 1em;
}
#salesTable table {
  margin-top: 0;
}
#salesTable table th, 
#salesTable table td {
  padding-left: 6px !important;
  padding-right: 6px !important;
}
</style>