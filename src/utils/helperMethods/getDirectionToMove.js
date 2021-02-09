import { intersection } from 'lodash'

export default function getDirectionToMove (prioritisedDirections, movableDirections) {
    const prioritisedMovableDirections = intersection(prioritisedDirections, movableDirections)
    return prioritisedMovableDirections[0]
}
