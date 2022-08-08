
const rmPopup = (props) =>{
    if(props.seconds){
        document.querySelector('body').classList.add('rmpopup');
        let seconds = Number(props.seconds);

        let timer = setInterval(() => {
          seconds--;
          document.getElementById("seconds").textContent=seconds;
  
          if (seconds <= 0) {
            props.setpopupBtn(false)
            clearInterval(timer);
            document.querySelector('body').classList.remove('rmpopup');
            window.location.reload();

          }
        }, 1000);
    }
    

    return(props.trigger)?(
        <div className='popup'>
            <div className='popup-inner'>
                <h2>You send too Many Requests</h2>
                <h4>
                    your page will load in...
                </h4>
                <h1 id="seconds">{props.seconds}</h1>
                {props.children}
                <h4>seconds</h4>
            </div>
        </div>
    ):""
}

export default rmPopup;