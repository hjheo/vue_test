<template lang="html">
  <div id="workPage">
    <!-- Loader -->
    <div class="ui active inverted dimmer" :class="{ hidden: hiddenLoader }">
      <div class="ui loader"></div>
    </div>
    
    <div class="ui form">
      <div class="inline fields">
        <!-- Calender -->
        <div class="field">
          <div class="ui left icon input">
            <flat-pickr v-model="date" :config="config"></flat-pickr>
            <i class="calendar alternate icon"></i>
          </div>
        </div>
        <!-- Radio Button -->
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" id="no" value="0" v-model="isConfirm">
            <label for="no">Not Confirm</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" id="yes" value="1" v-model="isConfirm">
            <label for="yes">Confirmed</label>
          </div>
        </div>
        <!-- Refresh -->
        <div class="field">
          <a class="ui teal icon circular large label" @click="refresh">
            <i class="sync icon"></i>
          </a>
        </div>
      </div><!-- .inline.fields -->
    </div><!-- .ui.form -->
    
    <table-component :workList="workList"></table-component>
    <div class="ui divider"></div>
  </div>
</template>

<script>
import mixin from '../mixin'
import mixinApi from '../mixinApi'
import TableComponent from './TableComponent'

export default {
  mixins: [ mixin, mixinApi ],
  name: 'WorkPage',
  components: { TableComponent },
  data() {
    return {
      date: null,
      workList: [],
      isConfirm: 0
    }
  },
  created() {
    this.date = this.setDate()
  },
  mounted() {
    this.getWorks(this.date)
  },
  methods: {
    getWorks(date) {
      this.apiGetWorks(this.date, this.isConfirm)
        .then((response) => {
          this.workList = this.splitData(response)
        })
    },
    splitData(data) {
      let array = new Array()
      for(let i in data) {
        let split = data[i].manager.split('/')
        let object = { secondCode: split[0], firstCode: split[1], area: split[2], name: split[3] }
        array.push(object)
        data[i].manager = array[i]
      }
      return data
    },
    refresh() {
      this.getWorks(this.date)
    }
  },
  watch: {
    date() {
      this.getWorks(this.date)
    },
    isConfirm() {
      this.getWorks(this.date)
    }
  }
}
</script>

<style lang="css">
#workPage {
  margin-left: 40px;
  margin-right: 40px;
  text-align: left;
}
.ui.checkbox label:hover {
  cursor: pointer;
}
.hidden {
  display: none !important;
}
</style>