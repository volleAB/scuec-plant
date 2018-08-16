function Map(id) {
  this.map = new BMap.Map(id, {
    mapType: BMAP_NORMAL_MAP
  })
  // 相对于HTML文件的路径
  this.url = './asset/data/test0814.json'
  this.data = null
}

Map.prototype.init = function() {
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
  this.getPlantData()
}

Map.prototype.addAllPlant = function() {
  let _this = this
  this.data.forEach(function(p) {
    let point = new BMap.Point(p.lng, p.lat)
    let marker = new BMap.Marker(point)
    _this.map.addOverlay(marker)
  })
}

Map.prototype.getPlantData = function() {
  let _this = this
  fetch(this.url)
    .then(function(res) {
      return res.json()
    })
    .then(function(data) {
      console.log(`date ${data.date} ---- description ${data.description}`)
      _this.data = data.data
      _this.addAllPlant.call(_this)
    })
}
