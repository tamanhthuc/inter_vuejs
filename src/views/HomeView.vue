<template>
  <div class="home">
    <FormSearch />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import FormSearch from "@/components/FormSearch";
export default {
  name: 'HomeView',
  components: {
    FormSearch
  }
}
</script>
