export default function transferFile(file_url) {
    console.log('action '+JSON.stringify(file_url))
    return {
        type: 'TRANSFER_FILE',
        payload: file_url
    }
}