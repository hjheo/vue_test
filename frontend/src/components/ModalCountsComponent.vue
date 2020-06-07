<template lang="html">
  <table class="ui small single line structured very compact very basic table">
    <thead class="center aligned">
      <tr>
        <th v-for="key in countListKey">{{ key }}</th>
        <th><div class="ui small transparent input" v-for="count in countChild">
          <input type="text" v-model="count.filter" />
        </div></th>
      </tr>
    </thead>
    <tbody class="center aligned">
      <tr>
        <td v-for="value in countListValue">
          <input type="text" v-model="params[value]" @focus="selectTarget($event)" />
        </td>
        <td class="two wide">
          <div class="ui action input">
            <input type="text" v-model="paramsChild.count" @focus="selectTarget($event)" />
            <button class="ui icon button" @click="updateCount(paramsChild.count)">
              <i class="save icon"></i>
            </button>
          </div>
        </td>
        <td class="four wide" id="countTd">
          <span v-for="count in countChild">
            <input type="text" class="defaultQty" v-model="count.defaultQty" @focus="selectTarget($event)" />
            <div class="ui action input">
              <input type="text" v-model="count.overQty" @focus="selectTarget($event)" />
              <button class="ui icon button" @click="updateQty(count)">
                <i class="save icon"></i>
              </button>
            </div>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import mixin from '../mixin'

export default {
  mixins: [ mixin ],
  name: 'ModalCountsComponent',
  props: [ 'salesCount', 'params' ],
  data() {
    return {
      paramsChild: this.params,
      countChild: this.salesCount
    }
  },
  methods: {
    selectTarget(event) {
      event.target.select();
    },
    updateCount(count) {
      this.$emit('update-count', count)
    },
    updateQty(qty) {
      this.$emit('update-qty', qty)
    }
  }
}
</script>

<style lang="css">
#countTd .defaultQty {
  width: 55px !important;
}
#countTd .ui.input {
  width: 55px !important;
  margin-right: 1.5em;
}
#countTd .ui.input input {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>