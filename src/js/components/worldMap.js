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
        desc: '',
        note: ''
    },
    'scoresby' : {
        id: 'scoresby',
        name: 'Scoresby Sund',
        coords: {
            cx: 410,
            cy: 170
        },
        size: 20,
        desc: '',
        land: 'Groenland'
    },
    'chiribequete' : {
        id: 'chiribequete',
        name: 'Chiribequete',
        coords: {
            cx: 270,
            cy: 470
        },
        size: 20,
        desc: '',
        land: 'Colombie'
    },
    'ituri' : {
        id: 'ituri',
        name: 'Ituri',
        coords: {
            cx: 540,
            cy: 475
        },
        size: 20,
        desc: '',
        land: 'RDC'
    },
    'hkakabo_razi' : {
        id: 'hkakabo_razi',
        name: 'Hkakabo Razi',
        coords: {
            cx: 740,
            cy: 392
        },
        size: 20,
        desc: '',
        land: 'Birmanie'
    },
    'konawe' : {
        id: 'konawe',
        name: 'Konawe',
        coords: {
            cx: 820,
            cy: 470
        },
        size: 10,
        desc: '',
        land: 'Indonésie'
    },
    'murung_raya' : {
        id: 'murung_raya',
        name: 'Murung Raya',
        coords: {
            cx: 780,
            cy: 470
        },
        size: 10,
        desc: '',
        land: 'Indonésie'
    },
    'nakanai' : {
        id: 'nakanai',
        name: 'Nakanai',
        coords: {
            cx: 900,
            cy: 483
        },
        size: 20,
        desc: '',
        land: 'Papouasie'
    },
    'cape_melville' : {
        id: 'cape_melville',
        name: 'Cape Melville',
        coords: {
            cx: 880,
            cy: 518
        },
        size: 20,
        desc: '',
        land: 'Australie'
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
        this.el.setAttribute('style', 'transform: scale('+2+'); transform-origin: '+this.zoom.x+'px '+this.zoom.y+'px 0px');
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

