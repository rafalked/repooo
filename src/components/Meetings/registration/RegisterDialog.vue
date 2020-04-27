<template>
    <v-dialog persistent v-model="registerDialog">
        <template v-slot:activator="{ on: { click } }">
            <v-btn  v-on:click="click"
                    color="orange"
                    text>
                {{userIsRegistered ? 'Unregister' : 'Register'}}
            </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title v-if="userIsRegistered">
                            Unregister from Meeting?
                        </v-card-title>
                        <v-card-title v-else>
                            Register for Meeting?
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>You can always change your decision later on</v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn color = "red" text @click = "registerDialog = false">Cancel</v-btn>
                            <v-btn color = "green" text @click = "onAgree">Confirm</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>

            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['meetingId'],
        data () {
            return{
                registerDialog: false
            }
        },
        computed: {
            userIsRegistered(){
                return this.$store.getters.user.registeredMeetings.findIndex(meetingId=>{
                    return meetingId === this.meetingId
                }) >=0
            }
        },
        methods: {
            onAgree(){
                if (this.userIsRegistered){
                    this.$store.dispatch('unregisterUserFromMeeting', this.meetingId)
                } else {
                    this.$store.dispatch('registerUserForMeeting', this.meetingId)
                }

            }
        }
    }
</script>

<style scoped>

</style>
