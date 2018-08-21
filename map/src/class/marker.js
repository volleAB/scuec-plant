class Marker {
  constructor(opt) {
    this.data = opt
    this.marker = null
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
  }
}

export default Marker
