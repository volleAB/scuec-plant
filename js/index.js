var map = new Map('map')

map.init()

var updateBtn = document.querySelector('#select-btn')

updateBtn.onclick = function() {
  var f = familiesFilter.length > 0 ? familiesFilter : ''
  var g = generaFilter.length > 0 ? generaFilter : ''
  map.search(f, g)
}
