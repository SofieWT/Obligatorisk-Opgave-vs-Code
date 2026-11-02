const baseURL= "https://localhost:7171/api/Records"

Vue.createApp({
    data() {
        return{
            records: [],
            
        }
    },
    methods: {
        getRecords() {
            axios.get(baseURL)
                .then(response => {
                    this.records = response.data;
                })
                .catch(error => {
                    console.error('Error fetching records:', error);
                });
        }
    }

}).mount('#app')
