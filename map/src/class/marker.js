class Marker {
  constructor(opt) {
    this.data = opt
    this.marker = null
  }
  getMarker() {
    let point = new BMap.Point(this.data.lng, this.data.lat)
    this.marker = new BMap.Marker(point, {
      title: this.data.name
    })
  }
}

export default Marker
