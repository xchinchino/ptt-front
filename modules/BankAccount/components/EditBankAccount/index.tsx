import React, { useMemo, useState } from 'react'
import { Col, Typography, Form, Button, Row, message } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { useTranslation } from 'next-i18next'
import BankAccountFrom from '../BankAccountFrom'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { bankMock } from '~/modules/BankAccount/mock-data'
import ModalConfirmBankInfo from '../ModalConfirmBankInfo'
import OtpModal from '~/components/main/OtpModal'
import { CustomUrlUtil, CustomHookUseVisibleUtil } from '~/utils/main'
import { IBankAccountData, IBankAccountFromValues } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'

const { Title } = Typography

interface IEditBankAccountProps {
  isSeller?: boolean
}
const EditBankAccount: React.FC<IEditBankAccountProps> = (props: IEditBankAccountProps) => {
  const [form] = Form.useForm()
  const router: NextRouter = useRouter()
  const { bankAccountId } = router.query

  const { t } = useTranslation([...LocaleNamespaceConst, 'bank-account'])

  const rootMenu: string = props.isSeller ? '/seller' : ''
  const mobileNo: string = '0901234567'

  const [isOtpOpen, setIsOtpOpen] = useState<boolean>(false)
  const [bankAccountData, setBankAccountData] = useState<IBankAccountData>()
  // eslint-disable-next-line @typescript-eslint/typedef
  const confirmBankInfoVisible = CustomHookUseVisibleUtil()

  const bankAccounts: IBankAccountData[] = useMemo(() => bankMock || [], [])

  const bankAccount: IBankAccountFromValues = useMemo(
    (): IBankAccountFromValues =>
      bankAccounts.find((v: IBankAccountData) => v.id === bankAccountId),
    [bankAccountId, bankAccounts]
  )

  function onSubmit(values: IBankAccountFromValues): void {
    // update data mock on submit
    setBankAccountData(values)
    confirmBankInfoVisible.show()
  }

  function onSaveClick(): void {
    form.submit()
  }

  function onCancelClick(): void {
    router.back()
  }

  function onConfirmBankInfoClick(): void {
    confirmBankInfoVisible.hide()
    setIsOtpOpen(true)
  }

  function onCancelBankInfoClick(): void {
    confirmBankInfoVisible.hide()
  }

  function toggleOtpOpen(): void {
    setIsOtpOpen(!isOtpOpen)
  }

  function onOtpSuccess(): void {
    setIsOtpOpen(false)
    bankMock?.forEach((v: IBankAccountData, index: number) => {
      if (v.id === bankAccountId) {
        bankMock[index] = bankAccountData
      }
    })
    message.success(t('common:dataUpdated'))
    router.replace(`${rootMenu}/settings/wallet/bank`, `${rootMenu}/settings/wallet/bank`, {
      locale: router.locale
    })
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('bank-account:editBankAccountTitle')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('bank-account:breadcrumbs.setting') },
          { title: t('bank-account:breadcrumbs.wallet') },
          {
            title: t('bank-account:breadcrumbs.editBankAccount'),
            href: CustomUrlUtil(`${rootMenu}/settings/wallet/bank/${bankAccountId}`, router.locale)
          }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row>
            <Col xl={6} lg={0}>
              <SettingSidebar sidebarType={props.isSeller ? 'seller' : 'buyer'} />
            </Col>
            <Col
              className="mx-auto"
              xl={{ span: 15, offset: 1 }}
              lg={{ span: 18, offset: 3 }}
              sm={24}
            >
              <Col className="mb-4" span={24}>
                <Title className="hps-title" level={4}>
                  {t('bank-account:editBankAccountTitle')}
                </Title>
              </Col>
              <BankAccountFrom
                parentForm={form}
                initialValues={{
                  ...bankAccount
                }}
                onSubmit={onSubmit}
              />
              <Row className="flex-1 mt-5" gutter={[24, 0]}>
                <Col span={12}>
                  <Button type="text" onClick={onCancelClick} block>
                    {t('common:cancel')}
                  </Button>
                </Col>
                <Col span={12}>
                  <Button type="primary" htmlType="submit" onClick={onSaveClick} block>
                    {t('common:save')}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <ModalConfirmBankInfo
            visible={confirmBankInfoVisible.visible}
            data={bankAccountData}
            onConfirmClick={onConfirmBankInfoClick}
            onCancelClick={onCancelBankInfoClick}
          />
          <OtpModal
            mobileNo={mobileNo}
            isOpen={isOtpOpen}
            toggle={toggleOtpOpen}
            onSubmit={onOtpSuccess}
          />
        </div>
      </div>
    </main>
  )
}
EditBankAccount.defaultProps = {
  isSeller: false
}

export default EditBankAccount