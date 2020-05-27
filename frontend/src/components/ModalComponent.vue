<template lang="html">
  <div class="ui large modal" id="workDetailModal">
    <div class="header">WORK DETAIL - {{ title }}</div>
    <div class="content">
      <!-- loader -->
      <div class="ui active inverted dimmer" :class="{ hidden: hiddenLoader }">
        <div class="ui loader"></div>
      </div>
      
      <!-- work detail -->
      {{ installs }}
      {{ parts }}
      
    </div>
    <div class="actions">
      <div class="ui deny button">Cancel</div>
      <div class="ui primary button">Confirm</div>
    </div>
  </div><!-- .ui.modal -->
</template>

<script>
import mixin from '../mixin'
import mixinApi from '../mixinApi'

export default {
  mixins: [ mixin, mixinApi ],
  name: 'ModalComponent',
  props: [ 'title', 'installs', 'parts' ],
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style lang="css">
</style>