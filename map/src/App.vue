<template>
  <div id="app">
    <el-container class="h100">
      <el-header>search</el-header>
      <el-container>
        <el-aside>
          <el-row class="menu">
            <el-col>
              <h5 class="text_center">选择想要查看的科，属，看都发布在何处</h5>
              <el-menu default-active="1">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>科系</span>
                  </template>
                  <el-menu-item v-for="(item, index) in families"
                                :key="index"
                                :index="`1-${index}`">
                    <div @click="updateByFamily">{{item}}</div>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-location-outline"></i>
                    <span>属类</span>
                  </template>
                  <el-menu-item v-for="(item, index) in genera"
                                :key="index"
                                :index="`2-${index}`">
                    <div @click.native="updateByGenus">{{item}}</div>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <plant-map :plants="plants"></plant-map>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import _ from 'loadsh';
import plantMap from './components/plantMap';
import testData from './assets/data/test0814';
export default {
  name: 'App',
  data(){
    return {
      allPlants: testData.data,
      plants: testData.data
    }
  },
  components: {
    plantMap
  },
  computed: {
    families() {
      let families = []
      this.allPlants.forEach((item) => {
       families.push(item.family)
      })

      return _.union(families)
    },
    genera(){
      let genera = []
      this.allPlants.forEach((item) => {
        genera.push(item.genus)
      })
      return _.union(genera)
    }
  },
  methods: {
    updateByFamily(e){
      let el = e.target
      let f = el.innerText
      this.plants = _.filter(this.allPlants, {'family': f})
    },
    updateByGenus(e){
      let el = e.target
      let g = el.innerText
      this.plants = _.filter(this.allPlants, {'genus': g})
    }
  }
}
</script>

<style>
body,
html {
  height: 100%;
}
body {
  margin: 0;
}
#app {
  height: 100%;
}
.h100 {
  height: 100%;
}
.text_center {
  text-align: center;
}
</style>
