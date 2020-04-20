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
    export default{
        data (){
            return{
                title:'',
                location:'',
                imageUrl:'',
                description:'',
            }
        },
        computed: {
            formIsValid () {
                return this.title !== '' &&
                    this.location !== '' &&
                    this.imageUrl !== '' &&
                    this.description !== ''
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
                    date: new Date()
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

