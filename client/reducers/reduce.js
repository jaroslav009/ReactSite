import {combineReducers} from 'redux';

import verifyTokenAct from './verifyTokenAct';
import dataAuth from './dataAuth';
import transferFileReduce from './transferFileReduce';

export default combineReducers({
    dataAuth: dataAuth,
    verifyTokenAct: verifyTokenAct,
    transferFileReduce: transferFileReduce
})
