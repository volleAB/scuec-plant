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
             class="el-upload__tip">只能上传图片文件，且不超过2MB，最多上传文件数为8，建议图片长宽比在2:1左右，且宽度大于700</div>
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
                           class="button">裁剪</el-button>
                <el-button type="text"
                           class="button">重传</el-button>
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
      uploading: false,
      warnFile: []
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
        let imgFile = {
          url: URL.createObjectURL(file),
          name: file.name
        }
        // 判断图片的尺寸大小
        this.getSize(imgFile.url).then(res => {
          if (res.width < 700) {
            this.$notify({
              type: 'error',
              duration: 8000,
              title: '建议重新上传',
              message: `${imgFile.name}像素过低，可能导致显示模糊！`
            })
          } else {
            let ratio = Math.round(res.width / res.height)
            if (ratio !== 2) {
              this.$notify({
                type: 'warning',
                duration: 8000,
                title: '建议裁剪',
                message: `${imgFile.name}长宽比不满足2:1，可能导致显示变形`
              })
            }
          }
        })
        this.param.append('file', file, file.name)
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
    },
    getSize(url) {
      return new Promise((resolve, reject) => {
        let img = new Image()
        img.src = url
        document.body.appendChild(img)
        img.onload = () => {
          let w = img.offsetWidth
          let h = img.offsetHeight
          document.body.removeChild(img)
          resolve({
            width: w,
            height: h
          })
        }
      })
    }
  }
}
</script>

<style>
</style>
