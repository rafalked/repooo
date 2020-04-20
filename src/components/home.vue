<template>
    <v-container>
        <v-layout row wrap class>
            <v-flex xs12 sm6 class="text-center text-sm-right">
                <v-btn large router to ="/meetings" color="lime lighten-4">Explore Meetings</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-center text-sm-left">
                <v-btn large router to ="/Meetings/CreateMeeting" color="lime lighten-4">Organize Meeting</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
            <v-flex xs12>
                <v-carousel style="cursor:pointer">
                    <v-carousel-item
                            v-for="meeting in meetings"
                            :key="meeting.id"
                            :src="meeting.imageUrl"
                            reverse-transition="fade-transition"
                            transition="fade-transition"
                            @click.native="onLoadMeeting(meeting.id)">
                        <div class ="title">
                            {{meeting.title}}
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        computed: {
            meetings: function () {
                return this.$store.getters.featuredMeetings
            }
        },
        methods: {
            onLoadMeeting(id){
                this.$router.push('/meetings/' + id);

            }
        }
    }
</script>

<style scoped>
    .title{
        text-align: center;
        bottom: 50px;
        background-color: rgba(0, 0, 0, 0.3);
        color: white;
        font-size: 2em;
        padding: 20px;
        text-align: center;
    }
</style>
