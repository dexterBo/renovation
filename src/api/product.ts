import request from '@/utils/request'

export async function queryProductPage(params: Object): Promise<any> {
  return request('/api/user/queryProdPage', {
    method: 'post',
    data: params,
  })
}

export async function getColorInfo(params: Object): Promise<any> {
  return request('/api/user/queryColourInfo', {
    method: 'get',
    params,
  })
}
