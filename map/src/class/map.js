import Marker from './marker'
// import icon from '../assets/data/plant'
// import InfoWindow from './infoWindow'
class Map {
  constructor(id) {
    this.map = new BMap.Map(id, {
      mapType: BMAP_NORMAL_MAP,
      enableMapClick: false
    })
    // this.style = {
    //   features: ['water', 'land', 'building', 'road'], // point 兴趣点
    //   style: 'normal' // dark , light
    // }
    this.animation = BMAP_ANIMATION_DROP
    //BMAP_ANIMATION_BOUNCE弹跳动画，BMAP_ANIMATION_DROP坠落动画，设置为 null 则没有动画
    this.markers = []
    // this.infoWindow = new InfoWindow()
    this.sw = new BMap.Point(114.390304, 30.483987)
    this.ne = new BMap.Point(114.410673, 30.503459)
    this.bounds = new BMap.Bounds(this.sw, this.ne)
  }

  init() {
    // 设置地图显示要素和风格
    // this.map.setMapStyle(this.style)
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
    try {
      BMapLib.AreaRestriction.setBounds(this.map, this.bounds)
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
  setMiniBounds() {
    this.sw = new BMap.Point(114.393488, 30.484656)
    this.ne = new BMap.Point(114.405117, 30.501705)
    this.bounds = new BMap.Bounds(this.sw, this.ne)
    // 设置地图显示范围, sw是西南点，ne是东北点
    try {
      BMapLib.AreaRestriction.setBounds(this.map, this.bounds)
    } catch (e) {
      alert(e)
    }
  }
}

export default Map
