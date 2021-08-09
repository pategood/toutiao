<template>
  <div class="container" >
    <ele-card />
    <test-component  />
  </div>
</template>

<script>
import eleCard from './components/eleCard.vue'
import testComponent from '@/components/common/testComponent.vue'

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
    eleCard,
    testComponent
  }

}
</script>

<style lang="scss" scoped>

</style>
