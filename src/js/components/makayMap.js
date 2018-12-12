import {makayExpeditionsGraph, makayEspecesGraph, makayMenaceesGraph} from './makayGraphs';

const makayCamps = {
    'expeditions' : {
        id: 'expeditions',
        title: 'Découvertes',
        coords: {
            x: 1720,
            y: 600
        },
        size: 1.1,
        desc: 'Depuis 2017, des expéditions ont menées afin de recenser les espèces du Makay',
        img_url: 'images/backgrounds/camp_1_bg.jpg'
    },
    'especes' : {
        id: 'especes',
        title: 'Les espèces',
        coords: {
            x: 1100,
            y: 1300
        },
        size: 1.1,
        desc: '<br>',
        img_url: 'images/backgrounds/camp_2_bg.jpg'
    },
    'endemicite' : {
        id: 'endemicite',
        title:'L\'endémicité',
        coords: {
            x: 1400,
            y: 2100
        },
        size: 1.1,
        desc: '<br>',
        img_url: 'images/backgrounds/camp_3_bg.jpg'
    },
    'menacees' : {
        id: 'menacees',
        title: 'Espèces menacées',
        coords: {
            x: 600,
            y: 2900
        },
        size: 1.1,
        desc: '<br>',
        img_url: 'images/backgrounds/camp_4_bg.jpg'
    },
};

const makayMap = {
    el: null,
    camps: makayCamps,
    campsObjects: [],
    init(){
        this.el = document.querySelector('#makaymap');
        for(let i in makayCamps){
            this.addCamp(makayCamps[i]);
        }
        // Initialize all graphs on the page
        makayExpeditionsGraph.init();
        makayEspecesGraph.init();
        makayMenaceesGraph.init();
    },
    addCamp(camp){
        let newCamp = new Camp(camp.id, camp.title, camp.coords, camp.size, camp.desc, camp.img_url);
        newCamp.build();
        this.campsObjects[camp.id] = newCamp;
        this.el.append(newCamp.g);
    },
};

class Camp{

    constructor(id, title, coords, size, desc, img_url){
        this.g = null;
        this.el = null;
        this.id = id;
        this.title = title;
        this.coords = coords;
        this.size = size;
        this.desc = desc;
        this.img_url = img_url;
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
        this.circle.setAttribute('style', 'transform: scale(1.2) translate(-25px,-18px)');
        this.g.append(this.circle);

        // On click on a camp
        this.g.addEventListener('click', (e)=>{
            e.preventDefault();
            this.updatePage();

            // change the graph values and parameters by passing the camp id
            let graphsHTML = document.querySelectorAll('.makay-content_graph');
            for (let i = 0; i<graphsHTML.length; i++){
                graphsHTML[i].classList.remove('active');
            }
            document.querySelector('.makay-'+this.id+'_graph').classList.add('active');
            makayExpeditionsGraph.graph.flush();
            makayEspecesGraph.changeGraph(this.id);

        });


    }
    updatePage(){
        const context =  document.querySelector('.makay-content_wrap');
        context.querySelector('.makay-content_header .makay-content_title').innerHTML = this.title;
        context.querySelector('.makay-content_header .makay-content_text').innerHTML = this.desc;
        document.querySelector('#frame_makay-map .frame_bg_img').setAttribute('src', this.img_url);

    }
}


export {makayMap};

