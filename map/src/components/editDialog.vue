<template>
  <el-dialog title="修改植物信息"
             fullscreen
             :visible.sync="show">
    <el-form ref="editForm"
             :model="editForm">
      <el-form-item label="中文学名">
        <el-input v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item label="英文学名">
        <el-input v-model="editForm.eName"></el-input>
      </el-form-item>
      <el-form-item label="科">
        <el-input v-model="editForm.family"></el-input>
      </el-form-item>
      <el-form-item label="属">
        <el-input v-model="editForm.genus"></el-input>
      </el-form-item>
      <el-form-item label="经度">
        <el-input v-model="editForm.lng"></el-input>
      </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="editForm.lat"></el-input>
      </el-form-item>
      <el-form-item label="临近道路">
        <el-input v-model="editForm.pos.street"></el-input>
      </el-form-item>
      <el-form-item label="周围建筑">
        <el-input v-model="editForm.pos.building"></el-input>
      </el-form-item>
      <el-form-item label="修订者">
        <el-popover title="输入提示"
                    placement="top-start"
                    trigger="focus"
                    content="按照先后顺序输入，且以逗号分隔。">
          <el-input v-model="editForm.allReviser"
                    slot="reference"></el-input>
        </el-popover>
      </el-form-item>
      <el-form-item label="相对距离">
        <el-input v-model="editForm.pos.distance"></el-input>
      </el-form-item>
      <el-form-item label="形态描述">
        <el-input type="textarea"
                  :autosize="{minRows: 1, maxRows: 4}"
                  v-model="editForm.sharp"></el-input>
      </el-form-item>
      <el-form-item label="分布描述">
        <el-input type="textarea"
                  :autosize="{minRows: 1, maxRows: 4}"
                  v-model="editForm.distribution"></el-input>
      </el-form-item>
      <el-form-item label="药用价值">
        <el-input type="textarea"
                  :autosize="{minRows: 1, maxRows: 4}"
                  v-model="editForm.value"></el-input>
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
  name: 'EditDialog',
  props: {
    showFlag: {
      type: Boolean,
      required: true
    },
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: null,
      editForm: {
        name: '木耳',
        eName: 'Auricularia auricular ',
        pos: {
          street: '腾飞路',
          building: '民族医学实验室',
          distance: '西侧10米'
        },
        lng: 114.398627,
        lat: 30.495661,
        allReviser: '',
        lastReviser: 'Underw',
        family: '木耳',
        genus: '木耳',
        img: '[./img/木耳]',
        sharp:
          '形状如耳朵，系寄生于枯木上的一种菌类，富含铁、钙、磷和维生素B1等。新鲜的木耳呈胶质片状，半透明，侧生在树木上，耳片直径5～10厘米，有弹性，腹面平滑下凹，边缘略上卷，背面凸起，并有极细的绒毛，呈黑褐色或茶褐色。干燥后收缩为角质状，硬而脆性，背面暗灰色或灰白色；入水后膨胀，可恢复原状，柔软而半透明，表面附有滑润的粘液。',
        distribution: '产于全国各地。',
        value: '全株：益气强身one、养血驻颜、疏通肠胃、润滑肠道。'
      }
    }
  },
  mounted() {
    this.editForm = this.info
    this.show = this.showFlag
  },
  watch: {
    show: function(newV, oldV) {
      this.$emit('close', newV)
    },
    showFlag: function(newV, oldV) {
      this.show = newV
    },
    info: function(newV, oldV) {
      this.editForm = newV
    }
  },
  methods: {
    cancel() {
      this.show = false
    },
    onSubmit() {
      this.show = false
      let info = this._.assign(null, this.editForm)
      info.allReviser = info.allReviser.split(/[,，]/)
      info.lastReviser = info.allReviser[info.allReviser.length - 1]
      this.$emit('edit', info)
    }
  }
}
</script>

<style>
</style>
