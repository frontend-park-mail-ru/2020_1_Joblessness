import JssssKit, { useState, Component } from './JssssKit'
import './style.sass'
import UserPage from './UserPage'

const App = () => (
  <div className='app-holder'>
    <UserPage/>
  </div>
)

JssssKit.render(<App/>, document.getElementById('root'));
