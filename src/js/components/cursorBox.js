import EventManager from './EventManager';

const cursorBox = {
    el: null,
    mouse: {
        x: 0,
        y: 0
    },
    init(){
        this.el = document.querySelector('#cursorBox');
    },
    show(title, desc, note){
        this.el.classList.add('visible');
        this.el.querySelector('.title').innerHTML = title;
        this.el.querySelector('.desc').innerHTML = desc;
        if(note){
            this.el.querySelector('.note').innerHTML = note;
        }else{
            this.el.querySelector('.note').innerHTML = '';
        }
    },
    hide(){
        this.el.classList.remove('visible');
    },
    move(e){
        this.el.style.left = e.clientX+20+'px';
        this.el.style.top = e.clientY-20+'px';
    }
};


export default cursorBox;