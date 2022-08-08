import { useState, useEffect } from "react";
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import RmPopup from './rmPopup'

  
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

const HourlyeventsChart = () =>{
    const [labels, setlabels]=useState([]);
    const [chartdata, setchartdata]=useState([]);
    const [chartdata1, setchartdata1]=useState([]);

    const [popupBtn, setpopupBtn]=useState();
    const [rlSeconds, setrlSeconds]=useState();

    var data={
        labels:labels,
        datasets: [{
            label: 'hour',
            data: chartdata,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        },
        {
            label: 'events',
            data: chartdata1,
            backgroundColor: [
                'rgba(188, 228, 255, 0.2)'
            ],
            borderColor: [
                'rgba(188, 228, 255, 1)'
            ],
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
        axios.get(`https://great-rapid-dance.glitch.me/stats/hourlyevents`)
        .then((data)=>{
            let d1 = new Date(data.data[0].date.substring(0, 10)),d2;

            document.getElementById("eventDate").value=data.data[0].date.substring(0, 10);
            document.getElementById("eventDate").min=data.data[0].date.substring(0, 10);
            document.getElementById("eventDate").max=data.data[data.data.length-1].date.substring(0, 10);
            for (let singleDate of data.data) {
                d2 = new Date(singleDate.date.substring(0, 10));
                if(d1.getTime() === d2.getTime()){
                    setlabels(labels => [...labels,singleDate.name]);
                    setchartdata(chartdata => [...chartdata,singleDate.hour]);
                    setchartdata1(chartdata1 => [...chartdata1,singleDate.events]);
                }
            }
            document.getElementById("hourlyeventsChartHeading").textContent = "events with hours on " + data.data[0].date.substring(0, 10);
        })
        .catch((err)=>{
            if(err.response.status === 429){
                setrlSeconds(err.response.data.error.time)
                setpopupBtn(true);
            }
        })
    },[]);

    function changehourlyeventsChart(e){
        axios.get(`https://great-rapid-dance.glitch.me/stats/hourlyevents`, { params: { day: e.target.value } })
        .then((data)=>{

            setlabels([]);
            setchartdata([]);
            setchartdata1([]);
            for (let singleDate of data.data) {
                setlabels(labels => [...labels,singleDate.name]);
                setchartdata(chartdata => [...chartdata,singleDate.hour]);
                setchartdata1(chartdata1 => [...chartdata1,singleDate.events]);
            }
            document.getElementById("hourlyeventsChartHeading").textContent = "events with hours on " + document.getElementById("eventDate").value;
        })
        .catch((err)=>console.log(err))
    }

    return(
        <div id="visualization">
            <h3 id="hourlyeventsChartHeading">events with hours on date</h3>
            <input type="date" id="eventDate" name="eventDate"  onChange={changehourlyeventsChart}/>
            <Bar id='linechart' data={data} options={options}></Bar>
            <RmPopup trigger={popupBtn} seconds={rlSeconds} setpopupBtn={setpopupBtn}></RmPopup>
        </div>
    )
}

export default HourlyeventsChart;