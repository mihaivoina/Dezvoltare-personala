import React from 'react';
import Chart from 'chart.js';

class ShowChart extends React.Component {

    state = {
        result: null,
        topics: null,
        score: null
    }

    // componentDidUpdate() {
    //     if (this.props.data !== this.state.result) {
    //         this.updateCanvas();
    //     }
    // }

    // componentWillMount() {
    //     let result = this.props.data;
    //     let topics = [];
    //     let score = [];
    //     result.map(el => {
    //         topics.push(el.topic);
    //         score.push(el.average);
    //         return;
    //     });
    //     console.log(score);
    //     this.setState({
    //         result,
    //         topics,
    //         score
    //     }); 
    // }
    componentDidMount() {
        let result = this.props.data;
        let topics = [];
        let score = [];
        result.map(el => {
            topics.push(el.topic);
            score.push(el.average);
            return null;
        });
        this.setState({
            result,
            topics,
            score
        }, () => {
            this.updateCanvas();   
        });

    }
    updateCanvas = () => {
        console.log(this.state.score);
        
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, 100, 100);

        var myCHart = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: this.state.topics?this.state.topics:'',
                datasets: [{
                    data: this.state.score?this.state.score:'',
                    backgroundColor: [
                        'blue',
                        'red',
                        'green',
                        'yellow',
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
                        suggestedMax: 10
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
        console.log(myCHart.data.datasets[0].data);
        
    }
    render() {
        // width={300} height={300}
        return (
            <canvas ref="canvas" />
        );
    }
}

export default ShowChart;