/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: Endpoints for transaction
Created:  2021-08-28T17:45:21.275Z
Modified: !date!
Modified By: Isamu Isozaki
*/

import api from './index';

export function getTransactions({params} = {}) {
    return api.get('/v1/transaction', {params});
}

export function postPay({ toId, amount, message } = {}) {
    return api.post('/v1/transaction', { toId, amount, message });
}