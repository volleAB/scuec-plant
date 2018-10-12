<template>
  <div class="map h100">
    <div class="plantMap h100"
         id="allmap"></div>
    <add-dialog :showFlag="showFlag"
                :point="point"
                @close="closeAddDialog"
                @add="submitAdd"></add-dialog>
  </div>
</template>

<script>
import Map from '@/class/map'
import AddDialog from '@/components/addDialog'
export default {
  name: 'addPlant',
  data() {
    return {
      map: null,
      point: null,
      marker: null,
      showFlag: false
    }
  },
  components: {
    AddDialog
  },
  mounted() {
    this.createMap()
    this.map.setMiniBounds()
  },
  methods: {
    createMap() {
      let _this = this
      this.map = new Map('allmap')
      this.map.init()
      this.map.map.addEventListener('click', function(e) {
        _this.point = e.point
        if (!_this.marker) {
          _this.marker = new BMap.Marker(e.point, {
            title: '植物坐标',
            // TODO: 设置一个当前位置的图标
            icon: ''
          })
          _this.map.map.addOverlay(_this.marker)
          _this.marker.setAnimation(BMAP_ANIMATION_BOUNCE)
        } else {
          _this.marker.setPosition(e.point)
        }
        _this.showFlag = true
        _this.map.map.panTo(e.point)
      })
    },
    closeAddDialog(...data) {
      this.showFlag = data[0]
    },
    submitAdd(info) {
      this.$store
        .dispatch('addPlant', info)
        .then(res => {
          this.$message({
            type: 'success',
            message: '信息添加成功'
          })
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: '信息添加失败'
          })
        })
    }
  }
}
</script>

<style>
</style>
