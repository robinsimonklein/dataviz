
import {worldMap} from './components/worldMap';
import cursorBox from './components/cursorBox';


const App = {
    init(){
        cursorBox.init();
        worldMap.init();
    }
};

export default App;