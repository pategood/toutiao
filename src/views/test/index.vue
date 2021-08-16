<template>
  <div class="container" >
    <vue-draggable-resizable v-for='(item, index) in Arr'
      :key="item.customId" :custom-id="item.customId"  @activated="onActivated($event)"
      :h="100"
      :w="100"
    >
      {{index}}
      <ele-card />
    </vue-draggable-resizable>

    <test-component  />
  </div>
</template>

<script>
import eleCard from './components/eleCard.vue'
import testComponent from '@/components/common/testComponent.vue'
// import VueDraggableResizable from 'vue-draggable-resizable'
import VueDraggableResizable from '@/components/common/vue-draggable-resizable/index.vue'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default {
  name: 'VideoIndex',
  data() {
    return {
      img: [{
        gif: '@/assets/gif/FomJGkLDCiGINEzgA3Mq-GOG98jo'
      }],
      Arr: [1, 23, 3, 45, 66, 553, 675]
    }
  },
  components: {
    eleCard,
    testComponent,
    VueDraggableResizable
  },
  methods: {
    // 点击控件
    onActivated(e) {
      console.log(e)
      // this.activedId = customId
    }
    // onActivated(customId) {
    //   console.log(customId)
    //   this.activedId = customId
    // }
  }

}
</script>

<style lang="scss" scoped>

</style>
