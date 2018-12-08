import d3 from 'd3';
import topojson from 'topojson';

const lostworlds =

const worldMap = {
    el: null,
    lostWorlds: '',
    init(){
        this.el = document.querySelector('#worldmap');
        this.addPoint(
            'Makay',
            {
                cx: 100,
                cy: 200
            },
            50,
            'Le monde perdu du makay'
        );


    },
    addPoint(name, coords, size, description){
        let point = new LostWorld(name, coords, size, description);
        point.draw();
        this.el.append(point.el);
        console.log(point);
    }
};

class LostWorld{

    constructor(name, coords, size, description){
        this.el = null;
        this.name = name;
        this.coords = coords;
        this.size = size;
        this.description = description;
    }
    draw(){
        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.el.setAttribute('cx', this.coords.cx);
        this.el.setAttribute('cy', this.coords.cy);
        this.el.setAttribute('r', this.size);
    }
}



export {worldMap};

