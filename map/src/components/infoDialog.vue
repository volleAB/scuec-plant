<template>
  <el-dialog title="植物详情"
             :visible.sync="showDialogFlag">
    <el-row>
      <el-col :span="12">
        <h2 class="title">【学名】：{{plantInfo.name}}</h2>
      </el-col>
      <el-col :span="12">
        <h2 class="title">【英文学名】：{{plantInfo.eName}}</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <h4 class="reviser">【所有修订者】: {{plantInfo.allReviser.join('，')}}</h4>
      </el-col>
      <el-col :span="12">
        <h4 class="reviser">【最后修订者】：{{plantInfo.lastReviser}}</h4>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <h4 class="fg">【科】{{plantInfo.family}} </h4>
      </el-col>
      <el-col :span="12">
        <h4 class="fg">【属】{{plantInfo.genus}} </h4>
      </el-col>
    </el-row>
    // TODO: 增加对图片的展示
    <el-row>
      <el-col :span="12">
        <h4 class="title">【校园位置】</h4>
        <span class="pos">{{pos}}</span>
      </el-col>
      <el-col :span="12">
        <h4 class="title">【全球定位】</h4>
        <span class="pos">经度：{{plantInfo.lng}} 纬度：{{plantInfo.lat}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3>【形态描述】</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <p class="sharp">{{plantInfo.sharp}}</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3>【分布】</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <p class="destribution">{{plantInfo.distribution}}</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3>【药用价值】</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <p class="value">{{plantInfo.value}}</p>
      </el-col>
    </el-row>
    <div slot="footer">
      <el-button type="error"
                 @click="closeDialog">退出</el-button>
      <el-button type="success"
                 @click="toHere">到此处</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'infoDialog',
  data() {
    return {}
  },
  props: {
    showDialogFlag: {
      type: Boolean,
      required: true
    },
    plantInfo: {
      type: Object
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
    toHere() {
      this.$emit('toHere')
    }
  },
  computed: {
    pos() {
      let pos =
        this.plantInfo.pos.street +
        this.plantInfo.pos.building +
        this.plantInfo.pos.distance
      return pos
    }
  }
}
</script>

<style>
</style>
