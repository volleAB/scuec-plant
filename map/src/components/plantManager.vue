<template>
  <el-container class="plantM-container">
    <el-header class="plantM-header">
      <el-form ref="searchForm"
               :model="searchForm"
               inline>
        <el-form-item>
          <el-input placeholder="植物中文学名"
                    v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="科"
                    v-model="searchForm.family"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="属"
                    v-model="searchForm.genus"></el-input>
        </el-form-item>
        <el-form-item>

          <el-button @click="searchPlants"
                     type="primary">搜索</el-button>
          <!-- <el-button type="primary"
                     @click="addPlant">添加</el-button> -->
          <el-button @click="showAllPlants"
                     icon="el-icon-refresh">显示所有植物</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table :data="plants"
                class="plant-table"
                ref="table"
                v-loading="loading"
                style="width: 100%"
                max-height="540"
                highlight-current-row
                tooltip-effect="dark"
                @selection-change="addSelected">
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
              <el-form-item label="修订者">
                <span v-for="(item, index) in props.row.allReviser"
                      :key="index">{{item}} , </span>
              </el-form-item>
              <el-form-item label="最后修订者">
                <span>{{props.row.lastReviser}}</span>
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
                         label="分布特点"></el-table-column>
        <el-table-column label="操作"
                         fixed="right"
                         width="100">
          <template slot-scope="scope">

            <el-button @click="editPlant(scope.row)"
                       type="text"
                       size="mini">编辑</el-button>
            <el-button size="mini"
                       type="text"
                       class="delBtn"
                       @click="deletePlant(scope.row.name)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <edit-dialog :showFlag="showEditD"
                   :info="info"
                   @close="closeEditDialog"
                   @edit="submitEdit"></edit-dialog>
      <add-dialog :showFlag="showAddD"
                  @close="closeAddDialog"
                  @add="submitAdd"></add-dialog>
      <del-dialog :showFlag="showDelD"
                  :data="selectedPlants"
                  @close="closeDelDialog"></del-dialog>
    </el-main>
    <el-footer>
      <el-button type="primary"
                 @click="clearSelection">取消选择</el-button>
      <el-button type="danger"
                 @click="delAllSelected">批量删除</el-button>
    </el-footer>
  </el-container>
</template>

<script>
import EditDialog from '@/components/editDialog'
import AddDialog from '@/components/addDialog'
import DelDialog from '@/components/delDialog'
export default {
  name: 'PlantManager',
  components: {
    EditDialog,
    AddDialog,
    DelDialog
  },
  data() {
    return {
      showDelD: false,
      selectedPlants: [],
      plants: [],
      loading: true,
      searchForm: {
        name: '',
        family: '',
        genus: ''
      },
      info: {
        name: '木耳',
        eName: 'Auricularia auricular ',
        pos: {
          street: '腾飞路',
          building: '民族医学实验室',
          distance: '西侧10米'
        },
        lng: 114.398627,
        lat: 30.495661,
        allReviser: ['L.', 'Underw'],
        lastReviser: 'Underw',
        family: '木耳',
        genus: '木耳',
        img: '[./img/木耳]',
        sharp:
          '形状如耳朵，系寄生于枯木上的一种菌类，富含铁、钙、磷和维生素B1等。新鲜的木耳呈胶质片状，半透明，侧生在树木上，耳片直径5～10厘米，有弹性，腹面平滑下凹，边缘略上卷，背面凸起，并有极细的绒毛，呈黑褐色或茶褐色。干燥后收缩为角质状，硬而脆性，背面暗灰色或灰白色；入水后膨胀，可恢复原状，柔软而半透明，表面附有滑润的粘液。',
        distribution: '产于全国各地。',
        value:
          '全株：益气强身、活血、防治缺铁性贫血、养血驻颜、疏通肠胃、润滑肠道。'
      },
      showEditD: false,
      showAddD: false,
      nowName: null,
      researchFlag: false
    }
  },
  mounted() {
    this.getAllPlants()
  },

  methods: {
    deletePlant(name) {
      this.$confirm(`此操作将永久删除${name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('delPlant', name).then(() => {
            if (this.researchFlag) {
              let index = this.plants.findIndex(item => {
                return item.name === name
              })
              this.plants.splice(index, 1)
              this.researchFlag = false
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    editPlant(row) {
      row.allReviser = row.allReviser.join()
      this.info = row
      this.showEditD = true
      this.nowName = row.name
    },
    getAllPlants() {
      if (this.$store.getters.plant) {
        this.loading = false
        this.plants = this.$store.getters.plant
      } else {
        this.$store.dispatch('getPlant').then(() => {
          this.getAllPlants()
        })
      }
    },
    filter(value, row, col) {
      const property = col['property']
      return row[property] === value
    },
    closeEditDialog(...data) {
      this.showEditD = data[0]
    },
    closeAddDialog(...data) {
      this.showAddD = data[0]
    },
    closeDelDialog(...data) {
      this.showDelD = data[0]
    },
    submitEdit(info) {
      let index = this.plants.findIndex(el => {
        return el.name === this.nowName
      })
      let index2 = this.allPlants.findIndex(el => {
        return el.name === this.nowName
      })
      this.plants.splice(index, 1, info)
      this.allPlants.splice(index2, 1, info)
    },
    submitAdd(info) {
      this.$axios
        .post('addplant', info)
        .then(res => {
          this.$message({
            type: 'success',
            message: '信息添加成功'
          })
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: '信息添加失败'
          })
        })
    },
    searchPlants() {
      this._.forOwn(this.searchForm, (value, key) => {
        if (value) {
          this.plants = this._.filter(this.plants, {
            [key]: value
          })
          this.researchFlag = true
        }
      })
    },
    addPlant() {
      this.showAddD = true
    },
    showAllPlants() {
      this.plants = this.allPlants
    },
    toggleAllSelection() {
      this.$refs.table.toggleAllSelection()
    },
    clearSelection() {
      this.$refs.table.clearSelection()
    },
    delAllSelected() {
      if (this.selectedPlants.length) {
        this.showDelD = true
        this.$notify({
          type: 'success',
          message: '正在删除。。。'
        })
      } else {
        this.$notify({
          type: 'error',
          message: '未选中任何植物，无需删除！'
        })
      }
    },
    addSelected(selection) {
      this.selectedPlants = selection
    }
  },
  computed: {
    allPlants() {
      return this.$store.getters.plant
    },
    familyF() {
      return this.$store.getters.family.map(value => {
        return {
          text: value,
          value: value
        }
      })
    },
    genusF() {
      return this.$store.getters.genus.map(value => {
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
