<template lang="html">
  <div v-if="sales.length > 0" id="salesTable">
    <div class="rightAlign">
      <i class="chevron down link icon"></i>
    </div>
    <table :class="tableClass" class="ui basic">
      <thead class="center aligned">
        <tr><th v-for="key in salesListKey">{{ key }}</th></tr>
      </thead>
      <tbody class="center aligned">
        <tr class="positive" v-for="(sale, index) in sales" v-if="sale.isUse == 'Y'">
          <td v-for="value in salesListValue[0]">{{ sale[value] }}</td>
          <td v-for="value in salesListValue[1]">{{ sale[value] }}</td>
          <td>Now</td>
        </tr>
        <tr class="negative" v-for="(sale, index) in sales" v-if="sale.isUse == 'N'">
          <td v-for="value in salesListValue[0]">{{ sale[value] }}</td>
          <td v-for="value in salesListValue[1]">{{ sale[value] }}</td>
          <td>Stop</td>
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
  props: [ 'sales' ],
  data() {
    return {
    }
  },
  methods: {
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