import cursorBox from './cursorBox';

const lostworlds = {
    'makay' : {
        id: 'makay',
        name: 'Massif du Makay',
        coords: {
            cx: 606,
            cy: 518
        },
        size: 20,
        desc: 'Massif composé des produits de l’érosion d’immenses massifs de roches cristallines disparus il y a déjà plusieurs centaines de millions d’années, le Makay est l’une des œuvres de la nature les plus monumentales qui soit.',
        note: 'Cliquez sur <strong>Makay</strong> pour explorer'
    },
    'groenland' : {
        id: 'groenland',
        name: 'Groenland',
        coords: {
            cx: 410,
            cy: 170
        },
        size: 30,
        desc: 'Groenland'
    },
    'desert_sahara' : {
        id: 'desert_sahara',
        name: 'Désert du Sahara',
        coords: {
            cx: 510,
            cy: 420
        },
        size: 40,
        desc: 'Désert du Sahara en Afrique'
    },
    'amazonie' : {
        id: 'amazonie',
        name: 'Amazonie',
        coords: {
            cx: 310,
            cy: 500
        },
        size: 40,
        desc: 'Amazonie'
    },
    'indonesie' : {
        id: 'indonesie',
        name: 'Massif de Matarombeo',
        coords: {
            cx: 810,
            cy: 460
        },
        size: 20,
        desc: 'Le massif de Matarombeo en Indonésie'
    },
};

const worldMap = {
    el: null,
    lostWorlds: lostworlds,
    lostWorldsObjects: [],
    zoom: {
        x: 606,
        y: 518,
        depth: 4
    },
    init(){
        this.el = document.querySelector('#worldmap');
        for(let i in this.lostWorlds){
            this.addPoint(lostworlds[i]);
        }
        //this.zoomIn();
    },
    addPoint(point){
        let newPoint = new LostWorld(point.id, point.name, point.coords, point.size, point.desc);
        newPoint.draw();
        this.lostWorldsObjects[point.id] = newPoint;
        this.el.append(newPoint.el);
    },
    zoomIn(){
        let vWidth = this.el.innerWidth;
        let vHeight = this.el.innerHeight;
        this.el.setAttribute('style', 'transform: scale('+2+'); transform-origin: '+this.zoom.x+'px '+this.zoom.y+'px 0px')
    }
};

class LostWorld{

    constructor(id, name, coords, size, desc){
        this.el = null;
        this.id = id;
        this.name = name;
        this.coords = coords;
        this.size = size;
        this.desc = desc;
    }
    draw(){
        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.el.setAttribute('cx', this.coords.cx);
        this.el.setAttribute('cy', this.coords.cy);
        this.el.setAttribute('r', this.size);
        this.el.setAttribute('class', 'bubble');
        this.el.setAttribute('id', this.id);
        this.el.setAttribute('style', 'transform-origin: '+this.coords.cx+'px '+this.coords.cy+'px 0px');
        this.el.setAttribute('fill', 'url(#imgpattern)');


        this.el.addEventListener('mouseenter', (e) => {
            cursorBox.show(this.name, this.desc, this.note);
        });
        this.el.addEventListener('mousemove', (e) => {
            cursorBox.move(e);
        });
        this.el.addEventListener('mouseleave', (e) => {
            cursorBox.hide();
        });
    }
}


export {worldMap};

