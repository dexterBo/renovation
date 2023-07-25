import request from '@/utils/request'

export async function queryColourPage(params: Object): Promise<any> {
  return request('/api/user/queryColourPage', {
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
