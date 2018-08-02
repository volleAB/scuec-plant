// 创建map对象

function Map(id) {
  this.map = new BMap.Map(id, {
    mapType: BMAP_NORMAL_MAP
  })
  this.infoWindowConfig = {
    width: 450,
    height: 400
  }
  this.plantData = null
}

Map.prototype.config = function() {
  this.map.centerAndZoom('中南民族大学', 19) // 缩放等级为 3 - 19
  // this.map.enableScrollWheelZoom()
  this.map.enableScrollWheelZoom()
  this.map.enableDragging()
  this.map.enableDoubleClickZoom()
  this.map.enableKeyboard()
  this.map.enableInertialDragging()
  this.map.enableContinuousZoom()
  this.map.enablePinchToZoom()
  this.map.enableAutoResize()
}

Map.prototype.addControl = function() {
  // this.map.addControl(
  //   new BMap.NavigationControl({
  //     type: BMAP_NAVIGATION_CONTROL_LARGE,
  //     anchor: BMAP_ANCHOR_TOP_LEFT,
  //     offset: new BMap.Size(20, -10)
  //   })
  // )

  this.map.addControl(
    new BMap.MapTypeControl({
      type: BMAP_MAPTYPE_CONTROL_HORIZONTAL,
      mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP, BMAP_PERSPECTIVE_MAP]
    })
  )

  this.map.addControl(
    new BMap.OverviewMapControl({
      isOpen: true,
      anchor: BMAP_ANCHOR_BOTTOM_RIGHT
    })
  )
  this.map.addControl(new BMap.ScaleControl())
}

Map.prototype.init = function() {
  this.map.setCurrentCity('武汉')
  this.config()
  this.addControl()
  this.addPlant()
  this._getPlantData()
}

Map.prototype.addPlant = function() {
  var plantLayer = new BMap.CustomLayer({
    geotableId: 192795,
    q: '', // 检索关键字
    tages: '', // 空格分隔的多字符串
    fliter: '' // 过滤条件
  })

  this.map.addTileLayer(plantLayer)

  // 增加点击事件监听 ，点击返回信息窗口

  plantLayer.addEventListener('onhotspotclick', this._showMessage.bind(this))
}

Map.prototype._createInfoWindow = function(info) {
  console.log(info)
  var html =
    '<div id="msg">\
  <div id="title-container" class="clearfix">\
    <h1 class="float-left">' +
    info.name +
    '</h1>\
    <h1 class="float-left">' +
    info.englishName +
    '</h1>\
  </div>\
  <div id="fg-container" class="clearfix">\
    <h2 id="fg" class="float-left">' +
    info.families +
    info.genus +
    '</h2>\
  </div>\
  <div id="img-container">\
    <img src="' +
    info.img +
    '" alt="description">\
  </div>\
  <div id="description-container" class="clearfix">\
    <h3 class="float-left">【形态与分布】</h3>\
    <p class="float-left">' +
    info.description +
    '</p>\
  </div>\
  <div id="value-container" class="clearfix">\
    <h3 class="float-left">【药用价值】</h3>\
    <p class="float-left">' +
    info.madicinalValue +
    '</p>\
  </div>\
</div>'
  var infoWindow = new BMap.InfoWindow(html, this.infoWindowConfig)
  return infoWindow
}

Map.prototype._showMessage = function(e) {
  // 获取poi对象
  var poi = e.customPoi
  var infoData = this._getPlantDataById(poi.poiId)
  // 创建信息窗口
  var infoWindow = this._createInfoWindow(infoData)
  var point = new BMap.Point(poi.point.lng, poi.point.lat)
  this.map.openInfoWindow(infoWindow, point)
}

Map.prototype._getPlantData = function() {
  fetch('http://pctl0oi5b.bkt.clouddn.com/plantData.json')
    .then(res => {
      return res.json()
    })
    .then(data => {
      this.plantData = data
    })
}

Map.prototype._getPlantDataById = function(id) {
  var data = this.plantData.find(value => {
    return value.poiId === id
  })
  return data
}
