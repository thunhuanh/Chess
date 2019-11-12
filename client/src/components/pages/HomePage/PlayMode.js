import React, { Component } from 'react'
import "./Style/PlayMode.css" 
// import 'font-awesome/css/font-awesome.min.css';

export default class Play_Mode extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
        
            <div className = "play_mode">
                    <p id="play-mode"> Play Mode </p>
                    
                    
                    <div className="mode-box">
                       
               
                <div id="exTab1" class="container">	
                    <ul  class="nav nav-pills">
			            <li class="active">
                            <a  href="#1a" data-toggle="tab">VS BOT</a>
			            </li>
			            <li><a href="#2a" data-toggle="tab">Casual</a>
			            </li>
			            <li><a href="#3a" data-toggle="tab">Ranking</a>
			            </li>
  		                
		            </ul>

			    <div class="tab-content clearfix">
			        <div class="tab-pane active" id="1a">
                        <button type = "button" className = "st-btn"> SetTime  <i class="fa fa-sort-down"></i></button>
                        <button type = "button" className = "ty-btn"> Type  <i class="fa fa-sort-down"></i></button>
				    </div>
				    <div class="tab-pane" id="2a">
                    </div>
                    <div class="tab-pane" id="3a">
                    </div>
                </div>
            </div>
            <div className = "play_btn">
                    <button type = "button" className = "toggle-btn"><i class="fa fa-gamepad"></i> Play </button>
            </div> 
                  
        </div>
    </div>
        
           
        )
        }
}
