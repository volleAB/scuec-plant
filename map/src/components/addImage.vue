<template>
  <el-container class="addImg-container">
    <el-header class="addImg-header">
      <el-form
        :model="form"
        ref="form"
      >
        <el-form-item>
          <el-select
            class="name-select"
            filterable
            placeholder="请选择"
            v-model="form.name"
          >
            <el-option
              :key="item.value"
              :label="item.value"
              :value="item.value"
              v-for="item in nameOptions"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main
      class="addImg-main"
      v-loading="uploading"
    >
      <el-upload
        :action="imgAction"
        :before-upload="beforeUpload"
        :disabled="uploadFlag"
        :limit="8"
        accept="image/*"
        multiple
        ref="upload"
      >
        <div
          class="el-upload__tip"
          slot="tip"
        >只能上传图片文件，且不超过2MB，最多上传文件数为8，建议图片长宽比在2:1左右，且宽度大于700</div>
        <el-button
          :disabled="uploadFlag"
          slot="trigger"
          type="primary"
        >选取图片</el-button>
        <el-button
          :disabled="uploadFlag"
          :loading="uploading"
          @click="submitUpload"
          style="margin-left: 50px;"
          type="success"
        >上传服务器</el-button>
      </el-upload>
      <div class="img-preview-container">
        <div
          :key="index"
          class="img-card-container"
          v-for="(file, index) in filesArr"
        >
          <el-card :body-style="{padding: '0px'}">
            <img
              :alt="file.name"
              :src="file.url"
              class="image"
            >
            <div style="padding: 14px;">
              <span>{{file.name}}</span>
              <div class="bottom clearfix">
                <el-button
                  @click="tailor(file,index)"
                  class="button"
                  type="text"
                >裁剪</el-button>
                <el-button
                  @click="reupload(index)"
                  class="button"
                  type="text"
                >重传</el-button>
                <input
                  accept="image/*"
                  id="uploadFile"
                  ref="uploadFile"
                  style="filter:alpha(opacity=0);opacity:0;width: 0;height: 0;"
                  type="file"
                >
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <cropper
        :img="imgUrl"
        :showFlag="showCropper"
        @close="closeCropper"
        @cropSuccess="cropSuccess"
        @urlChange="cropperUrlChange"
      ></cropper>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import cropper from '@/components/cropper'
export default {
  name: 'addImage',
  data() {
    return {
      cropIndex: null,
      cropType: null,
      imgAction: 'http://59.68.29.67:8000/api/uploadFile',
      form: {
        name: ''
      },
      param: new FormData(),
      filesArr: [],
      uploading: false,
      showCropper: false,
      imgUrl: null,
      uploadFlag: true
    }
  },
  components: {
    cropper
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
          name: file.name,
          data: file
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
        this.filesArr.push(imgFile)
      }
      return false
    },
    httpRequest() {},
    submitUpload() {
      this.uploading = true
      let formData = new FormData()
      formData.append('name', this.form.name)
      this.filesArr.forEach(item => {
        formData.append('images', item.data)
      })
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios
        .post('/uploadFile', formData, config)
        .then(res => {
          this.$message.success('图片上传成功')
        })
        .catch(err => {
          console.error(err)
          this.$message.error('图片上传失败')
        })
        .finally(() => {
          // 重置所有数据
          this.filesArr = []
          this.uploading = false
          this.param.delete('file')
          this.param.delete('name')
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
    },
    tailor(file, index) {
      this.imgUrl = file.url
      this.showCropper = true
      this.cropIndex = index
      this.cropType = file.type
    },
    closeCropper(...value) {
      this.showCropper = value[0]
    },
    cropperUrlChange(...value) {
      this.imgUrl = value[0]
    },
    cropSuccess(data) {
      let url = window.URL.createObjectURL(data)
      let name = this.filesArr[this.cropIndex].name
      let file = new File([data], name, {
        type: this.cropType,
        lastModified: Date.now()
      })
      this.filesArr[this.cropIndex].url = url
      this.filesArr[this.cropIndex].data = file
    },
    reupload(index) {
      this.getFile().then(res => {
        if (res.length) {
          this.filesArr[index].url = URL.createObjectURL(res[0])
          this.filesArr[index].name = res[0].name
          this.filesArr[index].data = res[0]
        }
      })
    },
    getFile() {
      return new Promise((resolve, reject) => {
        this.$refs.uploadFile[0].click()
        this.$refs.uploadFile[0].addEventListener('change', function() {
          resolve(this.files)
        })
      })
    }
  },
  watch: {
    // 由于form是一个对象，我们现在如果想要监听form，就需要使用深度监听的模式
    form: {
      handler(newV, oldV) {
        this.uploadFlag = false
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
