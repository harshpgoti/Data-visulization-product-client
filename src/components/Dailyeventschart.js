import { useState, useEffect } from "react";
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import RmPopup from './rmPopup'

ChartJS.register(ArcElement, Tooltip, Legend);

const Dailyeventschart = () =>{

    const [labels, setlabels]=useState([]);
    const [chartdata, setchartdata]=useState([]);

    const [popupBtn, setpopupBtn]=useState();
    const [rlSeconds, setrlSeconds]=useState();

    var data={
        labels:labels,
        datasets: [{
            label: 'Events',
            data: chartdata,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(0, 0, 0, 0.2)'
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
            borderRadius:10,
            offset:10
        }]
    }

    useEffect(() => {
        axios.get(`https://great-rapid-dance.glitch.me/events/daily`)
        .then((data)=>{
            for (let singleDate of data.data) {
                    setlabels(labels => [...labels,singleDate.date.substring(0, 10)]);
                    setchartdata(chartdata => [...chartdata,singleDate.events]);
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
            <h3 id="hourlyeventsChartHeading">Daily events</h3>
            <Doughnut id='linechart' data={data}></Doughnut>
            <RmPopup trigger={popupBtn} seconds={rlSeconds} setpopupBtn={setpopupBtn}></RmPopup>
        </div>
    )
}

export default Dailyeventschart;