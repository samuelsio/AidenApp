import React from 'react';
import './Indicators.scss';

export default function Indicators({currentIndex, total}) {


    return(
        <div className='indicators'>
            {Array.from({ length: total }).map((_, index) => (
                <div
                    key={index}
                    className={`indicator ${index === currentIndex ? 'active' : ''}`}
                />
            ))}
        </div>
    );
}