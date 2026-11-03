const baseURL= "https://localhost:7171/api/Records"

Vue.createApp({
    data() {
        return{
            records: [],
            toGetTitle: '',
            toGetArtist: '',
            toGetDuration: null,
            toGetPublicationYear: '',
            filterCriteria: ''
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
        filterRecords(filterCriteria) {
            if (this.toGetTitle != '') {
                this.FilterByTitle(filterCriteria);
            }
            else if (this.toGetArtist != '') {
                this.FilterByArtist(filterCriteria);
            }
            else if (this.toGetDuration != '') {
                this.FilterByDuration(filterCriteria);
            }
            else if (this.toGetPublicationYear != '') {
                this.FilterByPublicationYear(filterCriteria);
            }
            else {
                this.getRecords();
            }
            
            // Implement filtering logic here
        },
        FilterByTitle(title) {
            axios.get(`${baseURL}?title=${title}`)
                .then(response => {
                    this.records = response.data;
                })
                .catch(error => {
                    console.error('Error fetching records by title:', error);
                });
        },
        FilterByArtist(artist) {
            axios.get(`${baseURL}?artist=${artist}`)
                .then(response => {
                    this.records = response.data;
                })
                .catch(error => {
                    console.error('Error fetching records by artist:', error);
                });
        },
        FilterByDuration(duration) {
            axios.get(`${baseURL}?durationInSecs=${duration}`)
                .then(response => {
                    this.records = response.data;
                })
                .catch(error => {
                    console.error('Error fetching records by duration:', error);
                });
        },
        FilterByPublicationYear(publicationYear) {
            axios.get(`${baseURL}?publicationYear=${publicationYear}`)
                .then(response => {
                    this.records = response.data;
                })
                .catch(error => {
                    console.error('Error fetching records by publication year:', error);
                });
        }
    }

}).mount('#app')
