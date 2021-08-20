<template>
  <div id="app">
    <transition :name="transitionName">
        <keep-alive>
        <!-- <keep-alive :include="keepAlive"> -->
          <router-view />
        </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: ''
    }
  },
  watch: { // 使用watch 监听$router的变化
    $route(to, from) {
      let toIndex, fromIndex
      if ('meta' in to.meta) {
        toIndex = to.meta.meta.index
      } else {
        toIndex = to.meta.index
      }
      if ('meta' in from.meta) {
        fromIndex = from.meta.meta.index
      } else {
        fromIndex = from.meta.index
      }
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (toIndex > fromIndex) {
        this.transitionName = 'slide-left' // 页面向左
      } else {
        this.transitionName = 'slide-right'
      }
    }
  },
  components: {}
}
</script>

<style lang="scss">
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  // display:block;
  // -webkit-backface-visibility: hidden;
  // backface-visibility: hidden;
  // will-change: transform;
  transition: all 500ms;
  position: absolute;
  // -moz-transition: width 500ms; /* Firefox 4 */
  // -webkit-transition: width 500ms; /* Safari 和 Chrome */
  // -o-transition: width 500ms; /* Opera */
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

</style>
