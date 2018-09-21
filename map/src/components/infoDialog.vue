<template>
  <el-dialog title="植物详情"
             :visible.sync="show">
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
    <el-row>
      <el-carousel :interval="3000"
                   arrow="hover"
                   height="400px">
        <el-carousel-item v-for="(item, index) in plantInfo.img"
                          :key="index">
          <div id="carousel-img-container">
            <img :src="item">
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-row>
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
      <el-button type="text"
                 @click="closeDialog">退出</el-button>
      <el-button type="primary"
                 @click="toHere">到此处</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'infoDialog',
  data() {
    return {
      show: null
    }
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
      this.$emit('closeDialog', false)
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
  },
  mounted() {
    this.show = this.showDialogFlag
  },
  watch: {
    show: function(newV, oldV) {
      this.$emit('closeDialog', newV)
    },
    showDialogFlag: function(newV, oldV) {
      this.show = newV
    }
  }
}
</script>
