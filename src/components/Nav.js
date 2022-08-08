import React from 'react'
import {Link} from 'react-router-dom'


const Nav=()=>{
    return(
        <div>
            <ul className='nav-ul'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/hourlyeventsChart">Hourly events Chart</Link></li>
                <li><Link to="/dailyeventschart">Daily events chart</Link></li>
                <li><Link to="/dailystatechart">Daily state Chart</Link></li>
                <li><Link to="/gioMap">Gio map</Link></li>
            </ul>
        </div>
    )
}

export default Nav;