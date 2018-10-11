<template>
  <el-dialog title="增加植物信息"
             fullscreen
             :visible.sync="show">
    <el-form ref="addForm"
             :model="addForm">
      <el-form-item label="中文学名">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="英文学名">
        <el-input v-model="addForm.eName"></el-input>
      </el-form-item>
      <el-form-item label="科">
        <el-input v-model="addForm.family"></el-input>
      </el-form-item>
      <el-form-item label="属">
        <el-input v-model="addForm.genus"></el-input>
      </el-form-item>
      <el-form-item label="修订者">
        <el-popover title="输入提示"
                    placement="top-start"
                    trigger="focus"
                    content="按照先后顺序输入，且以逗号分隔。">
          <el-input v-model="addForm.allReviser"
                    slot="reference"></el-input>
        </el-popover>
      </el-form-item>
      <el-form-item label="经度">
        <el-input v-model="addForm.lng"></el-input>
      </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="addForm.lat"></el-input>
      </el-form-item>
      <el-form-item label="临近道路">
        <el-input v-model="addForm.pos.street"></el-input>
      </el-form-item>
      <el-form-item label="周围建筑">
        <el-input v-model="addForm.pos.building"></el-input>
      </el-form-item>
      <el-form-item label="相对距离">
        <el-input v-model="addForm.pos.distance"></el-input>
      </el-form-item>
      <el-form-item label="形态描述">
        <el-input type="textarea"
                  :autosize="{minRows: 1, maxRows: 4}"
                  v-model="addForm.sharp"></el-input>
      </el-form-item>
      <el-form-item label="分布描述">
        <el-input type="textarea"
                  :autosize="{minRows: 1, maxRows: 4}"
                  v-model="addForm.distribution"></el-input>
      </el-form-item>
      <el-form-item label="药用价值">
        <el-input type="textarea"
                  :autosize="{minRows: 1, maxRows: 4}"
                  v-model="addForm.value"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="btnContainer">
          <el-button type="text"
                     @click="cancel">取消</el-button>
          <el-button type="primary"
                     @click="onSubmit">提交</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddDialog',
  props: {
    showFlag: {
      type: Boolean,
      required: true
    },
    point: {
      type: Object,
      default: function() {
        return {
          lat: '',
          lng: ''
        }
      }
    }
  },
  data() {
    return {
      show: false,
      currentP: null,
      addForm: {
        name: '',
        eName: '',
        pos: {
          street: '',
          building: '',
          distance: ''
        },
        lng: null,
        lat: null,
        allReviser: '',
        lastReviser: '',
        family: '',
        genus: '',
        img: '',
        sharp: '',
        distribution: '',
        value: ''
      }
    }
  },
  mounted() {
    this.show = this.showFlag
    this.currentP = this.point
  },
  watch: {
    show: function(newV, oldV) {
      this.$emit('close', newV)
    },
    showFlag: function(newV, oldV) {
      this.show = newV
    },
    point: function(newV) {
      this.currentP = newV
    },
    currentP: function(newV) {
      this.addForm.lng = newV.lng
      this.addForm.lat = newV.lat
    }
  },
  methods: {
    cancel() {
      this.show = false
    },
    onSubmit() {
      this.show = false
      let info = this._.assign(null, this.addForm)
      info.allReviser = info.allReviser.split(/[,，]/)
      info.lastReviser = info.allReviser[info.allReviser.length - 1]
      this.addForm = {
        name: '',
        eName: '',
        pos: {
          street: '',
          building: '',
          distance: ''
        },
        lng: null,
        lat: null,
        allReviser: '',
        lastReviser: '',
        family: '',
        genus: '',
        img: '',
        sharp: '',
        distribution: '',
        value: ''
      }
      this.$emit('add', info)
    }
  }
}
</script>

