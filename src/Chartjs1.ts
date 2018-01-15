var ctx = (<HTMLCanvasElement>document.getElementById("myChart")).getContext('2d');
var chartType:Chart.ChartType = 'line';
var chartData:Chart.ChartData = {
    labels: ["Red", "Blue", "Yellow", "L4", "Purple", "Orange"],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 4, 15, 12, 13],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
};
var chartOptions:any = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
};
var chartCfg:Chart.ChartConfiguration = {
    type:chartType,
    data:chartData,
    options:chartOptions,
}
var myChart = new Chart(ctx,chartCfg)