<template>
  <div class="plantMap"
       id="allmap"></div>
</template>

<script>
import Map from '../class/map'
import BMap from 'BMap'
export default {
  name: 'plantMap',
  props: {
    plants: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      map: null
    }
  },
  mounted() {
    this.createMap()
  },
  methods: {
    createMap() {
      this.map = new Map('allmap')
      this.map.init()
      this.map.addPlant(this.plants)
    }
  },
  watch: {
    plants: function() {
      let center = new BMap.Point(this.plants[0].lng, this.plants[0].lat)
      this.map.removePlant()
      console.log(`目前地图需要展示的植物 -- ${this.plants}`)
      this.map.addPlant(this.plants)
      this.map.map.panTo(center)
    }
  }
}
</script>
<style>
#allmap {
  height: 100%;
}
</style>

