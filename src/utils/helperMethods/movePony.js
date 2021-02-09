import wretch from 'wretch'

export default function movePony (mazeId, directionToMove) {
    return wretch(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`)
        .post({
            direction: directionToMove
        })
        .json(res => res)
        .catch(err => console.error(err))
}
