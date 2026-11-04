const baseURL = "https://localhost:7171/api/Records"
const authURL = "https://localhost:7171/api/auth/login"

Vue.createApp({
    data() {
        return {
            records: [],
            toGetTitle: '',
            toGetArtist: '',
            toGetDuration: null,
            toGetPublicationYear: '',
            filterCriteria: '',
            auth: { username: "", password: "" },
            jwtToken: null,
            role: null,
            loggedIn: false,
            authMessage: '',
            newRecord: {
                title: "",
                artist: "",
                durationInSecs: null,
                publicationYear: ""
            },
            addRecordMessage: "",
        }
    },
    methods: {
        login() {
            axios.post(authURL, this.auth)
                .then(response => {
                    this.jwtToken = response.data.token;
                    this.role = response.data.role;
                    this.loggedIn = true;
                    this.authMessage = "Welcome, " + this.auth.username + " you are logged in!";
                }).catch(error => {
                    this.authMessage = "Authentication failed: " + error.response.data.message;
                });
        },
        logout() {
            this.jwtToken = '';
            this.role = '';
            this.loggedIn = false;
            this.authMessage = 'Logged out successfully.';
        },
        getRecords() {
            axios.get(baseURL, {
                headers: {
                    'Authorization': `Bearer ${this.jwtToken}`
                }
            })
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
            axios.get(`${baseURL}?title=${title}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.jwtToken}`
                    }
                })
                .then(response => {
                    this.records = response.data;
                })
                .catch(error => {
                    console.error('Error fetching records by title:', error);
                });
        },
        FilterByArtist(artist) {
            axios.get(`${baseURL}?artist=${artist}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.jwtToken}`
                    }
                })
                .then(response => {
                    this.records = response.data;
                })
                .catch(error => {
                    console.error('Error fetching records by artist:', error);
                });
        },
        FilterByDuration(duration) {
            axios.get(`${baseURL}?durationInSecs=${duration}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.jwtToken}`
                    }
                })
                .then(response => {
                    this.records = response.data;
                })
                .catch(error => {
                    console.error('Error fetching records by duration:', error);
                });
        },
        FilterByPublicationYear(publicationYear) {
            axios.get(`${baseURL}?publicationYear=${publicationYear}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.jwtToken}`
                    }
                })
                .then(response => {
                    this.records = response.data;
                })
                .catch(error => {
                    console.error('Error fetching records by publication year:', error);
                });
        },
        addRecord() {
            axios.post(baseURL, this.newRecord, {
                headers: {
                    'Authorization': `Bearer ${this.jwtToken}`
                }
            })
                .then(response => {
                    this.records.push(response.data);
                    this.addRecordMessage = 'Record added successfully.';
                    this.newRecord = { title: "", artist: "", durationInSecs: null, publicationYear: "" }; // Reset the form
                })
                .catch(error => {
                    console.error('Error adding record:', error);
                    this.addRecordMessage = 'Error adding record.';
                });
        },
        deleteRecord(recordId) {
            axios.delete(`${baseURL}/${recordId}`, {
                headers: {
                    'Authorization': `Bearer ${this.jwtToken}`
                }
            })
                .then(response => {
                    this.records = this.records.filter(record => record.id == recordId);
                })
                .catch(error => {
                    console.error('Error deleting record:', error);
                });

        }
    }

}).mount('#app')
