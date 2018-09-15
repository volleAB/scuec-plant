<template>
  <el-container id="admin">
    <el-aside width="180px"
              class="admin-aside">
      <el-menu background-color="#304156"
               active-text-color="#409eff"
               text-color="rgb(191, 203, 217)"
               router
               class="menu">
        <el-menu-item index="/admin/plantManager">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">植物管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container id="admin-content">
      <el-header class="header">
        <el-row>
          <el-col :span="2"
                  :push="22">
            <el-dropdown>
              <div class="avatar-container">
                <img :src="avatar"
                     alt="用户管理"
                     class="user-avatar">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="userManager">
                  信息管理
                </el-dropdown-item>
                <el-dropdown-item @click="exit">
                  退出系统
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view></router-view>
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
  methods: {
    userManager() {
      alert('user manager')
    },
    exit() {
      alert('exit')
    }
  }
}
</script>

<style>
</style>
