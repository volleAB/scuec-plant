function Marker(opt) {
  this.lng = opt.lng
  this.lat = opt.lat
  this.name = opt.name
  this.street = opt.pos.street
  this.building = opt.pos.building
  this.distance = opt.pos.distance
  this.infoWindow = null
}

Marker.prototype.init = function() {
  let point = new BMap.Point(this.lng, this.lat)
  let marker = new BMap.Marker(point, {
    title: this.name
  })
  marker.addEventListener('click', () => {
    let info = this.getInfo()
    this.getInfoWindow(info)
    map.map.openInfoWindow(this.infoWindow, new BMap.Point(this.lng, this.lat))
  })
  return marker
}

Marker.prototype.getInfo = function() {
  // 根据name来获取详情
  let _this = this
  return map.data.find(item => {
    return item.name.includes(_this.name)
  })
}
Marker.prototype.getInfoWindow = function(info) {
  let allReviser = info.allReviser.join(' ，')
  var html = `<div id="msg">
  <div class="title-container" class="clearfix">
    <h1>${info.name}</h1>
    <h1>${info.eName}</h1>
  </div>
  <div id="re-container" class="clearfix">
    <p>修订者：${allReviser}</p>
    <p>最后修订者: ${info.lastReviser} </p>
  </div>
  <div id="fg-container" class="clearfix">
    <p id="fg" class="float-left">
    ${info.family} 科 ${info.genus} 属
    </p>
  </div>
  <div id="img-container">
    <img src="${info.img}" alt=${info.name}>
  </div>
  <div id="sharp-container" class="clearfix">
    <p class="content">
    <span class="minTitle">【形态】</span>${info.sharp}</p>
  </div>
  <div id="destribution-container" class="clearfix">
    <p class="content">
    <span class="minTitle">【分布】</span>${info.destribution}
    </p>
  </div>
  <div id="value-container" class="clearfix">
    <p class="content">
    <span class="minTitle">【药用价值】</span>${info.value}
    </p>
  </div>
</div>`
  let opts = {
    width: 0,
    height: 0
  }
  this.infoWindow = new BMap.InfoWindow(html, opts)
}
