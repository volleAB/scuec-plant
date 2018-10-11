<template>
  <el-container class="addImg-container">
    <el-header class="addImg-header">
      <el-select v-model="plantName"
                 class="name-select"
                 filterable
                 placeholder="请选择">
        <el-option v-for="item in nameOptions"
                   :key="item.value"
                   :label="item.value"
                   :value="item.value"></el-option>
      </el-select>
    </el-header>
    <el-main>
      <el-upload :action="imgAction"
                 list-type="picture-card">
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'addImage',
  data() {
    return {
      plantName: ''
    }
  },
  computed: {
    ...mapGetters(['nameOptions'])
  }
}
</script>

<style>
</style>
