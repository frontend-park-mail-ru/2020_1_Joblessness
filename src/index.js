import JssssKit, { useState, Component } from './JssssKit'
import './style.sass'
import Counter from './counterExample'

const container = document.getElementById("root");
JssssKit.render(<Counter/>, container);
