<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <h3>Create new meeting</h3>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex s12>
                <form @submit.prevent="onCreateMeeting">
                    <v-layout row>
                        <v-flex s12 sm6 offset-sm3>
                            <v-text-field name="title" label ="Title" id="title" v-model="title"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field name="location" label ="Location" id="location" v-model="location"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field name="imageUrl" label ="Image URL" id="imageUrl" v-model="imageUrl"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl" height="150">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-textarea name="description" label ="Description" id="description" v-model="description"></v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <h4>Choose a Date & Time</h4>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mb-4">
                        <v-flex xs12 sm6 offset-sm3>
                            <v-date-picker v-model="date"></v-date-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-time-picker v-model="time"></v-time-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn :disabled="!formIsValid" type="submit">
                                Create meeting
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import moment from 'moment'
    export default{
        data (){
            return{
                title:'',
                location:'',
                imageUrl:'',
                description:'',
                date: new Date(),
                time: new Date(),
            }
        },
        created: function () {
            const dateTime = moment()
            this.date = dateTime.format('YYYY-MM-DD')
            this.time = dateTime.format('HH:mm')
        },
        computed: {
            formIsValid () {
                return this.title !== '' &&
                    this.location !== '' &&
                    this.imageUrl !== '' &&
                    this.description !== ''
            },
            submittableDateTime () {
                const date = new Date(this.date)
                if (typeof this.time === 'string'){
                    const hours = this.time.match(/^(\d+)/)[1]
                    const minutes = this.time.match(/:(\d+)/)[1]
                    date.setHours(hours)
                    date.setMinutes(minutes)}
                    else {
                    date.setHours(this.time.getHours())
                    date.setMinutes(this.time.getMinutes())
                     }
                return date
            }
        },

        methods: {
            onCreateMeeting() {
                if (!this.formIsValid){
                    return
                }
                const meetingData = {
                    title: this.title,
                    location: this.location,
                    imageUrl: this.imageUrl,
                    description: this.description,
                    date: this.submittableDateTime
                }
                this.$store.dispatch('createMeeting', meetingData)
                this.$router.push('/meetings')
            }
        }
    }
</script>



<style scoped>
    h3{
        text-align: center;
    }
</style>

