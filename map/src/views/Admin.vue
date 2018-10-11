<template>
  <el-container id="admin">
    <el-aside width="180px"
              class="admin-aside">
      <el-menu background-color="#2a3c57"
               active-text-color="#e7f0fe"
               text-color="rgb(191, 203, 217)"
               router
               class="menu">
        <el-menu-item index="/admin/overview">
          <i class="el-icon-zichangailan"></i>
          <span slot="title">概览</span>
        </el-menu-item>
        <el-menu-item index="/admin/plantManager">
          <i class="el-icon-icon-data-manager"></i>
          <span slot="title">信息管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/addPlant">
          <i class="el-icon-plus"></i>
          <span slot="title">添加植物</span>
        </el-menu-item>
        <el-menu-item index="/admin/addImage">
          <i class="el-icon-upload"></i>
          <span slot="title">上传图片</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container id="admin-content">
      <el-header class="header">
        <el-row type="flex"
                justify="end">
          <el-col :span="2">
            <div class="vcenter-container h100 ">
              <router-link :to="{name: 'contactUs'}">
                <span>联系我们</span>
              </router-link>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="vcenter-container h100">
              <router-link :to="{name: 'help'}">
                <span>帮助</span>
              </router-link>
            </div>
          </el-col>
          <el-col :span="2">
            <el-dropdown>
              <div class="avatar-container">
                <img :src="avatar"
                     alt="用户管理"
                     class="user-avatar">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link :to="{name: 'manager'}">信息管理</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link :to="{name: 'exit'}">退出系统</router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="main-view h100">
        <transition name="slide-fade"
                    mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Admin',
  data() {
    return {
      avatar: 'http://pctl0oi5b.bkt.clouddn.com/one.gif'
    }
  },
  methods: {}
}
</script>

<style>
</style>
