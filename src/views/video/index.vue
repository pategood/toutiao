<template>
  <div>
    <img :src="img[0].gif" alt="">
    <img src="@/assets/img/mobile.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'VideoIndex',
  data() {
    return {
      img: [{
        gif: '@/assets/gif/FomJGkLDCiGINEzgA3Mq-GOG98jo'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
