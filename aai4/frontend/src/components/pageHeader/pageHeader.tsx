import React, { useEffect, useState } from "react";
import './pageHeader.css'

function PageHeader(props: any) {
    const [title, setTitle] = useState('')
    
    useEffect(() => {
        setTitle(props.title)
    }, [props.title]) 
    
    return (
        <div className="headerContainer">
            <p className="pageHeaderTitle">PositiveBehavior</p>
            <p className="pageHeaderSection">{title}</p>
        </div>
    )
}

export default PageHeader