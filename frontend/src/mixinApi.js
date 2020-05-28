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
      this.hiddenLoader = false
      return this.$http.get('/api/works/work', { params: { workId: workId } })
        .then((response) => {
          this.hiddenLoader = true
          return response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    apiGetSales(memberId) {
      this.hiddenLoader = false
      return this.$http.get('/api/works/sale', { params: { memberId: memberId } })
        .then((response) => {
          this.hiddenLoader = true
          return response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
  }
}

export default mixinApi;