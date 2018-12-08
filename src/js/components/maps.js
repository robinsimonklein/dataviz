import d3 from 'd3';
import topojson from 'topojson';

const lostworlds = {
    'makay' : {
        id: 'makay',
        name: 'Makay',
        coords: {
            cx: 606,
            cy: 518
        },
        size: 20,
        desc: 'Le massif du Makay'
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
        name: 'Le massif de Matarombeo',
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
    init(){
        this.el = document.querySelector('#worldmap');
        for(let i in this.lostWorlds){
            console.log(lostworlds[i]);
            this.addPoint(lostworlds[i]);
        }
    },
    addPoint(point){
        let newPoint = new LostWorld(point.id, point.name, point.coords, point.size, point.desc);
        newPoint.draw();
        this.el.append(newPoint.el);
    }
};

class LostWorld{

    constructor(id, name, coords, size, desc){
        this.el = null;
        this.id = id;
        this.name = name;
        this.coords = coords;
        this.size = size;
        this.description = desc;
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
    }
}



export {worldMap};

