import React from 'react';
import Chart from 'chart.js';

class ShowChart extends React.Component {

    state = {
        date: [4,6,3,4,5,6,7,5]
    }

    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, 100, 100);

        var myCHart = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels:  ['Health', 'Relationships', 'Environment', 'Career', 'Money', 'Personal growth', 'Brightness of Life', 'Spiritual Life'],
                datasets: [{
                    data: this.state.date,
                    backgroundColor: [
                        'rgba(2, 237, 61, 0.7)',
                        'rgba(237, 2, 2, 0.7)',
                        'rgba(237, 2, 214, 0.7)',
                        'rgba(237, 2, 108, 0.7)',
                        'rgba(1, 86, 12, 0.7)',
                        'rgba(2, 237, 222, 0.7)',
                        'rgba(2, 61, 237, 0.7)',
                        'rgba(237, 218, 2, 0.7)'
                    ],
                    label: 'Results' // for legend
                }]
            },
            options: {
                scale: {
                    angleLines: {
                        display: false
                    },
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 5
                    }
                },
                responsive: true,
                maintainAspectRatio: true,
                title: {
                  display: false
                },
                legend: {
                  display: true,
                }
            }
        }); 
        // console.log(myCHart.data.datasets[0].data);
        
    }
    render() {
        // width={300} height={300}
        return (
            <canvas ref="canvas" />
        );
    }
}

export default ShowChart;