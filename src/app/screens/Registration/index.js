import React, {useState} from 'react';

import {Carousel} from "react-bootstrap";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";


/**
 *
 * @param {object} param0
 * user {object}. Current user settings
 * updateUser {function}. Updates user settings
 * Returns Setting scomponent to see and modify settings
 */
function Registration() {

    const [carouselIndex, setCarouselIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setCarouselIndex(parseInt(selectedIndex));
    };

    const gotoStepTwo = () => {
        setCarouselIndex(1);
    };

    return (
        <div className="container-fluid" style={{height: '100%'}}>
            <div className="row d-flex justify-content-center" style={{height: '100%'}}>
                <div className="align-self-center col-md-6">
                    {
                        carouselIndex === 0 ? 
                        (
                            <StepOne
                                gotoNextStep={gotoStepTwo}
                            />
                        )
                        :
                        (
                            <StepTwo/>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Registration;
