<template>
  <div id="app">
    TODO APP
  </div>
</template>
<script>
// import IpgsMixin from '@/mixins/IpgsMixin'

export default {
  name: 'App',
  // mixins: [IpgsMixin],
  components: {
    // 'Navbar': () => import('@/components/layout/Navbar'),
    // 'SolidTrackSession': () => import('@/components/solid/SolidTrackSession'),
    // 'HelpView': () => import('@/views/HelpView'),
    //  'Fab': () => import('@/components/basic/Fab.vue')
  },
  async created(){
    console.log("App created")
  },
  watch:{
    // $route (){
    //   this.checkQueryUrl()
    // },
  },
  computed: {
    spinner: {
      get () { return this.$store.state.ipgs.spinner},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>
