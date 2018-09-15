<template>
  <el-container>
    <el-header height="40px">

    </el-header>
    <el-main>
      <el-table :data="plants"
                ref="table"
                v-loading="loading"
                style="width: 100%"
                max-height="580"
                stripe>

        <el-table-column type="selection"
                         width="40"></el-table-column>

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form inline
                     class="table-expand"
                     label-position="left">
              <el-form-item label="学名">
                <span>{{props.row.name}}</span>
              </el-form-item>
              <el-form-item label="英文学名">
                <span>{{props.row.eName}}</span>
              </el-form-item>
              <el-form-item label="科">
                <span>{{props.row.family}}</span>
              </el-form-item>
              <el-form-item label="属">
                <span>{{props.row.genus}}</span>
              </el-form-item>
              <el-form-item label="相对位置">
                <span>{{props.row.pos.street}}{{props.row.pos.building}}{{props.row.pos.distance}}</span>
              </el-form-item>
              <el-form-item label="绝对位置">
                <span>经度:{{props.row.lng}}</span>
                <span>纬度:{{props.row.lat}}</span>
              </el-form-item>
              <el-form-item label="形态描述">
                <span>{{props.row.sharp}}</span>
              </el-form-item>
              <el-form-item label="分布特点">
                <span>{{props.row.distribution}}</span>
              </el-form-item>
              <el-form-item label="药用价值">
                <span>{{props.row.value}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="name"
                         label="学名"
                         width="100"></el-table-column>
        <el-table-column prop="family"
                         label="科"
                         :filters="familyF"
                         :filter-method="filter"
                         width="100"></el-table-column>
        <el-table-column prop="genus"
                         label="属"
                         :filters="genusF"
                         :filter-method="filter"
                         width="100"></el-table-column>
        <el-table-column prop="value"
                         label="药用价值"
                         width="300"></el-table-column>
        <el-table-column prop="distribution"
                         label="分布特点"
                         width="480"></el-table-column>
        <el-table-column label="操作"
                         fixed="right"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="deletePlant(scope.row)"
                       type="text"
                       size="small">删除</el-button>
            <el-button @click="editPlant(scope.row)"
                       type="text"
                       size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'PlantManager',
  data() {
    return {
      plants: [],
      loading: true
    }
  },
  mounted() {
    this.getAllPlants()
  },
  methods: {
    deletePlant(row) {
      console.log(row)
    },
    editPlant(row) {
      console.log(row)
    },
    getAllPlants() {
      this.$axios
        .get('plant')
        .then(res => {
          this.loading = false
          return res.data
        })
        .then(data => {
          this.plants = data.result
        })
    },
    filter(value, row, col) {
      const property = col['property']
      return row[property] === value
    }
  },
  computed: {
    familyF() {
      let family = []
      this.plants.forEach(item => {
        family.push(item.family)
      })
      let familyF = this._.union(family).sort((a, b) => {
        return a.localeCompare(b, 'zh-CN')
      })
      return familyF.map(value => {
        return {
          text: value,
          value: value
        }
      })
    },
    genusF() {
      let genus = []
      this.plants.forEach(item => {
        genus.push(item.genus)
      })
      let genusF = this._.union(genus).sort((a, b) => {
        return a.localeCompare(b, 'zh-CN')
      })
      return genusF.map(value => {
        return {
          text: value,
          value: value
        }
      })
    }
  }
}
</script>

<style>
</style>
