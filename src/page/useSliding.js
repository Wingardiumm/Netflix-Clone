import React, { useState, useRef, useEffect } from 'react'

const PADDINGS = 60;
const useSliding = (elementWidth, countElements) => {
    const testRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [distance, setDistance] = useState(0);
    const [totalInViewport, setTotalInViewport] = useState(0)
    const [viewed, setViewed] = useState(0);

    useEffect(() => {
        return () => {
            const containerWidth = testRef.current?.clientWidth;
            setContainerWidth(containerWidth);
            setTotalInViewport(parseFloat((containerWidth / elementWidth).toFixed(2)));
        }
    });

    const handlePrev = () => {
        if (distance + containerWidth > 0) {
            setDistance(0)
            setViewed(0);
        } else {
            setViewed(parseFloat((viewed - totalInViewport).toFixed(2)));
            setDistance(distance + containerWidth);
        }
    }

    const handleNext = () => {
        setViewed(parseFloat((viewed + totalInViewport).toFixed(2)));
        setDistance(distance - containerWidth)
    }

    const slideProps = {
        style: { transform: `translate3d(${distance}px, 0, 0)` }
    };
    const hasPrev = distance < 0;
    const hasNext = (viewed + totalInViewport) <= countElements;
    // console.log(distance, countElements, viewed, totalInViewport, containerWidth,elementWidth, hasPrev, hasNext)
    return { handlePrev, handleNext, slideProps, testRef, hasPrev, hasNext };
}

export default useSliding