<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h3>My Meeting</h3>
                    </v-card-title>
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://lovecoffee.pl/public/manager/images/blog/kawa-zapaorzna-przez-bariste.jpg"
                    >
                    </v-img>
                    <v-card-text>
                        <div>26.04.2020</div>
                        <div>Tu będzie tekst opisujący spotkanie</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
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
    export default {
        name: "Meetingg"
    }
</script>

<style scoped>

</style>
