import cookieFunc from '../containers/cookieFunc';

export default function(state="", active) {
    
    switch (active.type) {
        case 'AUTHENTICATION':
            if(active.payload == true) return Object.assign({}, state, { text: true })
            return Object.assign({}, state, { text: cookieFunc.getCookie('verify') })
        default:
            return state
    }
}