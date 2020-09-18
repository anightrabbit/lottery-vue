import VueHttp from './base.model'

export const getPrize = () => VueHttp.get('prize')

export const getProducts = () => VueHttp.get('prize/products')

export const getAward = (params) => VueHttp.get('award/find', params)

export const postLottery = (params) => VueHttp.post('award/lottery', params)
