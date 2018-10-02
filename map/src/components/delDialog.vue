<template>
  <div id="delDialog">
    <el-dialog title="批量删除"
               @open="delData"
               :visible.sync="show"
               :show-close="false"
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <el-progress text-inside
                   :stroke-width="18"
                   :percentage="progress"
                   :status="status"></el-progress>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'DelDialog',
  props: {
    showFlag: {
      type: Boolean,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      show: false,
      progress: 0,
      status: '',
      index: 0,
      maxIndex: 0,
      flag: false,
      error: [],
      success: [],
      showConfirmD: false
    }
  },
  mounted() {
    this.show = this.showFlag
  },
  methods: {
    delData() {
      this.maxIndex = this.data.length
      this.data.forEach((el, index) => {
        this.$store
          .dispatch('delPlant', el.name)
          .then(res => {
            this.$notify({
              type: 'success',
              message: `${el.name} 已被删除。`
            })
            this.index++
            this.progress = (this.index / this.maxIndex) * 100
            this.success.push(el.name)
          })
          .catch(err => {
            this.$notify({
              type: 'error',
              message: `${el.name} 删除失败`
            })
            this.error.push(el.name)
          })
          .finally(() => {
            let length = this.error.length + this.success.length
            if (length === this.maxIndex) {
              this.show = false
              // this.$emit('complete', this.success)
            }
          })
      })
    }
  },
  watch: {
    show: function(newV, oldV) {
      this.$emit('close', newV)
    },
    showFlag: function(newV, oldV) {
      this.show = newV
    }
  }
}
</script>

<style>
</style>
