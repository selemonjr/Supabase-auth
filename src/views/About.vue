<template>
  <div class="grid place-items-center center">
    <h1 class="font-bold lg:text-xl text-md lg:p-0 pl-10 block text-gray-700 mt-10">Welcome {{userEmail}} . You were authenticated using Supabase</h1>
  </div>
</template>
<script>
import {computed} from "vue";
import store from "../store/index";
export default {
  name:"About",
  setup() {
    const user = computed(() => store.state.user);
    const userEmail = user.value.email.split("@")[0];
    return {
      user,
      userEmail
    }
  }
}
</script>
