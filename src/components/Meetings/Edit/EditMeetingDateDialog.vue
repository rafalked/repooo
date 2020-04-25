<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <template v-slot:activator="{ on: { click } }">
            <v-btn  v-on:click="click"
                    color="orange"
                    text>
                <v-icon>mdi-calendar-range</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>
                            Edit Meeting Date
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-date-picker v-model="editableDate" style="width: 100%">
                            <template>
                                <v-card-actions>
                                <v-btn color="orange" text @click="editDialog=false">Close</v-btn>
                                <v-btn color="orange" text @click="onSaveChanges">Save</v-btn>
                                </v-card-actions>
                            </template>
                        </v-date-picker>
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
                editableDate: null
            }
        },
        methods: {
            onSaveChanges(){
                const newDate = new Date(this.meeting.date)
                const newDay = new Date(this.editableDate).getUTCDate()
                const newMonth = new Date(this.editableDate).getUTCMonth()
                const newYear = new Date(this.editableDate).getUTCFullYear()
                newDate.setUTCDate(newDay)
                newDate.setUTCMonth(newMonth)
                newDate.setUTCFullYear(newYear)
                this.$store.dispatch('updateMeetingData', {
                    id: this.meeting.id,
                    date: newDate
                })
            }
        },
        created(){
            const pickerDate = new Date(this.meeting.date)
            this.editableDate = pickerDate.getUTCFullYear() + '-' + (pickerDate.getUTCMonth() + 1) + '-' + pickerDate.getUTCDate()
        }
    }
</script>

<style scoped>

</style>
