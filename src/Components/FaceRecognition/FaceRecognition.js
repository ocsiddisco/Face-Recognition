import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, boxes }) => {

    return (
        <div className="center">
            <div className="absolute 0t2 mt3  pa4 ">
                <img
                    className="br2"
                    id="inputimage"
                    alt=""
                    src={imageUrl}
                    width="500px"
                    heigh="auto"
                />
                {boxes.map((box, index) => {
                    return (
                        <div
                            key={index}
                            className="bounding-box"
                            style={{
                                top: box.topRow,
                                right: box.rightCol,
                                bottom: box.bottomRow,
                                left: box.leftCol,
                            }}
                        ></div>
                    )
                })}
            </div>
        </div>
    )
}

export default FaceRecognition

