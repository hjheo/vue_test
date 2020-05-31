<template lang="html">
  <div class="ui large modal" id="workDetailModal">
    <div class="header">WORK DETAIL - {{ title }}</div>
    <div class="scrolling content">
      <!-- Loader -->
      <div class="ui active inverted dimmer" :class="{ hidden: loader }">
        <div class="ui loader"></div>
      </div>
      
      <!-- Work Detail -->
      <div class="ui top attached segment">
        <div class="ui top attached label">Installs & Parts</div>
      </div>
      <div class="ui attached segment">
        <div class="ui form" v-if="installs.length > 0 || parts.length > 0">
          <!-- Check All -->
          <div class="field">
            <div class="ui checkbox" @keyup.enter="confirm">
              <input type="checkbox" id="all" v-model="checkedAll" @click="check" />
              <label for="all"><b>CHECK ALL</b></label>
            </div>
          </div>
          <!-- Installs -->
          <div class="inline field" v-for="(install, index) in installs">
            <div class="ui checkbox">
              <input type="checkbox" tabindex="0" class="hidden" 
                    :id="'install'+index" :value="install" v-model="checkedInstall" />
              <label :for="'install'+index">
                {{ install.product }}_{{ install.text }}
                <span v-if="install.price != 0">_{{ install.price }}</span>
              </label>
            </div>
          </div>
          <!-- Parts -->
          <div class="inline field" v-for="(part, index) in parts">
            <div class="ui checkbox">
              <input type="checkbox" tabindex="0" class="hidden" 
                    :id="'part'+index" :value="part" v-model="checkedPart" />
              <label :for="'part'+index">{{ part.name }}_{{ part.qty }}_{{ part.price }}</label>
            </div>
          </div>
          <!-- Result -->
          <a class="link" id="result" v-model="result" v-if="result"
            @click="copyStr($event.target)">{{ result }}</a>
        </div><!-- .ui.form -->
        
        <div class="noData" v-else>
          <h4 class="ui header"><i class="file outline icon"></i>Nothing Data</h4>
        </div>
      </div><!-- .ui.segment -->

      <!-- Sales -->
      <modal-table-component @show-details="showDetails"
        :sales="sales" :salesHistory="salesHistory" :salesCount="salesCount">
      </modal-table-component>
      
      <!-- Records -->
      <records-component :records="records"></records-component>
    </div><!-- .content -->
    
    <div class="actions">
      <div class="ui deny button" @click="clearData">Cancel</div>
      <div class="ui primary button" @click="confirm">Confirm</div>
    </div>
  </div><!-- .ui.modal -->
</template>

<script>
import mixin from '../mixin'
import mixinApi from '../mixinApi'
import ModalTableComponent from './ModalTableComponent'
import RecordsComponent from './RecordsComponent'

export default {
  mixins: [ mixin, mixinApi ],
  name: 'ModalComponent',
  props: [ 'title', 'installs', 'parts', 'isRegular', 'sales', 'salesHistory', 'records', 'loader' ],
  components: { ModalTableComponent, RecordsComponent },  
  data() {
    return {
      checkedInstall: [],
      checkedPart: [],
      checkedAll: false,
      result: '',
      salesCount: [],
    }
  },
  methods: {
    confirm() {
      this.copyStr(document.querySelector('#result'))
      alert('Copied!')
      
      $('#workDetailModal').modal({ onHide:() => { this.clearData() } })
        .modal('hide')
    },
    check() {
      this.checkedInstall = []
      this.checkedPart = []
      
      if(!this.checkedAll) {
        for(let i in this.installs) {
          this.checkedInstall.push(this.installs[i])
        }
        for(let i in this.parts) {
          this.checkedPart.push(this.parts[i])
        }
      }
    },
    setResult() {
      if(this.checkedInstall.length == 0 && this.checkedPart.length == 0) return
      
      let object = this.partObject
      let install = this.installArray
      let part = []
      
      if(install.length > 0) {
        let array = [object.name, object.price]
                      .filter((val) => { return val != 0 && val != '' }).join('_')
        if(!array) part = array
        else part = '_'+array
      } else {
        part = this.isRegular[1]+this.isRegular[2]+'_'+Object.values(object).join('_')
      }
      this.result = install.join(', ')+part
    },
    clearData() {
      this.clearChecked()
      this.salesCount.length = 0
    },
    clearChecked() {
      this.clearObject(this.partObject)
      this.clearArray([this.installArray, this.checkedInstall, this.checkedPart])
      this.checkedAll = false
      this.result = ''
    },
    showDetails(sale) {
      this.apiGetSalesCount(sale)
        .then((response) => {
          this.salesCount = response
        })
    },
  },
  computed: {
    installArray() {
      let installArray = new Array()
      let regular = this.isRegular
      
      this.checkedInstall.forEach(x => {
        let array
        if(x.sortThird == '3A' || x.sortThird == '3B') {
          if(regular[0] == 'Y') array = [regular[1]+x.text, x.product, x.price]
          else array = [x.text+regular[1], x.product]
        } else {
          array = [x.product, x.text, x.price]
        }
        installArray.push(array.filter((val) => { return val != 0 }).join('_'))
      })
      return installArray
    },
    partObject() {
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      let name = new Array()
      let qty = new Array()
      let price = new Array()
      
      this.checkedPart.forEach(x => {
        name.push(x.name.replace(/\s/gi, ''))
        qty.push(Number(x.qty))
        price.push(Number(x.qty)*Number(x.price))
      })
      return { name: name.join(','), qty: qty.reduce(reducer,0), price: price.reduce(reducer,0) }
    },
  },
  watch: {
    checkedInstall() {
      this.setResult()
    },
    checkedPart() {
      this.setResult()
    },
    checkedAll() {
      if(this.checkedAll == false) this.result = ''
    }
  }
}
</script>

<style lang="css">
.noData {
  display: flex;
  height: 45px;
  text-align: center;
  justify-content: center;
  flex-direction: column;
}
</style>