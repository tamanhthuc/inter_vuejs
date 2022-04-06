<template>
  <div>
   <slot :user="user">{{user.lastName}}</slot>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        user: {
          firstName: "Thuc",
          lastName: "Manh Thuc"
        }
      }
    }
  }
</script>

<style>


</style>



