import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import EditVocher from '~/modules/SellerMarketing/components/Voucher/components/EditVocher'

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        ...LocaleNamespaceConst,
        'seller.marketing'
      ]))
    }
  }
}

const EditVoucherPage: FC = () => <EditVocher />

export default EditVoucherPage