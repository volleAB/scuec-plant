<template>
  <el-dialog title="数据概览"
             :visible.sync="show"
             fullscreen>
    <overview></overview>
  </el-dialog>
</template>

<script>
import overview from '@/components/overview'
export default {
  name: 'overviewDialog',
  components: {
    overview
  },
  data() {
    return {
      show: false
    }
  },
  props: {
    showFlag: {
      type: Boolean,
      required: true
    }
  },
  mounted() {
    this.show = this.showFlag
  },
  watch: {
    show: function(newV, oldV) {
      this.$emit('closeDialog', newV)
    },
    showFlag: function(newV, oldV) {
      this.show = newV
    }
  }
}
</script>

<style>
</style>
