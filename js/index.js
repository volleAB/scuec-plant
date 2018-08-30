var map = new Map('map')

map.init()
var geolocation = new BMap.Geolocation()
geolocation.getCurrentPosition(
  function(r) {
    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      var mk = new BMap.Marker(r.point)
      map.addOverlay(mk)
      map.panTo(r.point)
      alert('您的位置：' + r.point.lng + ',' + r.point.lat)
    } else {
      alert('failed' + this.getStatus())
    }
  },
  { enableHighAccuracy: true }
)

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

function success(pos) {
  var crd = pos.coords

  console.log('Your current position is:')
  console.log('Latitude : ' + crd.latitude)
  console.log('Longitude: ' + crd.longitude)
  console.log('More or less ' + crd.accuracy + ' meters.')
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message)
}

navigator.geolocation.getCurrentPosition(success, error, options)

let icon = new BMap.Icon('SnowPea.gif', new BMap.Size(160, 160))
let marker = new BMap.Marker(new BMap.Point(114.398627, 30.495661), {
  icon: icon
})

map.map.addOverlay(marker)
