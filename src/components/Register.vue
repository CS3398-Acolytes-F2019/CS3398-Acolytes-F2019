<template>
    <div>
            <!-- <dir class="row">
                <div class="col s12 m8 offset-m2">
                    
                    <div class="login card-panel red lighten-3 white-text center">
                    <h2 class="red-text">Register</h2>
                    <form>
                        <div class="form-group">
                         <label for="exampleInputEmail1 white-text">Email address</label>
                         <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                        <small id="emailHelp" class="form-texttext-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                         <label for="exampleInputPassword1">Password</label>
                         <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                        </div>
                         
                         <button type="submit" @click="register" class="btn btn-primary">Submit</button>
                    </form>
                    </div>
                </div>
            </dir>
        </div> -->

        <br />
        <br />
        <div class="container">
            <div class="row"></div>
            <div class="row"></div>
            <div class="card-deck mb-3">
                <div class="card mb-4 box-shadow">
                    <div class="card-header text-center">
                        <h4 class="my-0 font-weight-normal">Register</h4>
                    </div>
                    <div class="card-body">
                        <progress-circle class="text-center"></progress-circle>
                        <br />
                        <form>
                            <div class="input-field">
                                <i class="material-icons prefix">email</i>
                                <input type="text" id="email" v-model="email" class="form-control" />
                                <label for="email">Email</label>
                            </div>
                            <div class="input-field">
                                <i class="material-icons prefix">lock</i>
                                <input type="password" id="password" class="form-control" v-model="password" />
                                <label for="password">Password</label>
                            </div>

                            <br />
                            <div class="text-center">
                                <button @click="register" class="btn btn-primary lighten-4">Login</button>
                            </div>
                        </form>
                        <br />
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import firebase from 'firebase';

export default {
    name: 'register',
    data: function() {
        return{
            email: '',
            password: ''
        };
    },
    methods: {
        register: function(e){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(user => {
                this.$router.push('/upload-Auth');
                this.$router.go({ path: this.$router.path});
                
            },
            err => {
            });
            e.preventDefault();
        }
    }
}
</script>

<style scoped>
html {
    font-size: 14px;
}
@media (min-width: 768px) {
    html {
        font-size: 16px;
    }
}

.container {
    max-width: 425px;
}

.share-header {
    max-width: 700px;
}

.card-deck .card {
    min-width: 220px;
}

.border-top {
    border-top: 1px solid #e5e5e5;
}
.border-bottom {
    border-bottom: 1px solid #e5e5e5;
}

.box-shadow {
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
}
</style>