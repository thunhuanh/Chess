import React, { Component } from 'react'
import "./styles/Slide.css"

export default class Slide extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }
    inputOnChange = () =>{

    }
    render() {
        return (
            <div>
                <div className="container">

                    <input type="radio" name="images" id="i4" checked onChange={this.inputOnChange}></input>
                    <input type="radio" name="images" id="i3" checked onChange={this.inputOnChange}></input>
                    <input type="radio" name="images" id="i2" checked onChange={this.inputOnChange}></input>
                    <input type="radio" name="images" id="i1" checked onChange={this.inputOnChange}></input>
                                       

                    <div className="Slide-img" id="one">
                        {/* <img src="http://thuthuatphanmem.vn/uploads/2018/09/11/hinh-anh-dep-1_044126531.jpg"></img> */}
                        <img src="https://www.chess.com/bundles/web/images/homepage/splash.6c4ef662.png" alt=""></img>
                    </div>
                    <div className="Slide-img" id="two">
                        <img src="http://thuthuatphanmem.vn/uploads/2018/09/11/hinh-anh-dep-2_044126655.jpg" alt=""></img>
                    </div>
                    <div className="Slide-img" id="three">
                        <img src="http://thuthuatphanmem.vn/uploads/2018/09/11/hinh-anh-dep-3_044126905.jpg" alt=""></img>
                    </div>
                    <div className="Slide-img" id="four">
                        <img src="http://thuthuatphanmem.vn/uploads/2018/09/11/hinh-anh-dep-4_044127014.jpg" alt=""></img>
                    </div>
                    {/* <button id="play-now">Play Now</button> */}
                    <div id="navigator">
                        <label className="dot" id="dot1" htmlFor="i1" ></label>
                        <label className="dot" id="dot2" htmlFor="i2" ></label>
                        <label className="dot" id="dot3" htmlFor="i3" ></label>
                        <label className="dot" id="dot4" htmlFor="i4" ></label>
                    </div>
                    
                </div>
            </div>
        )
    }
}
