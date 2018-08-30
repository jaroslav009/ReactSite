export default function(state=[], active) {
    console.log('dwqdqw123')
    switch (active.type) {
        case 'TRANSFER_FILE':
            console.log('file_path ' + active.payload);
            return Object.assign({}, state, { file_url: active.payload })
        default:
            console.log('reduce2 ' + active.payload)
            return state
    }
}