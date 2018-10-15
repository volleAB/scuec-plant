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
    <el-main class="addImg-main"
             v-loading="uploading">
      <el-upload ref="upload"
                 multiple
                 :limit="8"
                 accept="image/*"
                 :disabled="form.name === ''"
                 :action="imgAction"
                 :before-upload="beforeUpload">
        <div slot="tip"
             class="el-upload__tip">只能上传图片文件，且不超过2MB，最多上传文件数为8</div>
        <el-button slot="trigger"
                   type="primary">选取图片</el-button>
        <el-button style="margin-left: 50px;"
                   type="success"
                   :loading="uploading"
                   @click="submitUpload">上传服务器</el-button>
      </el-upload>
      <div class="img-preview-container">
        <div class="img-card-container"
             v-for="(file, index) in filesArr"
             :key="index">
          <el-card :body-style="{padding: '0px'}">
            <img class="image"
                 :src="file.url"
                 :alt="file.name">
            <div style="padding: 14px;">
              <span>{{file.name}}</span>
              <div class="bottom clearfix">
                <el-button type="text"
                           class="button">操作</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
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
      filesArr: [],
      uploading: false
    }
  },
  computed: {
    ...mapGetters(['nameOptions'])
  },
  methods: {
    beforeUpload(file) {
      // 判断文件大小是否满足要求
      const isLt2M = file.size / 1024 / 1024 < 2
      const isIMG = /^image\//.test(file.type)
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过2MB！')
      } else if (!isIMG) {
        this.$message.error('上传文件必须是图片格式！')
      } else {
        this.param.append('file', file, file.name)
        let imgFile = {
          url: URL.createObjectURL(file),
          name: file.name
        }
        this.filesArr.push(imgFile)
      }
      return false
    },
    httpRequest() {},
    submitUpload() {
      this.uploading = true
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
          this.$message.success('图片上传成功')
        })
        .catch(err => {
          console.error(err)
          this.$message.error('图片上传失败')
        })
        .finally(() => {
          this.filesArr = []
          this.uploading = false
        })
    }
  }
}
</script>

<style>
</style>
