import {combineReducers} from 'redux';

import verifyTokenAct from './verifyTokenAct.jsx';
import dataAuth from './dataAuth.jsx';
import transferFileReduce from './transferFileReduce.jsx';

export default combineReducers({
    dataAuth: dataAuth,
    verifyTokenAct: verifyTokenAct,
    transferFileReduce: transferFileReduce,
})
