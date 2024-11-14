import React, { useEffect, useState } from "react";
import './contentHeader.css'

type props = {
    title1: string,
    title2: string,
    content: number, //parent activeContent state
    setContent: (param: number) => void //parent setActiveContent function
}

function ContentHeader(props: any) {
    const [title1, setTitle1] = useState('')
    const [title2, setTitle2] = useState('')
    const [activeButton, setActiveButton] = useState(1)

    const handleTitle1Click = () => {
        props.setContent(1)
    }

    const handleTitle2Click = () => {
        props.setContent(2)
    }

    useEffect(() => {
        setTitle1(props.title1)
        setTitle2(props.title2)
    }, [props.title1, props.title2])

    useEffect(() => {
        setActiveButton(props.content)
    }, [props.content])
    
    return(
        <div className="contentHeaderContainer">
            <button className={`contentHeaderButton transitionButton contentHeaderTitle1 ${activeButton === 1 ? 'activeButtonPattern' : ''}`} onClick={() => handleTitle1Click()}>{title1}</button>
            <div className="contentHeaderVerticalBar"></div>
            <button className={`contentHeaderButton transitionButton contentHeaderTitle2 ${activeButton === 2 ? 'activeButtonPattern' : ''}`} onClick={() => handleTitle2Click()}>{title2}</button>
        </div>
    )
}

export default ContentHeader