const makayCamps = {
    'expeditions' : {
        id: 'expeditions',
        title: 'Découvertes',
        coords: {
            x: 1560,
            y: 400
        },
        size: 1.2,
        desc: 'Evolution du nombre d\'espèces recencées sur les 11 ans d\'expéditions de 2007 à 2018',
        img_url: ''
    },
    'especes' : {
        id: 'especes',
        title: 'Espèces découvertes à Makay',
        coords: {
            x: 1360,
            y: 1200
        },
        size: 1.2,
        desc: 'Massif composé des produits de l’érosion d’immenses massifs de roches cristallines disparus il y a déjà plusieurs centaines de millions d’années, le Makay est l’une des œuvres de la nature les plus monumentales qui soit.',
        img_url: ''
    },
    'endemicite' : {
        id: 'endemicite',
        title: 'Endémicité',
        coords: {
            x: 960,
            y: 2100
        },
        size: 1.2,
        desc: 'Massif composé des produits de l’érosion d’immenses massifs de roches cristallines disparus il y a déjà plusieurs centaines de millions d’années, le Makay est l’une des œuvres de la nature les plus monumentales qui soit.',
        img_url: ''
    },
    'menacees' : {
        id: 'menacees',
        title: 'Espèces menacées',
        coords: {
            x: 500,
            y: 2700
        },
        size: 1.2,
        desc: 'Massif composé des produits de l’érosion d’immenses massifs de roches cristallines disparus il y a déjà plusieurs centaines de millions d’années, le Makay est l’une des œuvres de la nature les plus monumentales qui soit.',
        img_url: ''
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
    },
    addCamp(camp){
        let newCamp = new Camp(camp.id, camp.title, camp.coords, camp.size, camp.desc);
        newCamp.draw();
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
    draw(){
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
        this.g.addEventListener('click', (e)=>{
            e.preventDefault();
            this.updatePage();
        });
    }
    updatePage(){
        const context =  document.querySelector('.makay-content_wrap');
        context.querySelector('.makay-content_header .makay-content_title').innerHTML = this.title;
        context.querySelector('.makay-content_header .makay-content_text').innerHTML = this.desc;

    }
}


export {makayMap};

