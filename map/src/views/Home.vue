<template>
  <div id="app">
    <el-container class="h100"
                  v-loading.fullscreen.lock="loading">
      <el-aside class="map-aside box-shadow">
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
                <el-menu-item v-for="(item, index) in family"
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
                <el-menu-item v-for="(item, index) in genus"
                              :key="index"
                              :index="`2-${index}`">
                  <div @click="update"
                       data-type="genus">{{item}}</div>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-streetsign"></i>
                  <span>道路</span>
                </template>
                <el-menu-item v-for="(item, index) in street"
                              :key="index"
                              :index="`3-${index}`">
                  <div @click="update"
                       data-type="street">{{item}}</div>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-building"></i>
                  <span>建筑</span>
                </template>
                <el-menu-item v-for="(item, index) in building"
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
          <el-col :span="12">
            <div class="vcenter-container">
              <el-button type="primary"
                         @click="showAllPlants">全部植物</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="vcenter-container">
              <el-button @click="showOverview">信息概览</el-button>
            </div>
          </el-col>
        </el-row>
      </el-aside>
      <overview-dialog :showFlag="showOFlag"
                       @closeDialog="closeODialog"></overview-dialog>
      <el-main class="main-bg-color">
        <plant-map :plants="plants"></plant-map>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import plantMap from '@/components/plantMap'
import overviewDialog from '@/components/overviewDialog'
import { mapGetters } from 'vuex'
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
      showOFlag: false,
      plants: [],
      loading: false,
      search: {
        type: 'family',
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
          value: 'family'
        },
        {
          label: '属',
          value: 'genus'
        },
        {
          label: '道路',
          value: 'street'
        },
        {
          label: '建筑',
          value: 'building'
        }
      ]
    }
  },
  components: {
    plantMap,
    overviewDialog
  },
  computed: {
    ...mapGetters(['building', 'street', 'genus', 'family', 'plant'])
  },
  methods: {
    // TODO: 处理事件的重复触发，导致的地图抖动
    update(e) {
      let fg = ['family', 'genus']
      let el = e.target
      let value = el.innerText
      let type = el.dataset.type
      this.$notify.success({
        title: '提示',
        message: `此时显示 ${type} -- ${value} 中的所有植物`
      })
      if (!fg.includes(type)) {
        this.plants = this._.filter(this.plant, {
          pos: {
            [type]: value
          }
        })
      } else {
        this.plants = this._.filter(this.plant, { [type]: value })
      }
    },
    searchPlant() {
      let fg = ['family', 'genus']
      let { type, value } = this.search
      if (!type || !value) {
        this.plants = this.plant
        console.log('type null or value null')
        return
      }
      if (!fg.includes(type)) {
        this.plants = this._.filter(this.plant, {
          pos: {
            [type]: value
          }
        })
      } else {
        this.plants = this._.filter(this.plant, { [type]: value })
      }
      if (this.plants.length) {
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
      this.plants = this.plant
      this.$notify.success({
        title: '提示',
        message: '已在地图上显示全部植物'
      })
    },
    showOverview() {
      this.showOFlag = true
    },
    closeODialog(...data) {
      this.showOFlag = data[0]
    }
  },
  mounted() {
    this.plants = this.$store.getters.plant
  }
}
</script>

<style>
</style>
