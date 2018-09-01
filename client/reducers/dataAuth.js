import cookieFunc from '../containers/cookieFunc';

export default function() {
    
    var verify = '';
    console.log(cookieFunc.getCookie(verify))
    if(cookieFunc.getCookie(verify) === undefined) {
        verify = false;
    }

    else {
        verify = cookieFunc.getCookie(verify);
    }
    return [
        {tokenVerify: verify}
    ]
}
