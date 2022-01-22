<template>
    <div>
        <nav class="w-full h-15 flex justify-between place-items-center p-2 bg-gray-200">
            <div>
                <h1 class="lg:text-3xl text-2xl text-green-500 font-bold">Supabase</h1>
            </div>
            <div>
                <ul class="inline-flex list-none cursor-pointer">
                    <li class="m-2 lg:text-xl text-md font-bold hover:text-green-500" v-if="!user"><router-link to="/">Home</router-link></li>
                    <li class="m-2 lg:text-xl text-md font-bold hover:text-green-500" v-if="!user"><router-link to="/about">Secret</router-link></li>
                    <li class="m-2 lg:text-xl text-md font-bold hover:text-red-700" v-if="user" @click="LogOut">Log Out</li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
import {supabase} from "../supabase/supabaseConfig";
import {useRouter} from "vue-router";
import store from "../store/index";
import {computed} from "vue";
export default {
    name:"Navigation",
    setup() {
        const router = useRouter();
        const user = computed(() => store.state.user);
        const LogOut = async () => {
            await supabase.auth.signOut();
            router.push({name:"Home"})
        }
        return {
            LogOut,
            user
        }
    }
}
</script>
<style scoped>
</style>