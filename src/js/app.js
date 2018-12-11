
import TweenMax from "gsap/TweenMax";
import TimelineMax from "gsap/TimelineMax";
import {worldMap} from './components/worldMap';
import cursorBox from './components/cursorBox';
import {textSlidesAll, framesAll} from './components/frames';
import {campsAll} from "./components/makayMap";


const App = {
    init(){
        cursorBox.init();
        worldMap.init();

        let tlIntroOut = new TimelineMax();
        tlIntroOut.pause();
        tlIntroOut
            .to(document.querySelector('#frame_intro .frame_content_text h1'),1.2, {scaleX: 1.2, scaleY: 1.2, rotate: 0.1, ease: Power3.easeInOut, force3D: true, delay: 0.1}, '#start')
            .to(document.querySelector('#frame_intro .frame_content_text h1'),0.5, {autoAlpha:0 , ease: Power3.easeInOut, force3D: true}, '#start+=0.2')
            .to(document.querySelector('#frame_intro .frame_content_text .btn'),0.5, {autoAlpha:0, ease: Power3.easeInOut, force3D: true}, '#start+=0');


        document.querySelector('#toFrame2').addEventListener('click', (e) => {
            e.preventDefault();
            //Zoom sur l'image
            document.querySelector('#frame_intro .frame_bg_img').classList.add('zoomOut');
            //lance la timeline
            tlIntroOut.play();

            textSlidesAll.slides['makay'].showIn('world-map');
        });
        textSlidesAll.init();
        for(let i in framesAll){
            framesAll[i].init();
        }
        console.log(campsAll);

    }
};

export default App;
