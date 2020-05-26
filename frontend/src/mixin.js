let mixin = {
  data() {
    return {
      tableClass: 'selectable celled structured compact table',
      config: {
        wrap: true,
        dateFormat: 'Y-m-d',
        defaultDate: new Date().fp_incr(-1)
      },
    }
  },
  methods: {
    setDate() {
      let days
      if(this.$moment().weekday() != 1) days = 1
      else days = 3
      
      return this.$moment().subtract(days, 'days').format('YYYY-MM-DD')
    },
  }
}

export default mixin;