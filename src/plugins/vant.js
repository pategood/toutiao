import Vue from 'vue'
import {
  Button,
  Toast,
  Tabbar,
  TabbarItem,
  Icon,
  NavBar,
  Field,
  Cell,
  CellGroup,
  Form,
  CountDown,
  Image as VanImage,
  Grid, GridItem,
  Dialog
} from 'vant'

Vue.use(Tabbar).use(Button).use(TabbarItem).use(Icon).use(NavBar).use(Field).use(Toast)

Vue.use(Cell).use(Form).use(CountDown).use(VanImage).use(Grid).use(GridItem).use(Dialog)
Vue.use(CellGroup)
