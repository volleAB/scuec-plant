<template>
  <el-container class="overview-container">
    <el-row class="w100"
            :gutter="30">
      <el-col :span="12">
        <el-container class="part-container">
          <el-header class="part-header"
                     height="auto">
            <i class="el-icon-edit primary-icon"></i>
            <span class="title">数据概况</span>
          </el-header>
          <el-main>
            <el-row type="flex"
                    align="middle">
              <el-col :span="6">
                <div class="icon-container">
                  <img src="@/assets/icon/tree.png"
                       alt="植物总数"
                       style="width: 100%">
                </div>
              </el-col>
              <el-col :span="6">
                <el-row>
                  <el-col>
                    <span class="plant-Number">{{plantTotalN}}</span><span> 株</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <p>植物总数</p>
                  </el-col>
                </el-row>
                <!-- <el-row>
                  <el-col :span="12">
                    <router-link :to="{name: 'addPlant'}">
                      <el-button type="primary">添加</el-button>
                    </router-link>
                  </el-col>
                  <el-col :span="12">
                    <div class="vcenter-container">
                      <router-link :to="{name: 'plantManager'}">
                        <el-button type="text">查看详情</el-button>
                      </router-link>
                    </div>
                  </el-col>
                </el-row> -->
              </el-col>
              <el-col :span="1">
                <div class="vcenter-container">
                  <div class="vLine"></div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="icon-container">
                  <img src="@/assets/icon/tree2.png"
                       alt="科属分类"
                       style="width: 100%">
                </div>
              </el-col>
              <el-col :span="5">
                <el-row>
                  <span class="plant-Number">{{plantTotalF}}</span><span> 科</span>
                </el-row>
                <el-row>
                  <span class="plant-Number">{{plantTotalG}}</span><span> 属</span>
                </el-row>

                <!-- <el-col :span="8">
                    <p>总计</p>
                  </el-col>
                  <el-col :span="8">
                    <el-row>
                      <el-col>
                        <span class="plant-Number">{{plantTotalF}}</span><span> 科</span>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <span class="plant-Number">{{plantTotalG}}</span><span> 属</span>
                      </el-col>
                    </el-row>
                  </el-col> -->
                <el-row>
                  <el-col>
                    <p>总计</p>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-main>
        </el-container>

        <el-container class="part-container">
          <el-header class="part-header"
                     height="auto">
            <i class="el-icon-location-outline primary-icon"></i>
            <span class="title">位置概况</span>
          </el-header>
          <el-main>
            <ve-bar :data="locationData"
                    :height="lHeight"
                    :settings="ChartSettings"></ve-bar>
          </el-main>
        </el-container>

      </el-col>
      <el-col :span="12"
              class="h100">
        <el-container class="part-container h100">
          <el-header class="part-header"
                     height="auto">
            <i class="el-icon-date primary-icon"></i>
            <span class="title">科属概况（显示数量前五，前科后属）</span>
          </el-header>
          <el-main>

            <ve-line :data="familyData"
                     :settings="ChartSettings"
                     :extend="ChartExtend"></ve-line>

            <ve-line :data="genusData"
                     :settings="ChartSettings"
                     :extend="ChartExtend"></ve-line>

          </el-main>
        </el-container>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: 'overview',
  data() {
    this.ChartSettings = {
      labelMap: {
        number: '数量',
        rate: '占比'
      },
      dataOrder: {
        label: 'number',
        order: 'desc'
      }
    }
    this.ChartExtend = {
      series: {
        label: {
          normal: {
            show: true
          }
        }
      }
    }
    return {
      activeChart: 'genus',
      lHeight: '400px'
    }
  },
  computed: {
    plantTotalN() {
      return this.$store.getters.plant.length
    },
    plantTotalF() {
      return this.$store.getters.family.length
    },
    plantTotalG() {
      return this.$store.getters.genus.length
    },
    familyData() {
      let family = this.$store.getters.plant.map(item => {
        return item.family
      })
      let dataObj = this._.countBy(family, this.$store.getters.family.include)
      let dataArr = []
      let totalN = family.length
      this._.forEach(dataObj, (value, key) => {
        dataArr.push({
          family: key,
          number: value,
          rate: (value / totalN).toFixed(2)
        })
      })
      dataArr = dataArr.sort((a, b) => {
        return b.number - a.number
      })
      let fData = {
        columns: ['family', 'number', 'rate'],
        rows: dataArr.slice(0, 5)
      }
      return fData
    },
    genusData() {
      let genus = this.$store.getters.plant.map(item => {
        return item.genus
      })
      let dataObj = this._.countBy(genus, this.$store.getters.genus.include)
      let dataArr = []
      let totalN = genus.length
      this._.forEach(dataObj, (value, key) => {
        dataArr.push({
          genus: key,
          number: value,
          rate: (value / totalN).toFixed(2)
        })
      })
      dataArr = dataArr.sort((a, b) => {
        return b.number - a.number
      })
      let gData = {
        columns: ['genus', 'number', 'rate'],
        rows: dataArr.slice(0, 5)
      }
      return gData
    },
    locationData() {
      let building = this.$store.getters.plant.map(item => {
        return item.pos.building
      })
      let dataObj = this._.countBy(
        building,
        this.$store.getters.building.include
      )
      let dataArr = []
      let totalN = building.length
      let height = totalN * 50
      this.lHeight = `${height}px`
      this._.forEach(dataObj, (value, key) => {
        dataArr.push({
          building: key,
          number: value,
          rate: value / totalN
        })
      })
      let lData = {
        columns: ['building', 'number', 'rate'],
        rows: dataArr
      }
      return lData
    }
  }
}
</script>

<style>
</style>
