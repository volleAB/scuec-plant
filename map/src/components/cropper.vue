<template>
  <el-dialog title="图片裁剪"
             fullscreen
             :visible.sync="show">

    <div class="cropper-warpper">
      <vue-cropper ref="cropper"
                   @imgLoad="imgLoad"
                   :img="url"
                   :autoCrop="options.autoCrop"
                   :autoCropWidth="options.autoCropWidth"
                   :autoCropHeight="options.autoCropHeight"
                   :fixed="options.fixed"
                   :fixedNumber="options.fixedNumber"
                   :centerBox="options.centerBox"
                   :infoTrue="options.infoTrue"
                   :original="options.original"></vue-cropper>
    </div>
    <div class="bottom clearfix">
      <el-button type="primary"
                 @click="confirmCrop">确定裁剪</el-button>
      <el-button @click="exit">退出操作</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'cropper',
  data() {
    return {
      show: false,
      url: null,
      options: {
        autoCrop: true,
        autoCropWidth: 800,
        autoCropHeight: 400,
        fixed: true,
        fixedNumber: [2, 1],
        centerBox: true,
        infoTrue: true,
        original: false
      }
    }
  },
  props: {
    showFlag: {
      type: Boolean,
      required: true
    },
    img: {
      required: true
    }
  },
  methods: {
    imgLoad(res) {
      console.log(res)
    },
    exit() {
      this.show = false
    },
    confirmCrop() {
      this.$refs.cropper.getCropBlob(data => {
        this.$confirm('确定裁剪？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        })
          .then(result => {
            this.$message({
              type: 'success',
              message: '裁剪成功!'
            })
            this.$emit('cropSuccess', data)
            this.show = false
          })
          .catch(err => {
            this.$message({
              type: 'info',
              message: '已取消裁剪'
            })
          })
      })
    }
  },
  mounted() {
    this.url = this.img
    this.show = this.showFlag
  },
  watch: {
    showFlag: function(newV, oldV) {
      this.show = newV
    },
    show: function(newV, oldV) {
      this.$emit('close', newV)
    },
    img: function(newV, oldV) {
      this.url = newV
    },
    url: function(newV, oldV) {
      this.$emit('urlChange', newV)
    }
  }
}
</script>

<style>
</style>
