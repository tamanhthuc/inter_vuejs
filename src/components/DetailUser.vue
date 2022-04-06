<template>
  <div>
    details user: <h1>{{id}}</h1>
  </div>

</template>


<script>
  export default {
    props:['id'],
    data(){
      return {

      }
    },
    watch:{
      id: {
        immediate: true,
        handler(val){
          console.log(val)
        }
      }
    }

  }
</script>

<style>

</style>