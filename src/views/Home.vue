<template>
  <div class="grid place-items-center">
    <div class="w-full p-1 max-w-xs lg:max-w-xl pt-10">
      <form class="bg-white rounded shadow-md px-8 pt-6 mb-3 border border-gray-200" @submit.prevent="login">
        <div class="mb-4">
          <label for="Email" class="text-md  font-bold text-gray-700 mb-3 block">Email</label>
          <input type="text" required v-model="email" class="leading-tight border border-gray-4000 rounded shadow-md py-3 px-2 appearance-none w-full focus:outline-none focus:shadow">
        </div>

        <div class="mb-6">
          <label for="password" class="block font-bold text-gray-700 text-md mb-3">Password</label>
          <input type="password" required v-model="password" class="w-full shadow rounded py-3 px-2 border border-gray-4000 focus:outline-none focus:shadow appearance-none"/>
           <p class="text-red-700 font-bold mt-4" v-if="errMsg">{{errMsg}}</p>
        </div>
        <div class="grid center">
          <input type="submit"  class="bg-green-400 text-xl hover:bg-green-500 font-bold text-white py-2 rounded shadow-md mb-5" value="Login"/>
        </div>
        <div class="grid place-items-center">
          <p class="text-xl font-bold mb-3">or</p>
          <h3 class="font-bold text-md lg:text-xl mb-5">Don't have an account? <span class="cursor-pointer text-green-500 hover:text-green-600 font-bold "><router-link to="/register">Register</router-link></span></h3>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {supabase} from "../supabase/supabaseConfig.js";
import Swal from 'sweetalert2';
export default {
  name:"Home",
  setup() {
    const router = useRouter();
    const email = ref("");
    const errMsg = ref("");
    const password = ref("");
    const login = async () => {
      try {
       const {error} = await supabase.auth.signIn({
         email:email.value,
         password: password.value,
       });
          Swal.fire({
            title: 'Done',
            text:   `Welcome`,
            icon: 'success',
          
        });
       if(error) throw error;
       router.push("/about");
     } catch(error) {
       errMsg.value = `Error : ${error.message}`;
       setTimeout(() => {
         errMsg.value = "";
       },2000)
     }} ;
    return {
      email,
      password,
      login,
      errMsg,
    }
}}
</script>
