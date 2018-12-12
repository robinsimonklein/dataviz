import {d3} from '../vendor/d3.v5.min';
import c3 from 'c3';


const endemiciteMadaGraph = {
    el: null,
    graph: null,

    init(){
        this.el = document.querySelector('#mada-endemicite_graph');
        this.graph = c3.generate({
            bindto: '#mada-endemicite_graph',

            data: {
                columns: [
                    ['endemicite', 80]
                ],
                type: 'gauge',
                names: {
                    endemicite: 'Espèces endémiques à Madagascar'
                },
                colors: {
                    endemicite: '#71AF27',
                }
            },
            height: 300,

        });

    },
};


export {endemiciteMadaGraph};