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
    Grid,
    GridItem,
    Dialog,
    Tab,
    Tabs,
    List,
    PullRefresh,
    Popup,
    Search,
    ImagePreview,
    Popover
} from "vant";


Vue.use(Tabbar).use(Button).use(TabbarItem).use(Icon).use(NavBar).use(Field).use(Toast)

Vue.use(Cell).use(Form).use(CountDown).use(VanImage).use(Grid).use(GridItem).use(Dialog)
Vue.use(CellGroup)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(Search)
  .use(ImagePreview)
  .use(Popover);
Vue.use(PullRefresh).use(Popup)