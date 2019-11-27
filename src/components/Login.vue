<template>
    <div class="login">
        <!-- <div class="container">
            <dir class="row">
                <div class="col s12 m8 offset-m2">
                    <div class="login card-panel grey lighten-4 black-text center">
                        <h2>login</h2>
                        <form>
                            <div class="input-field">
                                <i class="material-icons prefix">email</i>
                                <input type="text" id="email" v-model="email" />
                                <label for="email">Email</label>
                            </div>
                            <div class="input-field">
                                <i class="material-icons prefix">lock</i>
                                <input type="password" id="password" v-model="password" />
                                <label for="password">Password</label>
                            </div>
                            <button
                                @click="login"
                                class="btn btn-large grey lighten-4 black-text"
                            >login</button>
                        </form>
                    </div>
                </div>
            </dir>
        </div>-->

        <br />
        <br />
        <div class="container">
            <div class="row"></div>
            <div class="row"></div>
            <div class="card-deck mb-3">
                <div class="card mb-4 box-shadow">
                    <div class="card-header text-center">
                        <h4 class="my-0 font-weight-normal">Login</h4>
                    </div>
                    <div class="card-body">
                        <progress-circle class="text-center"></progress-circle>
                        <br />
                        <form>
                            <div class="input-field">
                                <i class="material-icons prefix">email</i>
                                <input type="text" id="email" v-model="email" />
                                <label for="email">Email</label>
                            </div>
                            <div class="input-field">
                                <i class="material-icons prefix">lock</i>
                                <input type="password" id="password" v-model="password" />
                                <label for="password">Password</label>
                            </div>

                            <br />
                            <div class="text-center">
                                <button @click="login" class="btn btn-primary lighten-4">Login</button>
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
    name: 'login',
    data: function ()    {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login: function (e)        {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(user =>                {
                    alert(`You are logged as ${ user.user.email }`);
                    this.$router.push('/');
                    this.$router.go({ path: this.$router.path });


                },
                    err =>                    {
                        alert(err.message);
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