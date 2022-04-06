<template>
  <span ref="trigger" />
</template>


<script>
export default {
  props: {
    options: {
      type: Object,
    }
  },
  data(){
    return {
      observer: null,
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      this.handleIntersect(entries[0])
    }, this.options)
    this.observer.observer(this.$refs.trigger);
  },
  methods: {
    handleIntersect(entry){
      if(entry.isIntersecting) this.$emit("triggerIntersected");
    }
  }
}
</script>