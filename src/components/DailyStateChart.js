import { useState, useEffect } from "react";
import axios from 'axios';
import { Chart as ChartJS, BarElement, LinearScale, CategoryScale, PointElement, LineElement, Legend, Tooltip, LineController, BarController, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import RmPopup from './rmPopup'
  
ChartJS.register( LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController );

const DailyStateChart = () =>{

    const [labels, setlabels]=useState([]);
    const [chartdata, setchartdata]=useState([]);
    const [chartdata1, setchartdata1]=useState([]);
    const [chartdata2, setchartdata2]=useState([]);
    
    const [popupBtn, setpopupBtn]=useState();
    const [rlSeconds, setrlSeconds]=useState();

    var data={
        labels:labels,
        datasets: [{
            label: 'impressions in thousands',
            data: chartdata,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(0, 0, 0, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(0, 0, 0, 1)'
            ],
            borderWidth: 1
        },
        {
            type: 'line',
            label: 'clicks',
            data: chartdata1,
            backgroundColor: 'rgba(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132,0.5)',
            borderWidth: 1
        },
        {
            type: 'line',
            label: 'revenue',
            data: chartdata2,
            backgroundColor: 'rgba(0, 0, 0)',
            borderColor: 'rgba(0, 0, 0,0.5)',
            borderWidth: 1
        }]
    }
    const options= {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        showTooltips: true,
    }
    
    useEffect(() => {
        axios.get(`https://great-rapid-dance.glitch.me/stats/daily`)
        .then((data)=>{
            for (let singleDate of data.data) {
                setlabels(labels => [...labels,singleDate.date.substring(0, 10)]);
                setchartdata(chartdata => [...chartdata,Number(singleDate.impressions/1000).toFixed(2)]);
                setchartdata1(chartdata1 => [...chartdata1,singleDate.clicks]);
                setchartdata2(chartdata2 => [...chartdata2,Number(singleDate.revenue).toFixed(2)]);
            }
        })
        .catch((err)=>{
            if(err.response.status === 429){
                setrlSeconds(err.response.data.error.time)
                setpopupBtn(true);
            }
        })
    },[]);


    return(
        <div id="visualization">
            <h3 id="hourlyeventsChartHeading">Statistics per Day</h3>
            <Bar id='linechart' data={data} options={options}></Bar>
            <RmPopup trigger={popupBtn} seconds={rlSeconds} setpopupBtn={setpopupBtn}></RmPopup>
        </div>
    )
}

export default DailyStateChart;