<template>
  <div>
    <h1>List User</h1>

    <div v-for="user in users" :key="user.id">
      <router-link :to="{name: 'DetailUser', params: {id: user.id}}">
        {{user.name}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      users: [{id: 1, name: "Thuc"}, {id: 2, name: "Huy"}, {id: 3, name:"Hieu"}]
    }
  }
}
</script>

<style>
h3{
  cursor: pointer;
}

</style>