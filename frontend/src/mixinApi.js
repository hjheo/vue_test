let mixinApi = {
  data() {
    return {
      hiddenLoader: true
    }
  },
  methods: {
    apiGetWorks(date, isConfirm) {
      this.hiddenLoader = false
      return this.$http.get('/api/works', { 
          params: { workDate: date, isConfirm: isConfirm } 
        })
        .then((response) => {
          this.hiddenLoader = true
          return response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    apiGetWorkDetail(workId) {
      return this.$http.get('/api/works/work', { params: { workId: workId } })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    apiGetSales(memberId) {
      return this.$http.get('/api/works/sales', { params: { memberId: memberId } })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    apiGetSalesCount(sale) {
      return this.$http.get('/api/works/sales-count', { 
          params: { memberId: sale.memberId, productId: sale.productId, productCode: sale.productCode } 
        })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    apiGetRecords(memberId) {
      return this.$http.get('/api/works/records', { params: { memberId: memberId } })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    apiUpdateCount(params) {
      this.$http.put('/api/works/update/count', params)
        .then((response) => {
          alert('Success!')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    apiUpdateQty(params) {
      this.$http.put('/api/works/update/quantity', params)
        .then((response) => {
          alert('Success!')
        })
        .catch((error) => {
          console.log(error)
        })
    },
  }
}

export default mixinApi;