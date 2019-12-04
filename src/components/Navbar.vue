<template>
    <nav>
        <div class="nav-wrapper light-blue darken-4">
            <div class="container">
                <ul class="left">
                    <router-link to="/" class="brand-logo left-align">File Trust</router-link>
                </ul>
                <ul class="right">
                    <li v-if="isLoggedIn"><span class="email">{{currentUser}}</span></li>
                    <li><router-link to="/">Home</router-link></li>
                    <li v-if="isLoggedIn"><router-link to="/home">Dashboard</router-link></li>
                    <li v-if="!isLoggedIn"><router-link  to="/login">Login</router-link></li>
                    <li v-if="!isLoggedIn"><router-link  to="/register">Register</router-link></li>
                    <li v-if="isLoggedIn"><button  @click="logout" class="btn grey">Logout</button></li>
                </ul>
            </div>
        
        </div>




    </nav>
</template>

<script>
import firebase from 'firebase';
export default {
    name: 'navbar',
    data() {
        return {
            isLoggedIn: false,
            currentUser: false
        };
    },
    mounted() {
        if(firebase.auth().currentUser) {
            this.isLoggedIn = true;
            this.currentUser= firebase.auth().currentUser.email;
        }
    },
    methods: {
        logout: function(){
            firebase.auth().signOut().then(() => {
                this.$router.push('/');
                this.$router.go({ path: this.$router.path});
              
            })
        }
           
        
    }
}
</script>

<style scoped>
.email {
    padding-right: 10px;
}
a:hover{
    color:white;
    text-decoration: none;
    background-color: #014d8b;
}
</style>