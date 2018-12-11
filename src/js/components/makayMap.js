const makayCamps = {
    'expeditions' : {
        id: 'expeditions',
        name: 'Expéditions',
        coords: {
            x: 206,
            y: 118
        },
        size: 1.2,
        desc: 'Massif composé des produits de l’érosion d’immenses massifs de roches cristallines disparus il y a déjà plusieurs centaines de millions d’années, le Makay est l’une des œuvres de la nature les plus monumentales qui soit.',
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
        let newCamp = new Camp(camp.id, camp.name, camp.coords, camp.size, camp.desc);
        newCamp.draw();
        this.campsObjects[camp.id] = newCamp;
        this.el.append(newCamp.el);
        console.log(newCamp);
    },
};

class Camp{

    constructor(id, name, coords, size, desc){
        this.el = null;
        this.id = id;
        this.name = name;
        this.coords = coords;
        this.size = size;
        this.desc = desc;
    }
    draw(){
        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.el.setAttribute('d', 'M219.2,232.3l-92.8-183l21.8-43L135.9,0l-17.2,33.9L101.5,0L89.1,6.3l21.8,42.9l-92.8,183H0v14.3h238v-14.3\n' +
            '\tH219.2z M118.7,64.7l85,167.6h-43.1L119,150.4l-41.5,81.9H33.7L118.7,64.7z M93.2,232.3l25.8-50.9l25.8,50.9H93.2z');
        this.el.setAttribute('transform', 'translate('+this.coords.x+','+this.coords.y+')');
        this.el.setAttribute('style', 'transform: scale('+this.size*0.1+'); transform-origin: center');
        this.el.setAttribute('class', 'camp');
        this.el.setAttribute('id', 'camp_'+this.id);

    }
}


export {makayMap};

