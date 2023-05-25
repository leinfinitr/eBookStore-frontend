import React from "react";
import {Carousel} from "antd";
import carousel1 from "../../assets/carousel/book1.jpg";
import carousel2 from "../../assets/carousel/book2.jpg";
import carousel3 from "../../assets/carousel/book3.jpg";
import carousel4 from "../../assets/carousel/book4.jpg";

export class BookCarousel extends React.Component {
    render() {
        return (
            <Carousel autoplay>
                <div>
                    <img alt="Carusel 1" src={carousel1}/>
                </div>
                <div>
                    <img alt="Carusel 2" src={carousel2}/>
                </div>
                <div>
                    <img alt="Carusel 3" src={carousel3}/>
                </div>
                <div>
                    <img alt="Carusel 4" src={carousel4}/>
                </div>
            </Carousel>
        );
    }
}
