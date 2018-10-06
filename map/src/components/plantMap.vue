<template>
  <div class="map h100">
    <div class="plantMap h100"
         id="allmap"></div>
    <info-dialog :showDialogFlag="show"
                 :plantInfo="plantInfo"
                 @closeDialog="closeDialog"
                 @toHere="toHere"></info-dialog>
  </div>
</template>

<script>
import Map from '../class/map'
import infoDialog from './infoDialog'
import BMap from 'BMap'
export default {
  name: 'plantMap',
  components: {
    infoDialog
  },
  props: {
    plants: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      map: null,
      show: false,
      currentPos: null,
      targetPos: null,
      walking: null,
      plantInfo: {
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
      }
    }
  },
  mounted() {
    this.createMap()
    this.$notify({
      title: '获取当前位置',
      message: '正在获取当前位置，请等待。。。'
    })
    this.initWalking()
  },
  methods: {
    createMap() {
      let _this = this
      this.map = new Map('allmap')
      this.map.init()
      this.map.addPlant(this.plants)
      this.clickHandler()
    },
    clickHandler() {
      let _this = this
      this.map.markers.forEach(item => {
        let data = item.data
        item.marker.addEventListener('click', () => {
          _this.show = true
          _this.plantInfo = data
        })
      })
    },
    closeDialog(...data) {
      this.show = data[0]
    },
    toHere() {
      // 获取当前位置

      this.show = false
      this.targetPos = new BMap.Point(this.plantInfo.lng, this.plantInfo.lat)
      this.walking.search(this.currentPos, this.targetPos)
    },
    initWalking() {
      let map = this.map.map
      let walkingOpt = {
        renderOptions: {
          map: map,
          autoViewport: false
        }
      }
      this.getCureentPosByH5()
        .then(() => {
          this.$notify.success({
            title: '提示',
            message: '当前位置已获取，可使用导航功能。'
          })
          this.walking = new BMap.WalkingRoute(map, walkingOpt)
        })
        .catch(err => {
          this.getCureentPosByBaidu()
            .then(() => {
              this.$notify.success({
                title: '提示',
                message: '当前位置已获取，可使用导航功能。'
              })
              this.walking = new BMap.WalkingRoute(map, walkingOpt)
            })
            .catch(err => {
              this.$notify.error({
                title: '提示',
                message: '位置信息获取失败，将无法使用导航功能。'
              })
            })
        })
    },
    clearWalking() {
      this.walking.clearResults()
    },
    getCureentPosByBaidu() {
      // this.currentPos = new BMap.Point(114.399538, 30.494813)
      // 使用百度API的定位，来确定起始点
      //关于状态码
      //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
      //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
      //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
      //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
      //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
      //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
      //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
      //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
      //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
      return new Promise((resolve, reject) => {
        let geolocation = new BMap.Geolocation()
        let opts = {
          enableHighAccuracy: false
        }
        let _this = this
        geolocation.getCurrentPosition(dispose, opts)
        function dispose(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            _this.currentPos = r.point
            let marker = new BMap.Marker(r.point, {
              title: '当前所在位置',
              // TODO: 设置一个当前位置的图标
              icon: ''
            })
            _this.map.map.addOverlay(marker)
            _this.map.map.panTo(r.point)
            resolve()
            console.log(`current pos (${r.point.lng}, ${r.point.lat})`)
          } else {
            reject(this.getStatus())
            console.error(`failed ${this.getStatus()}`)
          }
        }
      })
    },
    getCureentPosByH5() {
      let _this = this
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(successFunc, failedFunc)
          function successFunc(pos) {
            let x = pos.coords.longitude
            let y = pos.coords.latitude
            let point = [new BMap.Point(x, y)]
            let convertor = new BMap.Convertor()
            let translateFun = function(result) {
              console.log(result)
              _this.currentPos = result.points[0]
              let marker = new BMap.Marker(result.points[0], {
                title: '当前所在位置',
                // TODO: 设置一个当前位置的图标
                icon: ''
              })
              _this.map.map.addOverlay(marker)
              _this.map.map.panTo(result.points[0])
              resolve()
            }
            convertor.translate(point, 1, 5, translateFun)
          }
          function failedFunc(error) {
            console.log(error)
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.error('User denied the request for Geolocation.')
                break
              case error.POSITION_UNAVAILABLE:
                console.error('Location information is unavailable.')
                break
              case error.TIMEOUT:
                console.error('The request to get user location timed out.')
                break
              case error.UNKNOWN_ERROR:
                console.error('An unknown error occurred.')
                break
            }
            reject()
          }
        }
      })
    }
  },
  watch: {
    plants: function() {
      let center = new BMap.Point(this.plants[0].lng, this.plants[0].lat)
      // this.clearWalking()
      this.map.removePlant()
      this.map.addPlant(this.plants)
      this.clickHandler()
      this.map.map.panTo(center)
    }
  }
}
</script>
