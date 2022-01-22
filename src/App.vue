<template>
  <div v-if="appReady">
    <Navigation/>
    <router-view />
  </div>
</template>
<script>
import Navigation from "./components/Navigation.vue";
import {ref} from "vue";
import {supabase} from "./supabase/supabaseConfig";
import store from "./store/index";
export default {
  name:"App",
  components: {
    Navigation
  },
  setup() {
    const appReady = ref(null);
    const user = supabase.auth.user();
    if(!user) {
      appReady.value = true;
    };
    supabase.auth.onAuthStateChange((_,session) => {
      store.methods.setUser(session);
      appReady.value = true;
    })
    return {
      appReady
    }
  },
}
</script>
