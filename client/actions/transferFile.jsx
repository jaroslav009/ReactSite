export default function transferFile(file_url) {
    return {
        type: 'TRANSFER_FILE',
        payload: file_url
    }
}