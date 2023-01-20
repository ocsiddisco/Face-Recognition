import React from 'react'

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className="white f3 ma4 mb4">
                {`${name}, just keep swimming! Your current entry count is...`}
            </div>
            <div className="white f1">{`${entries}`}</div>
        </div>
    )
}

export default Rank
