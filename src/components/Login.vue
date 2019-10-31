<template>
    <div>
        <div class="container">
            <dir class="row">
                <div class="col s12 m8 offset-m2">
                    
                    <div class="login card-panel red lighten-3 white-text center">
                    <h2 class="red-text">Login</h2>
                    <form>
                        <div class="form-group">
                         <label for="exampleInputEmail1 white-text">Email address</label>
                         <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                        <small id="emailHelp" class="form-texttext-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                         <label for="exampleInputPassword1">Password</label>
                         <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                        </div>
                         
                         <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                    </div>
                </div>
            </dir>
        </div>
    </div>

</template>

<script>
export default {
    name: 'login',
    data: function() {
        return{}
    }
}
</script>