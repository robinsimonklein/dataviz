import TweenMax from 'gsap/TweenMax';
import TimelineMax from 'gsap/TimelineMax';
import {worldMap} from './worldMap';


let textSlidesAll = {
    // data: [{
    //     id: 'makay',
    //     title: 'Bienvenue au makay',
    //     img_url: 'images/EWEXMKA0677.jpg',
    //     content: 'Madagascar détient une biodiversité remarquable, parmis les plus endémiques de la planète.',
    //     duration: '8'
    // }],
    slides: [],


    init(){
        for(let i in this.data){
            this.slides[this.data[i].id] = new TextSlide(this.data[i].id, this.data[i].title, this.data[i].img_url, this.data[i].content, this.data[i].duration);
        }
    }
};

class TextSlide{
    constructor(id, title, img_url, content, duration){
        this.id = id;
        this.title = title;
        this.img_url = img_url;
        this.content= {
            text: content,
            split: null,
        };
        this.duration = duration;
        this.tlIn = new TimelineMax({onComplete: this.showOut, onCompleteScope: this});
        this.tlOut = new TimelineMax();


        this.el = document.createElement('section');
        this.el.classList.add('frame');
        this.el.classList.add('text-slide');
        this.el.classList.add('text-slide_right');
        this.el.setAttribute('id', 'frame_'+id);

        this.el.innerHTML = document.getElementById('text-slide_template').innerHTML;
        this.el.querySelector('.text-slide_text h2').innerHTML = this.title;
        this.el.querySelector('.text-slide_text span').innerHTML = this.content.text;
        this.el.querySelector('.frame_bg_img').setAttribute('src', this.img_url);

        document.querySelector('body').append(this.el);

        this.el.querySelector('.text-slide_text span').innerHTML = '<i>' +
        this.el.querySelector('.text-slide_text span').innerHTML.split('').join('</i><i>') + '</i>';

        // Timelines
        this.tlIn.stop();
        this.tlOut.stop();

        const chars = this.el.querySelectorAll('.text-slide_text span i');
        const textAnim = this.el.querySelectorAll('.text-slide_text span i').length*0.02+0.08;


        // Create the slide's timeline IN
        this.tlIn.to(this.el, 0, { autoAlpha: 1}, '#start');
        this.tlIn.staggerFrom(chars, 0.8, {alpha:0, ease: Power1.easeOut}, 0.02, '#start+=0.5');
        this.tlIn.to(this.el.querySelectorAll('.text-slide_text'), this.duration-2, {x:50, ease: Power3.easeOut}, '#start+=0');
        this.tlIn.from(this.el.querySelector('.filter'), 2, {autoAlpha: 0, ease: Power3.easeOut}, '#start+=0');


        // Create the slide's timeline OUT
        this.tlOut.to(this.el.querySelector('.text-slide_text'),0.4, {x:30, opacity: 0, scale:1.1, ease: Power3.easeIn, force3D: true}, '#start');
        this.tlOut.to(this.el.querySelector('.filter'), 0.8, {opacity: 0, ease: Power3.easeOut}, '#start+=0');
        this.tlOut.to(this.el, 0, {autoAlpha: 0});
    }

    showIn(next){// Pass the next element to show
        if(next){
            this.next = next;
        }
        this.el.querySelector('.frame_bg_img').classList.add('zoomIn');
        this.el.querySelector('.frame_bg_img').classList.remove('zoomOut');
        this.el.querySelector('.text-slide_texture').classList.add('zoom');
        this.tlIn.play();
    }
    showOut(next){
        let nextElement = null;
        if(this.next){
            next = this.next;
        }
        if(framesAll[next]){
            nextElement = framesAll[next];
        }else if(textSlidesAll.slides[this.next]){
            nextElement = textSlidesAll.slides[next];
        }else{

        }
        if(nextElement != null || next){
            console.log(this.next, nextElement);
            this.el.querySelector('.frame_bg_img').classList.remove('zoomIn');
            this.el.querySelector('.frame_bg_img').classList.add('zoomOut');
            this.el.querySelector('.text-slide_texture').classList.remove('zoom');
            this.tlOut.play();
            nextElement.showIn();
        }

    }

}

const framesAll = [];

// Define other frames

/* Makay map */
framesAll['makay-map'] = {
    id: 'makay-map',
    el: document.querySelector('#frame_makay-map'),

    init(){

    }

};


/* World map */
framesAll['world-map'] = {
    id: 'world-map',
    el: document.querySelector('#frame_world-map'),
    points: [],
    tlIn: new TimelineMax(),
    tlOut: new TimelineMax(),

    init(){
        let count = 0;
        for(let i in worldMap.lostWorldsObjects){
            this.points[i] = worldMap.lostWorldsObjects[i].el;
            this.tlIn.to(framesAll['world-map'].points[i], 5, {className:'+=visible', ease: Power3.easeOut}, 0.2*count+0.8);
            count+=1;
        }
    },
    showIn(){
        this.tlIn.play();
    }
};

framesAll['world-map'].tlIn.pause()
    .to(framesAll['world-map'].el, 1, {autoAlpha: 1, ease: Power3.easeIn}, '#start')
    .from(framesAll['world-map'].el.querySelector('.worldMap_container'), 1.5, {opacity: 0.8, scale: 0.2, ease: Power3.easeOut}, '#start+=0.1');





export {textSlidesAll, framesAll};

