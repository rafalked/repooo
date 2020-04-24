<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h3>{{meeting.title}}</h3>
                    </v-card-title>
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            :src="meeting.imageUrl"
                    >
                    </v-img>
                    <v-card-text>
                        <div>{{meeting.date | date}} - {{meeting.location}}</div>
                        <div>{{meeting.description}}</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <template v-if ="userIsCreator">
                            <app-edit-meeting-details-dialog></app-edit-meeting-details-dialog>
                        </template>
                        <v-btn
                                color="orange"
                                text
                        >
                            Register
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default{
        props: ['id'],
        computed: {
            meeting: function () {
                return this.$store.getters.loadedMeeting(this.id)
            },
            userIsAuthenticated () {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
            userIsCreator(){
                if (!this.userIsAuthenticated){
                    return false
                }
                return this.$store.getters.user.id === this.meeting.creatorID
            }
        }
    }
</script>
