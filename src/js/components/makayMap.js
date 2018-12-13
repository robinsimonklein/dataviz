import {makayExpeditionsGraph, makayEspecesGraph, makayMenaceesGraph} from './makayGraphs';
import TweenMax from "gsap/TweenMax";
import TimelineMax from "gsap/TimelineMax";
import {framesAll, textSlidesAll} from "./frames";

const makayCamps = {
    'expeditions' : {
        id: 'expeditions',
        title: 'De nouvelles  espèces découvertes à chaque expédition',
        coords: {
            x: 1720,
            y: 600
        },
        size: 1.1,
        desc: '',
        img_url: 'images/backgrounds/camp_1_bg.jpg',
        idNumber: 1,
    },
    'especes' : {
        id: 'especes',
        title: 'Une biodiversité extraordinaire',
        coords: {
            x: 1100,
            y: 1300
        },
        size: 1.1,
        desc: '',
        img_url: 'images/backgrounds/camp_2_bg.jpg',
        idNumber: 2,
    },
    'endemicite' : {
        id: 'endemicite',
        title:'Une endémicité remarquable',
        coords: {
            x: 1400,
            y: 2100
        },
        size: 1.1,
        desc: '',
        img_url: 'images/backgrounds/camp_3_bg.jpg',
        idNumber: 3,
    },
    'menacees' : {
        id: 'menacees',
        title: 'Le nombre d\'espèces menacées déjà conséquent' ,
        coords: {
            x: 600,
            y: 2900
        },
        size: 1.1,
        desc: '',
        img_url: 'images/backgrounds/camp_4_bg.jpg',
        idNumber: 4
    },
};

const makayMap = {
    el: null,
    camps: makayCamps,
    campsObjects: [],
    status: 1,
    init(){
        this.el = document.querySelector('#makaymap');
        for(let i in makayCamps){
            this.addCamp(makayCamps[i]);
        }
        // Initialize all graphs on the page
        makayExpeditionsGraph.init();
        makayEspecesGraph.init();
        makayMenaceesGraph.init();

        // Show the first camp
        this.campsObjects['expeditions'].updatePage();
        document.querySelector('.makay-expeditions_graph').classList.add('active');
        makayExpeditionsGraph.graph.flush();
        this.updateCamp(this.campsObjects['expeditions']);
        this.campsObjects['expeditions'].g.classList.add('visited');
        this.campsObjects['expeditions'].circle.style.opacity = 1;

        // Initialize the next button
        document.querySelector('.makay-map_next-btn').addEventListener('click', (e)=>{
            e.preventDefault();
            textSlidesAll.slides['world'].showIn('world-map');
            framesAll['makay-map'].showOut();

        })

    },
    addCamp(camp){
        let newCamp = new Camp(camp.id, camp.title, camp.coords, camp.size, camp.desc, camp.img_url, camp.idNumber);
        newCamp.build();
        this.campsObjects[camp.id] = newCamp;
        this.el.append(newCamp.g);
    },
    updateCamp(camp){
        if(camp.idNumber >= this.status && camp.idNumber <= this.status+1){
            this.status = camp.idNumber;

            //update the corner counter
            document.querySelector('.makay-map_camps-counter span').innerHTML = this.status+'/4';

            for(let i in this.campsObjects){
                if(this.campsObjects[i].idNumber <= this.status+1){
                    this.campsObjects[i].g.classList.add('unlocked');
                }
            }
        }
        if(this.status >= 4){
            document.querySelector('.makay-map_next-btn').classList.add('active');
        }
        console.log(this.status);
    }
};

class Camp{

    constructor(id, title, coords, size, desc, img_url, idNumber){
        this.g = null;
        this.el = null;
        this.id = id;
        this.title = title;
        this.coords = coords;
        this.size = size;
        this.desc = desc;
        this.img_url = img_url;
        this.idNumber = idNumber;
        this.unlocked = false;
        this.visited = false;
    }
    build(){
        this.g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.g.setAttribute('style', 'transform: scale('+this.size*0.1+') translate3d('+this.coords.x+'px, '+this.coords.y+'px, 0px);');
        this.g.setAttribute('class', 'camp');
        this.g.setAttribute('id', 'camp_'+this.id);
        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.el.setAttribute('d', 'M219.2,232.3l-92.8-183l21.8-43L135.9,0l-17.2,33.9L101.5,0L89.1,6.3l21.8,42.9l-92.8,183H0v14.3h238v-14.3\n' +
            '\tH219.2z M118.7,64.7l85,167.6h-43.1L119,150.4l-41.5,81.9H33.7L118.7,64.7z M93.2,232.3l25.8-50.9l25.8,50.9H93.2z');
        this.g.append(this.el);
        this.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.rect.setAttribute('width', 243);
        this.rect.setAttribute('height', 250);
        this.rect.setAttribute('fill', 'transparent');
        this.g.append(this.rect);
        this.circle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.circle.setAttribute('width', 250);
        this.circle.setAttribute('height', 250);
        this.circle.setAttribute('class', 'camp-cirle');
        this.circle.setAttribute('fill', 'url(#camppattern)');
        this.circle.setAttribute('style', 'transform: scale(1.2) translate(-25px,-18px); opacity: 0');
        this.g.append(this.circle);

        // On click on a camp
        this.g.addEventListener('click', (e)=>{
            e.preventDefault();

            if(this.idNumber <= makayMap.status+1) { // Seulement si le camp est débloqué


                this.updatePage();

                // change the graph values and parameters by passing the camp id
                let graphsHTML = document.querySelectorAll('.makay-content_graph');
                for (let i = 0; i<graphsHTML.length; i++){
                    graphsHTML[i].classList.remove('active');
                }
                document.querySelector('.makay-'+this.id+'_graph').classList.add('active');
                makayExpeditionsGraph.graph.flush();
                makayEspecesGraph.changeGraph(this.id);

                // Met à our la carte des campements
                this.g.classList.add('visited');
                this.circle.style.opacity = 1;
                makayMap.updateCamp(this);
            }

        });

        this.context =  document.querySelector('.makay-content_wrap');


    }
    updatePage(){

        let hideAnimation = new TimelineMax();
        let showAnimation = new TimelineMax().pause();
        showAnimation.from(document.querySelector('.makay-content_title'), 2, {autoAlpha: 0, ease: Power3.easeOut}, 0)
            .from(document.querySelector('.makay-content_text'), 2, {autoAlpha: 0, ease: Power3.easeOut}, 0.2)
            .from(document.querySelector('#frame_makay-map .frame_bg_img'), 2, {autoAlpha: 0, ease: Power3.easeOut}, 0);

        hideAnimation.to(document.querySelector('.makay-content_title'), 0.2, {autoAlpha: 0},0)
        .to(document.querySelector('.makay-content_text'), 0.2, {autoAlpha: 0},0)
        .to(document.querySelector('#frame_makay-map .frame_bg_img'), 0.2, {autoAlpha: 0},0)
        .eventCallback('onComplete', ()=>{
            // When text hidden
            this.context.querySelector('.makay-content_header .makay-content_title').innerHTML = this.title;
            this.context.querySelector('.makay-content_header .makay-content_title').visibility = 'hidden';
            this.context.querySelector('.makay-content_header .makay-content_text').innerHTML = this.desc;
            document.querySelector('#frame_makay-map .frame_bg_img').setAttribute('src', this.img_url);

            showAnimation.play();
        });
        hideAnimation.play();


    }
}


export {makayMap};

