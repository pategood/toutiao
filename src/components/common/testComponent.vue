<template>
  <div>
    <span>元素拖拽</span>
    <dynamic-create></dynamic-create>
  </div>
</template>

<script>

import dynamicCreate from '@/views/test/components/dynamicComponent'
export default {
  name: 'testComponent',
  data() {
    return {
      List: []
    }
  },
  components: {
    dynamicCreate
  }
}
</script>

<style lang="scss" scoped>

</style>
