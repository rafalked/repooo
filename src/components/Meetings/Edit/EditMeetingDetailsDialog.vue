<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <template v-slot:activator="{ on: { click } }">
        <v-btn  v-on:click="click"
                color="orange"
                text
        >
            EDIT
        </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>
                            Edit Meeting
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                    name="title"
                                    label ="Title"
                                    id="title"
                                    v-model="editedTitle">
                            </v-text-field>
                            <v-textarea
                                    name="description"
                                    label ="Description"
                                    id="description"
                                    v-model="editedDescription"
                            ></v-textarea>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn text color ="orange" @click="editDialog=false">Close</v-btn>
                            <v-btn text color = "orange" @click="onSaveChanges">Save</v-btn>
                        </v-card-actions>
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
                editedTitle: this.meeting.title,
                editedDescription:this.meeting.description,
            }
        },
        methods: {
            onSaveChanges (){
                if(this.editedTitle.trim() ==='' || this.editedDescription.trim() === ''){
                    return
                }
                this.editDialog = false
                this.$store.dispatch('updateMeetingData',{
                    id: this.meeting.id,
                    title: this.editedTitle,
                    description: this.editedDescription
                })
            }
        }
    }
</script>

<style scoped>

</style>
