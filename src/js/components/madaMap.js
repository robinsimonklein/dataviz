import cursorBox from './cursorBox';
import {endemiciteMadaGraph} from './madaGraphs';
import {framesAll, textSlidesAll} from "./frames";
const madaMap = {
    el: null,
    next: null,
    init(){
        this.el = document.querySelector('#frame_mada-map');
        this.next = this.el.querySelector('.makay-in-mada');
        this.next.addEventListener('click', ()=>{

            textSlidesAll.slides['makay'].showIn('makay-map');
            framesAll['mada-map'].showOut();
        });



        this.next.addEventListener('mouseenter', (e) => {
            cursorBox.show('Explorer le Makay', 'Cliquez pour continuer', '');
        });
        this.next.addEventListener('mousemove', (e) => {
            cursorBox.move(e);
        });
        this.next.addEventListener('mouseleave', (e) => {
            cursorBox.hide();
        });

        // Init all grpahs

        endemiciteMadaGraph.init();
    }
};

export {madaMap};