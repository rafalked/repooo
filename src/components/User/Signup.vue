<template>
    <v-container>
        <v-layout v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed" :text ="error.message">
                </app-alert>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignup">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field name="email"
                                                      label="E-mail*"
                                                      id="email"
                                                      v-model="email"
                                                      type="email"
                                                      :rules="[emailRules, required]">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field name="password"
                                                      label="Password*"
                                                      id="password"
                                                      v-model="password"
                                                      type="password"
                                                      :rules='[required]'>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field name="confirmPassword"
                                                      label="Confirm Password*"
                                                      id="confirmPassword"
                                                      v-model="confirmPassword"
                                                      type="password"
                                                      :rules='[comparePasswords, required]'
>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn type="submit">
                                            Sign Up
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return{
                email: '',
                password: '',
                confirmPassword: '',
            }
        },
        computed: {
            comparePasswords (){
                return this.password !== this.confirmPassword ? 'Passwords do not match' : true
            },
            required(){
                return v => !!v && v.length > 0 || 'This field is required'
            },
            emailRules(){
                return v => !!v || "E-mail is required",
                    v => /.+@.+/.test(v) || "E-mail must be valid"
            },
            user (){
                return this.$store.getters.user
            },
            error (){
                return this.$store.getters.error
            },
        },
        watch:{
           user (value) {
               if(value !== null && value !== undefined){
                   this.$router.push('/')
               }
           }
        },
        methods: {
            onSignup() {
                this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
            },
            onDismissed(){
                console.log('Dismissed Alert')
                this.$store.dispatch('clearError')
            }
        }
    }
</script>

<style scoped>
    .required label::after {
        content: "*";
    }
</style>
