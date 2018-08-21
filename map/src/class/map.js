import Marker from './marker'
// import InfoWindow from './infoWindow'
class Map {
  constructor(id) {
    this.map = new BMap.Map(id, {
      mapType: BMAP_NORMAL_MAP
    })
    this.animation = BMAP_ANIMATION_DROP
    //BMAP_ANIMATION_BOUNCE弹跳动画，BMAP_ANIMATION_DROP坠落动画，设置为 null 则没有动画
    this.markers = []
    // this.infoWindow = new InfoWindow()
  }
  init() {
    this.map.centerAndZoom(new BMap.Point(114.399107, 30.493782), 19)
    this.map.disableScrollWheelZoom()
    this.map.enableDragging()
    this.map.disableDoubleClickZoom()
    this.map.enableKeyboard()
    this.map.enableInertialDragging()
    this.map.disableContinuousZoom()
    this.map.disablePinchToZoom()
    this.map.enableAutoResize()
    // 设置地图显示范围, sw是西南点，ne是东北点
    let sw = new BMap.Point(114.394786, 30.485107)
    let ne = new BMap.Point(114.405189, 30.501724)
    let b = new BMap.Bounds(sw, ne)
    try {
      BMapLib.AreaRestriction.setBounds(this.map, b)
    } catch (e) {
      alert(e)
    }
  }
  addPlant(plant) {
    let _this = this
    plant.forEach(function(p) {
      let marker = new Marker(p)
      marker.getMarker()
      _this.map.addOverlay(marker.marker)
      marker.marker.setAnimation(_this.animation)
      _this.markers.push(marker)
    })
  }
  removePlant() {
    this.markers = []
    this.map.clearOverlays() // 清除所有覆盖物
  }
}

export default Map
