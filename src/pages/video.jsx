import React from "react";
import NavBar from "./navbar";
import './scss/video.scss';

import YoutubeVideo from './modules/YoutubeVideo';
import Footer from "./footer";
import BackgroundVideo from "./modules/YoutubeVideo";


function Video (){
    return(
        <div>
            <section>
                <div className="wrapper-1">
                    <div className="content-video">
                       <BackgroundVideo/>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default Video;