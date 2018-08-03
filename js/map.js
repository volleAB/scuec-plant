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
  this.map.centerAndZoom(new BMap.Point(114.399076, 30.492039), 19) // 缩放等级为 3 - 19
  // this.map.enableScrollWheelZoom()
  this.map.disableScrollWheelZoom()
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
      mapTypes: [BMAP_NORMAL_MAP] // , BMAP_HYBRID_MAP, BMAP_PERSPECTIVE_MAP
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
  this.search('木耳', '木耳')
  //this._getPlantData()
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

Map.prototype._createWindowHtml = function(info) {
  var html =
    '<div id="msg">\
  <div id="title-container" class="clearfix">\
    <h1 class="float-left">' +
    info.title +
    '</h1>\
    <h1 class="float-left">' +
    info.englishTitle +
    '</h1>\
  </div>\
  <div id="fg-container" class="clearfix">\
    <h2 id="fg" class="float-left">' +
    info.families +
    '科 ' +
    info.genera +
    '属' +
    '</h2>\
  </div>\
  <div id="img-container">\
    <img src="' +
    info.img.big +
    '" alt="plant">\
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
    info.medicinalValue +
    '</p>\
  </div>\
</div>'

  return html
}

Map.prototype._showMessage = function(e) {
  // 获取poi对象
  var customPoi = e.customPoi
  var content = e.content
  // var infoData = this._getPlantDataById(poi.poiId)
  // 创建信息窗口
  var infoWindow = this._createWindowHtml(content)
  var point = new BMap.Point(customPoi.point.lng, customPoi.point.lat)
  var searchInfoWindow = new BMapLib.SearchInfoWindow(this.map, infoWindow, {
    title: customPoi.title, //标题
    width: 470, //宽度
    height: 420, //高度
    panel: 'panel', //检索结果面板
    enableAutoPan: true, //自动平移
    enableSendToPhone: true, //是否显示发送到手机按钮
    searchTypes: [
      BMAPLIB_TAB_SEARCH, //周边检索
      BMAPLIB_TAB_TO_HERE, //到这里去
      BMAPLIB_TAB_FROM_HERE //从这里出发
    ]
  })
  searchInfoWindow.open(point)
  // this.map.openInfoWindow(infoWindow, point)

  var img = document.querySelector('#img-container img')
  img.onload = function() {
    searchInfoWindow.redraw()
  }
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

Map.prototype.search = function(f, g) {
  var url =
    'http://api.map.baidu.com/geosearch/v3/local?region=武汉&ak=xSD7rlMlk5GKIjWzKjfOAquu0hmBVQMX&geotable_id=192795&filter=families:' +
    f +
    ',genera:' +
    g
  fetch(url, {
    method: 'GET'
  })
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data)
    })
}
