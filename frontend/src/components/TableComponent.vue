<template lang="html">
  <div id="tableComponent">
    <table :class="tableClass" class="ui single line">
      <thead class="center aligned">
        <tr><th rowspan="2">No.</th>
        <th rowspan="2" v-for="key in workListKey[0]">{{ key }}</th>
        <th colspan="5">Card</th>
        <th rowspan="2">Update</th></tr>
        <tr><th v-for="key in workListKey[1]">{{ key }}</th></tr>
      </thead>
      <tbody class="center aligned">
        <tr v-for="(list, index) in workList">
          <td>{{ index+1 }}</td>
          <td>{{ list.workDate | dashYmd }}</td>
          <td><a class="link">{{ list.manager.name }}</a></td>
          <td><a class="link">{{ list.member }}</a> &nbsp;
            <i v-if="!list.isRegular" class="user times icon"></i>
          </td>
          <td><a class="link">{{ list.workType }}</a></td>
          <td v-for="value in workListValue">{{ list[value] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import mixin from '../mixin'
import mixinApi from '../mixinApi'

export default {
  mixins: [ mixin, mixinApi ],
  name: 'TableComponent',
  props: [ 'workList' ],
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="css">
#tableComponent {
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