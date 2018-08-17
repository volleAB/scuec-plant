class Marker {
  constructor(opt) {
    this.data = opt
  }
  getMarker() {
    let point = new BMap.Point(this.data.lng, this.data.lat);
    let marker = new BMap.Marker(point, {
      title: this.data.name
    })
    return marker
  }
}

export default Marker
