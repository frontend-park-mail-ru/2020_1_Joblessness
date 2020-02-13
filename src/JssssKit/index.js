import globalVars from './vars'
import { render } from './Render'
import { createElement } from './CreateElement'
import { useState } from './Hooks'
import { Component } from './Component'
import { workLoop } from './worker'
//@TODO request single workloop on import
if( window.JssssKit.timesImported <= 1)
  window.requestIdleCallback(workLoop);
const jssssKit = {
  render,
  createElement,
  useState,
  Component
}
//@TODO class Components
export {
  render,
  createElement,
  useState,
  Component
}
export default jssssKit