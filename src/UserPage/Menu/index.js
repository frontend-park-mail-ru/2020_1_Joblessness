import JssssKit from '../../JssssKit'
import MenuItem from './MenuItem'
import './style.sass'
const Menu = () => (
  <div className='menu-holder'>
      <MenuItem>Главная</MenuItem>
      <MenuItem>Вакансии</MenuItem>
      <MenuItem>Предложения</MenuItem>
      <MenuItem>Компании</MenuItem>
  </div>
)

export default Menu