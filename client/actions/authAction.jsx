export default function authentication(token) {
    return {
        type: 'AUTHENTICATION',
        payload: token
    }
}