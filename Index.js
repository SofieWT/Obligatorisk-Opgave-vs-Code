const baseURL= "https://localhost:7171/api/Records"

Vue.createApp({
    data() {
        return{
            records: [],
            toGetTitle: '',
            
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
        },
        FilterByTitle(Title) {
            const title = this.toGetTitle
            
        }
    }

}).mount('#app')
