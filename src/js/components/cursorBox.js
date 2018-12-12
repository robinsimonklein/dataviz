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
    show(title, desc, land){
        this.el.classList.add('visible');
        this.el.querySelector('.title').innerHTML = title;
        this.el.querySelector('.desc').innerHTML = desc;
        if(land){
            this.el.querySelector('.land').innerHTML = land;
        }else{
            this.el.querySelector('.land').innerHTML = '';
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