<template>
    <div>
        <div class="container">
            <dir class="row">
                <div class="col s12 m8 offset-m2">
                    <div class="login card-panel grey lighten-4 black-text center">
                    <h2>login</h2>
                    <form>
                        <div class="input-field">
                            <i class="material-icons prefix">email</i>
                            <input type="text" id="email" v-model="email">
                            <label for="email">Email</label>
                        </div>
                        <div class="input-field">
                            <i class="material-icons prefix">lock</i>
                            <input type="password" id="password" v-model="password">
                            <label for="password">Password</label>
                        </div>
                        <button @click="login" class="btn btn-large grey lighten-4 black-text">login</button>
                    </form>
                    </div>
                </div>
            </dir>
        </div>
    </div>

</template>

<script>
import firebase from 'firebase';
export default {
    name: 'login',
    data: function() {
        return{
            email: '',
            password: ''
        };
    },
    methods: {
        login: function(e){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
                alert (`You are login as ${user.user.email}`);
                this.$router.push('/');
                this.$router.go({ path: this.$router.path});
               
                
            },
            err => {
                alert(err.message);
            });
            e.preventDefault();
        }
    }
}
</script>