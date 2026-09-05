<template>
    <form @submit.prevent="handleLogin">
        <input v-model="username" placeholder="ユーザー名" />
        <input v-model="password" type="password" placeholder="パスワード" />
        <button type="submit">ログイン</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '../services/api.js';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

async function handleLogin(){
    const ok = await login(username.value, password.value);
    if (ok) router.push('/menu');
}
</script>