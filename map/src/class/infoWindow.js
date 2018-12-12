/**
 * 定义图片的信息窗口，即鼠标移入所显示的窗口
 */
class InfoWindow {
  constructor() {}
  /**
   *
   * @param {object} info 植物信息
   * @returns {node} InfoWindow 合成信息之后的植物信息窗口
   */
  getInfoWindow(info) {
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
    // 窗口的基本设置
    let opts = {
      width: 0,
      height: 0
    }
    return new BMap.InfoWindow(html, opts)
  }
}

export default InfoWindow
