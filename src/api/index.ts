import request from '@/utils/request'

export async function queryProse(): Promise<any> {
  return request('/project/prose')
}

export async function addAuthorize(params: Object): Promise<any> {
  return request('/api/user/addAuthorize', {
    method: 'post',
    data: params,
  })
}

export async function queryAuthorizeInfo(params: Object): Promise<any> {
  return request('/api/user/queryAuthorizeInfo', {
    method: 'get',
    params,
  })
}

export async function queryProdCodeInfo(params: Object): Promise<any> {
  return request('/api/user/queryProdCodeInfo', {
    method: 'get',
    params,
  })
}

export async function queryWarrantyInfo(params: Object): Promise<any> {
  return request('/api/user/queryWarrantyInfo', {
    method: 'get',
    params,
  })
}
