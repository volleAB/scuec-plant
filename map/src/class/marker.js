class Marker {
  constructor(opt) {
    this.data = opt
    this.marker = null
    this.window = null
    this.iconUrl = 'http://pctl0oi5b.bkt.clouddn.com/SnowPea.gif'
    this.localUrl = './static/img/SnowPea.gif'
    this.icon = new BMap.Icon(this.localUrl, new BMap.Size(26, 26))
    this.icon.setImageSize(new BMap.Size(26, 26))
  }

  getMarker() {
    let point = new BMap.Point(this.data.lng, this.data.lat)
    // let icon = new BMap.Icon(this.localUrl, this.iconSize)
    this.marker = new BMap.Marker(point, {
      title: this.data.name,
      icon: this.icon
    })
    this.initNoticeWindow()
    this.setNoticeWindow()
  }
  setNoticeWindow() {
    this.marker.addEventListener('mouseover', e => {
      this.marker.openInfoWindow(this.window)
    })
    this.marker.addEventListener('mouseout', e => {
      this.marker.closeInfoWindow()
    })
  }
  initNoticeWindow() {
    let html = `
      <div id="notice-container">
        <h3 id="name">${this.data.name}</h3>
        <span id="family">${this.data.family}科</span>
        <span id="genus">${this.data.genus}属</span>
        <div id="img-container"><img src="./static/img/demo.png" alt="实例图片  "></div>
      </div>
    `
    let opts = {
      height: 0,
      width: 0,
      enableCloseOnClick: false,
      enableAutoPan: false
    }
    this.window = new BMap.InfoWindow(html, opts)
  }
}

export default Marker
