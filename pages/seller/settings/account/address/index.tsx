import { GetServerSidePropsResult, NextPage, NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { ApiCodeEnum } from '~/enums'
import { IAddress, IApiResponse } from '~/interfaces'
import Address, { IAddressProps } from '~/modules/Address'
import { MembersService } from '~/services'
import { AuthCheckAuthenticate } from '~/utils/main'

type IAddressPageProps = Pick<IAddressProps, 'addresses'>

export async function getServerSideProps(
  context: NextPageContext
): Promise<GetServerSidePropsResult<any>> {
  const authenticate: GetServerSidePropsResult<any> = AuthCheckAuthenticate(context)
  if (authenticate) {
    return authenticate
  }

  let addresses: IAddress[] = []
  const { req } = context
  const { headers } = req
  if (req) {
    try {
      const result: IApiResponse<IAddress[]> = await MembersService.getAddresses(headers)
      if (result?.code === ApiCodeEnum.SUCCESS) {
        addresses = result?.data || []
      }
    } catch (error) {
      // console.error(error)
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'address'])),
      addresses
    }
  }
}

const AddressPage: NextPage<IAddressPageProps> = (props: IAddressPageProps) => (
  <Address isSeller addresses={props.addresses} />
)

export default AddressPage
