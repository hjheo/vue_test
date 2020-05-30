<template lang="html">
  <div id="records">
    <div class="ui top attached segment">
      <div class="ui top attached label">Records</div>
    </div>
    <div class="ui attached segment records">
      <div v-for="record in records">
        <b>[{{ record.date | dashYmd }}]</b> {{ record.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecordsComponent',
  props: [ 'records' ]
}
</script>

<style lang="css">
#records {
  margin-top: 1em;
}
#records .records {
  line-height: 1.7em;
}
#records .records b {
  margin-right: 0.4em;
}
</style>