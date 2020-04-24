<template>
    <v-dialog width="350px" persistent>

        <v-btn  v-slot:activator
                color="orange"
                text
        >
            EDIT
        </v-btn>
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
                        Content
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "EditMeetingDetailsDialog"
    }
</script>

<style scoped>

</style>
