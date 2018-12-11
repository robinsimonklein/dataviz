

const makayGraphs = {
    dataset: {
        'expeditions': [

        ]
    },
    el: document.querySelector('#makay-content_graph'),
    graph: null,
    init(){
        this.graph = c3.generate(
            bindto: '#makay-content_graph',
        );
    }
};