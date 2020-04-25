<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <template v-slot:activator="{ on: { click } }">
            <v-btn  v-on:click="click"
                    color="orange"
                    text>
                <v-icon>mdi-clock-outline</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>
                            Edit Meeting Time
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-time-picker v-model="editableTime" style="width: 100%" actions>
                            <template>
                                <v-card-actions>
                                <v-btn color="orange" text @click="editDialog=false">Close</v-btn>
                                <v-btn color="orange" text @click="onSaveChanges">Save</v-btn>
                                </v-card-actions>
                            </template>
                        </v-time-picker>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['meeting'],
        data(){
            return{
                editDialog: false,
                editableTime: null
            }
        },
        methods: {
            onSaveChanges(){
                const newDate = new Date(this.meeting.date)
                const hours = this.editableTime.match(/^(\d+)/)[1]
                const minutes = this.editableTime.match(/:(\d+)/)[1]
                newDate.setHours(hours)
                newDate.setMinutes(minutes)
                this.$store.dispatch('updateMeetingData', {
                    id: this.meeting.id,
                    date: newDate
                })
            }
        },
        created(){
            let date = new Date(this.meeting.date);
            let hours = date.getHours();
            let minutes = date.getMinutes();
            this.editableTime = hours + ":" + minutes;
        }
    }
</script>

<style scoped>

</style>
