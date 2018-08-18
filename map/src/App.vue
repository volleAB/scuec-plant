<template>
  <div id="app">
    <el-container class="h100">
      <el-header>header</el-header>
      <el-container>
        <el-aside class="map-aside">
          <el-row class="menu">
            <el-col>
              <el-form :model="search"
                       :rules="searchRules"
                       ref="search"
                       label-position="top"
                       status-icon>
                <el-form-item label="搜索类型"
                              prop="type">
                  <el-select v-model="search.type"
                             class="w100"
                             size="small"
                             placeholder="请选择需要搜索的类型">
                    <el-option v-for="(item, index) in select"
                               :key="index"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="具体条目"
                              prop="value">
                  <el-input v-model="search.value"
                            placeholder="输入想要查询的信息。。。"
                            prefix-icon="el-icon-search"
                            size="small">
                  </el-input>
                </el-form-item>
              </el-form>

            </el-col>
            <el-col>
              <el-menu unique-opened>
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>科</span>
                  </template>
                  <el-menu-item v-for="(item, index) in families"
                                :key="index"
                                :index="`1-${index}`">
                    <div @click="update"
                         data-type="family">{{item}}</div>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-location-outline"></i>
                    <span>属</span>
                  </template>
                  <el-menu-item v-for="(item, index) in genera"
                                :key="index"
                                :index="`2-${index}`">
                    <div @click="update"
                         data-type="genus">{{item}}</div>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>道路</span>
                  </template>
                  <el-menu-item v-for="(item, index) in streets"
                                :key="index"
                                :index="`3-${index}`">
                    <div @click="update"
                         data-type="street">{{item}}</div>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-rank"></i>
                    <span>建筑</span>
                  </template>
                  <el-menu-item v-for="(item, index) in buildings"
                                :key="index"
                                :index="`4-${index}`">
                    <div @click="update"
                         data-type="building">{{item}}</div>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-button type="success"
                         class="allP-btn"
                         @click="showAllPlants">全部植物</el-button>
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
import _ from 'loadsh'
import plantMap from './components/plantMap'
import testData from './assets/data/test0814'
export default {
  name: 'App',
  data() {
    let validateType = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择需要搜索的类型'))
      }
      this.searchPlant()
      callback()
    }

    let validateValue = (rule, value, callback) => {
      let type = this.search.type
      if (!type) {
        callback(new Error('请先选择要搜索的类型'))
      } else {
        if (!this[type].includes(value)) {
          callback(new Error('请检查之后，输入正确的条目'))
        }
      }
      this.searchPlant()
      callback()
    }
    return {
      allPlants: testData.data,
      plants: testData.data,
      search: {
        type: 'families',
        value: ''
      },
      searchRules: {
        type: [
          {
            required: true,
            validator: validateType,
            trigger: 'change'
          }
        ],
        value: [
          {
            required: true,
            validator: validateValue,
            trigger: 'change'
          }
        ]
      },
      select: [
        {
          label: '科',
          value: 'families'
        },
        {
          label: '属',
          value: 'genera'
        },
        {
          label: '道路',
          value: 'streets'
        },
        {
          label: '建筑',
          value: 'buildings'
        }
      ]
    }
  },
  components: {
    plantMap
  },
  computed: {
    families() {
      let families = []
      this.allPlants.forEach(item => {
        families.push(item.family)
      })

      return _.union(families)
    },
    genera() {
      let genera = []
      this.allPlants.forEach(item => {
        genera.push(item.genus)
      })
      return _.union(genera)
    },
    streets() {
      let streets = []
      this.allPlants.forEach(item => {
        streets.push(item.pos.street)
      })
      return _.union(streets)
    },
    buildings() {
      let buildings = []
      this.allPlants.forEach(item => {
        buildings.push(item.pos.building)
      })
      return _.union(buildings)
    }
  },
  methods: {
    update(e) {
      let fg = ['family', 'genus']
      let el = e.target
      let value = el.innerText
      let type = el.dataset.type
      console.log(`该选择类型为 -- ${type}`)
      this.$notify.success({
        title: '提示',
        message: `此时显示 ${type} -- ${value} 中的所有植物`
      })
      if (!fg.includes(type)) {
        this.plants = _.filter(this.allPlants, {
          pos: {
            [type]: value
          }
        })
      } else {
        this.plants = _.filter(this.allPlants, { [type]: value })
      }
    },
    searchPlant() {
      let fg = ['family', 'genus']
      let { type, value } = this.search
      let transform = {
        families: 'family',
        genera: 'genus',
        streets: 'street',
        buildings: 'building'
      }
      type = transform[type]
      if (!type || !value) {
        this.plants = this.allPlants
        console.log('type null or value null')
        return
      }
      console.log(`该选择类型为 -- ${type}`)
      if (!fg.includes(type)) {
        this.plants = _.filter(this.allPlants, {
          pos: {
            [type]: value
          }
        })
      } else {
        this.plants = _.filter(this.allPlants, { [type]: value })
      }
      if (this.plants.length) {
        console.log(this.plants)
        this.$notify.success({
          title: '提示',
          message: `此时显示 ${type} -- ${value} 中的所有植物`
        })
      } else {
        this.$notify.error({
          title: '注意',
          message: `当前条目 ${type} -- ${value}，校园内无如何植物`
        })
      }
    },
    showAllPlants() {
      this.plants = this.allPlants
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
.w100 {
  width: 100%;
}
.map-aside {
  position: relative;
}

.map-aside .allP-btn {
  box-sizing: border-box;
  width: 100%;
  margin: 20px 0;
}
.type-select {
  width: 90px;
}
</style>
