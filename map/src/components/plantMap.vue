<template>
  <div class="plantMap"
       id="allmap"></div>
</template>

<script>
import Map from '../class/map';
import BMap from 'BMap';
export default {
  name: 'plantMap',
  props: {
    plants: {
      required: true,
      type: Array
    }
  },
  data(){
    return {
      map: null
    }
  },
  mounted(){
    this.createMap()
  },
  methods: {
    createMap(){
      this.map = new Map('allmap')
      this.map.init()
      this.map.addPlant(this.plants)
    }
  },
  watch: {
    plants: function(){
      console.log(this.plants);
      this.map.removePlant()
      this.map.addPlant(this.plants)
    }
  }
}
</script>
<style>
#allmap {
  height: 100%;
}
</style>

