export default function(state={}, active) {
    switch (active.type) {
        case 'TRANSFER_FILE':
            console.log(`active type ${JSON.stringify(active.payload)}`)
            // return Object.assign(state, { file: active.payload })
            return active.payload;
        default:
            return state
    }
}