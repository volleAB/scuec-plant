<template>
  <el-container class="addImg-container">
    <el-header class="addImg-header">
      <el-form ref="form"
               :model="form">
        <el-form-item>
          <el-select v-model="form.name"
                     class="name-select"
                     filterable
                     placeholder="请选择">
            <el-option v-for="item in nameOptions"
                       :key="item.value"
                       :label="item.value"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="addImg-main">
      <el-upload ref="upload"
                 multiple
                 list-type="picture"
                 :disabled="form.name === ''"
                 :action="imgAction"
                 :before-upload="beforeUpload">
        <el-button slot="trigger"
                   type="primary">选取图片</el-button>
        <el-button style="margin-left: 50px;"
                   type="success"
                   @click="submitUpload">上传服务器</el-button>
      </el-upload>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'addImage',
  data() {
    return {
      imgAction: 'http://59.68.29.67:8000/api/uploadFile',
      form: {
        name: ''
      },
      param: new FormData(),
      previewSrc: []
    }
  },
  computed: {
    ...mapGetters(['nameOptions'])
  },
  methods: {
    beforeUpload(file) {
      this.param.append('file', file, file.name)
      return false
    },
    httpRequest() {},
    submitUpload() {
      let names = this.form.name
      this.param.append('name', names)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios
        .post('/uploadFile', this.param, config)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
</style>
