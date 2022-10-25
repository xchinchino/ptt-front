import { AxiosRequestConfig } from 'axios'
import { AxiosService } from './axios.service'
import {
  IApiResponse,
  ICreateAddress,
  IUpdateAddress,
  IUpdateMemberProfilePayload,
  IUpdateMemberEmailPayload,
  IUpdateMemberMobilePayload,
  IMemberChangePasswordPayload,
  IMemberInfo
} from '~/interfaces'
import { EndPointUrlConst } from '../constants'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const getProfile = (option?: AxiosRequestConfig): Promise<IApiResponse<IMemberInfo>> =>
  AxiosService.get(EndPointUrlConst.MEMBERS.PROFILE, option)

export const updateProfile = (payload: IUpdateMemberProfilePayload): Promise<IApiResponse> =>
  AxiosService.put(`${EndPointUrlConst.MEMBERS.PROFILE}`, payload)

export const updateEmail = (payload: IUpdateMemberEmailPayload): Promise<IApiResponse> =>
  AxiosService.patch(EndPointUrlConst.MEMBERS.EMAIL_UPDATE, payload)

export const getMobiles = (option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.MEMBERS.MOBILES, option)

export const createMobile = (payload: IUpdateMemberMobilePayload): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.MEMBERS.MOBILES_ADD, payload)

export const deleteMobile = (payload: IUpdateMemberMobilePayload): Promise<IApiResponse> =>
  AxiosService.patch(EndPointUrlConst.MEMBERS.MOBILES_DELETE, payload)

export const setMainMobile = (payload: IUpdateMemberMobilePayload): Promise<IApiResponse> =>
  AxiosService.patch(EndPointUrlConst.MEMBERS.MOBILES_SET_MAIN, payload)

export const getAddresses = (option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(EndPointUrlConst.MEMBERS.ADDRESSES, option)

export const getAddress = (addressId: string, option?: AxiosRequestConfig): Promise<IApiResponse> =>
  AxiosService.get(`${EndPointUrlConst.MEMBERS.ADDRESSES}/${addressId}`, option)

export const createAddress = (payload: ICreateAddress): Promise<IApiResponse> =>
  AxiosService.post(EndPointUrlConst.MEMBERS.ADDRESSES, payload)

export const updateAddress = (addressId: string, payload: IUpdateAddress): Promise<IApiResponse> =>
  AxiosService.put(`${EndPointUrlConst.MEMBERS.ADDRESSES}/${addressId}`, payload)

export const deleteAddress = (addressId: string): Promise<IApiResponse> =>
  AxiosService.delete(`${EndPointUrlConst.MEMBERS.ADDRESSES}/${addressId}`)

export const setMainAddress = (addressId: string): Promise<IApiResponse> =>
  AxiosService.patch(`${EndPointUrlConst.MEMBERS.ADDRESSES}/${addressId}/set-main`)

export const changePassword = (payload: IMemberChangePasswordPayload): Promise<IApiResponse> =>
  AxiosService.patch(EndPointUrlConst.MEMBERS.CHANGE_PASSWORD, payload)

export const useGetProfile = (option?: AxiosRequestConfig): UseQueryResult<IMemberInfo> => {
  return useQuery(
    [EndPointUrlConst.MEMBERS.PROFILE],
    async () => {
      const { data } = await getProfile(option)
      return data
    },
    {
      cacheTime: Infinity,
      staleTime: 10 * 60 * 100,
      meta: {
        persist: true
      }
    }
  )
}
