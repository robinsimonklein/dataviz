const campsAll = {
    camps: {},

    init() {
        this.camps['expeditions'] = new Camp({
            id: 'expeditions',
            title: 'Les expéditions',
            coords: {
                cx: 606,
                cy: 518
            },
            data: '',

        });
    }
};


class Camp{
    constructor(id, title, coords, data){
        this.id = id;
        this.title = title;
        this.coords = coords;
        this.data = data;
    }
}

export {campsAll, Camp} ;