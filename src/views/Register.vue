<template>
  <div class="grid place-items-center">
    <div class="w-full p-2 max-w-md lg:max-w-xl pt-7">
      <form @submit.prevent="register" class="bg-white rounded shadow-md px-8 pt-6 mb-3 border border-gray-200">
        <div class="mb-4">
          <label for="Email" class="text-md  font-bold text-gray-700 mb-3 block">Email</label>
          <input type="text" required v-model="email" class="leading-tight border border-gray-4000 rounded shadow-md py-3 px-2 appearance-none w-full focus:outline-none focus:shadow">
        </div>

        <div class="mb-6">
          <label for="password" class="block font-bold text-gray-700 text-md mb-3">Password</label>
          <input type="password" required v-model="password" class="w-full shadow rounded py-3 px-2 border border-gray-4000 focus:outline-none focus:shadow appearance-none"/>
        </div>

          <div class="mb-6">
          <label for="confirmPassword" class="block font-bold text-gray-700 text-md mb-3">ConfirmPassword</label>
          <input type="password" required v-model="confirmPassword" class="w-full shadow rounded py-3 px-2 border-gray-4000 border focus:outline-none focus:shadow appearance-none"/>
          <p class="text-red-700 font-bold mt-4" v-if="errMsg">{{errMsg}}</p>
        </div>
        <div class="grid center">
          <input type="submit"  class="bg-green-400 text-xl hover:bg-green-500 font-bold text-white py-2 rounded shadow-md mb-10" value="Register"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {supabase} from "../supabase/supabaseConfig.js";
import Swal from 'sweetalert2'

export default {
  name:"Register",
  setup() {
    const router = useRouter();
    const email = ref("");
    const errMsg = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const register = async () => {

       if(password.value === confirmPassword.value) {
      try {
       const {err} = await supabase.auth.signUp({
         email:email.value,
         password: password.value,
       });
      Swal.fire({
            title: 'Done',
            text:   "Confirmation link was sent to your email address",
            icon: 'success',
          
        });
       if(err) throw err;
       router.push("/about")
     } catch(err) {
       throw new err;
     } 
    } else {
        errMsg.value = "Passwords don't match";
           Swal.fire({
            title: 'Error',
            text:   "Passwords don't match",
            icon: 'error',
          
        });
        setTimeout(() => {
          errMsg.value = "";
        },2000)
      }};
    return {
      email,
      password,
      confirmPassword,
      register,
      errMsg
    }
}}
</script>
