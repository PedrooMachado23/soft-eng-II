import React, { useEffect, useState } from "react";
import './header.css'

type props = {
    message: string
}

function Header(props: any) {
    const [message, setMessage] = useState(props.message)

    useEffect(()=> {
        setMessage(props.message)
    })

    return (
        <div className="div-header">
            <p className="title">PositiveBehavior</p>
            <p className="pageIndicator">{message}</p>
        </div>
    )
}

export default Header