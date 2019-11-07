<template>
    <nav>
        <div class="nav-wrapper blue">
            <div class="container">
                <router-link to="/" class="brand-logo left-align"><h1>File Trust</h1></router-link>
                <ul class="right">
                <li v-if="isLoggedIn"><span class="email red-text">{{currentUser}}</span></li>
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
    created() {
        if(firebase.auth().currentUser) {
            this.isLoggedIn = true;
            this.currentUser= firebase.auth().currentUser.email;
        }
    },
    methods: {
        logout: function(){
            firebase.auth().signOut().then(() => {
                this.$router.push('/login');
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
</style>