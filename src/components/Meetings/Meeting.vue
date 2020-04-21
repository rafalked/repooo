<template>
    <v-container>
        <v-layout row wrap v-for ="meeting in meetings" :key ="meeting.id" class="mb-3">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2 >
                <v-card color="lime lighten-4">
                    <v-container fluid>
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            :src="meeting.imageUrl"
                    >
                        <v-card-title>{{meeting.title}}</v-card-title>
                    </v-img>

                    <v-card-text class="text--primary">
                        <div>{{meeting.date | date}}</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                color="orange"
                                text
                                :to="'/Meetings/' + meeting.id"
                        >
                            View meeting
                        </v-btn>
                    </v-card-actions>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        computed: {
            meetings(){
                return this.$store.getters.loadedMeetings
            }
        }
    }
</script>

<style scoped>

</style>
