import { GetServerSidePropsResult, NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import EditBankAccount from '~/modules/BankAccount/components/EditBankAccount'
import { AuthCheckAuthenticate } from '~/utils/main'

export async function getServerSideProps(
  context: NextPageContext
): Promise<GetServerSidePropsResult<any>> {
  const authenticate: GetServerSidePropsResult<any> = AuthCheckAuthenticate(context)
  if (authenticate) {
    return authenticate
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'bank-account']))
    }
  }
}

const EditBankAccountPage: FC = () => <EditBankAccount />

export default EditBankAccountPage
