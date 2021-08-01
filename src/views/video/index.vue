<template>
  <div class="container" >
    <ele-card />
  </div>
</template>

<script>
import eleCard from './components/eleCard.vue'
export default {
  name: 'VideoIndex',
  data() {
    return {
      img: [{
        gif: '@/assets/gif/FomJGkLDCiGINEzgA3Mq-GOG98jo'
      }]
    }
  },
  components: {
    eleCard
  }

}
</script>

<style lang="scss" scoped>

</style>
