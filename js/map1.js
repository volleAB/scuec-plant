// 创建map对象
var familiesFilter = []
var generaFilter = []
function Map(id) {
  this.map = new BMap.Map(id, {
    mapType: BMAP_NORMAL_MAP
  })
  this.plantData = null
  this.plantLayer = null
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
  // this.addControl()
  // this.addPlant()
  // this.fgInit()
  //this._getPlantData()
}

Map.prototype.addPlant = function() {
  this.plantLayer = new BMap.CustomLayer({
    geotableId: 192795,
    q: '', // 检索关键字
    tages: '', // 空格分隔的多字符串
    filter: '' // 过滤条件
  })
  this.map.addTileLayer(this.plantLayer)

  // 增加点击事件监听 ，点击返回信息窗口

  this.plantLayer.addEventListener(
    'onhotspotclick',
    this._showMessage.bind(this)
  )
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
  var filter = []
  if (f) {
    filter.push('familiesId:[' + f + ']')
  }
  if (g) {
    filter.push('generaId:[' + g + ']')
  }
  console.log(filter.join('|'))
  if (this.plantLayer) {
    this.map.removeTileLayer(this.plantLayer)
    console.log('remove')
  }
  this.plantLayer = new BMap.CustomLayer({
    geotableId: 192795,
    q: '', // 检索关键字
    tages: '', // 空格分隔的多字符串
    filter: filter.join('|') // 过滤条件
  })

  this.map.addTileLayer(this.plantLayer)
  this.plantLayer.addEventListener(
    'onhotspotclick',
    this._showMessage.bind(this)
  )
  // TODO: 为什么使用fetch就无法做到
}

Map.prototype.fgInit = function() {
  var url = 'http://api.map.baidu.com/geosearch/v3/local?callback=?'
  $.ajax({
    type: 'GET',
    url: url,
    contentType: 'application/json',
    data: {
      q: '', //检索关键字
      region: '中南民族大学', //北京的城市id
      filter: '',
      scope: '2', //显示详细信息
      geotable_id: 192795,
      ak: 'xSD7rlMlk5GKIjWzKjfOAquu0hmBVQMX' //用户ak
    },
    dataType: 'json',
    success: function(res) {
      var content = res.contents
      content.forEach(value => {
        _createElement(value.families, value.familiesId, '.families')
        _createElement(value.genera, value.generaId, '.genera')
      })

      var allFamilies = document.querySelectorAll('.families .name')
      var allGenera = document.querySelectorAll('.genera .name')

      allFamilies.forEach(function(item) {
        item.addEventListener('click', clickListenerF, false)
      })

      allGenera.forEach(function(item) {
        item.addEventListener('click', clickListenerG, false)
      })
      function clickListenerF() {
        this.classList.toggle('active')
        var id = this.getAttribute('id')
        var flag = familiesFilter.findIndex((value, index) => {
          return id === value
        })
        if (flag === -1) {
          familiesFilter.push(id)
        } else {
          familiesFilter.splice(flag, 1)
        }

        // var filter = []
        // if (familiesFilter) {
        //   filter.push('familiesId:[' + familiesFilter + ']')
        // } else if (generaFilter) {
        //   filter.push('generaId:[' + generaFilter + ']')
        // } else {
        //   console.log('请输入查询条件')
        // }
      }

      function clickListenerG() {
        this.classList.toggle('active')
        var id = this.getAttribute('id')
        var flag = familiesFilter.findIndex(value => {
          return id === value
        })
        if (flag === -1) {
          generaFilter.push(id)
        } else {
          generaFilter.splice(flag, 1)
        }
      }
      function _createElement(name, id, fg) {
        var span = document.createElement('span')
        span.classList.add('name')
        var text = document.createTextNode(name)
        var num = document.createAttribute('id')
        num.value = id
        span.setAttributeNode(num)
        span.appendChild(text)
        var container = document.querySelectorAll(fg)[0]
        container.appendChild(span)
      }
    },
    error: function() {
      // console.log('error')
    }
  })
}
