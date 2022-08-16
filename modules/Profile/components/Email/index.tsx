import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { AxiosResponse } from 'axios'
import Helmet from 'react-helmet'
import { Typography, Button, Row, Col, Form, Input, message } from 'antd'
import { IMemberProfile, IEmailUpdate } from '~/interfaces'
import Loading from '~/components/main/Loading'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '~/constants'
import { MembersService } from '~/services'
import styles from './ProfileEmail.module.scss'

const { Text, Title } = Typography

interface IProps {
  profile: IMemberProfile
}

const Email: FC<IProps> = (props: IProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'account-info'])
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(values: IEmailUpdate): Promise<void> {
    setIsLoading(true)
    const isSuccess: boolean = false
    try {
      const payload: IEmailUpdate = {
        newEmail: values.newEmail,
        password: values.password
      }
      const result: AxiosResponse = await MembersService.updateEmail(payload)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
    if (isSuccess) {
      message.success(t('common:apiMessage.success'))
    } else {
      message.error(t('common:apiMessage.error'))
    }
    setIsLoading(false)
  }

  return (
    <main className="main">
      <Loading show={isLoading} />
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('account-info:email.title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('account-info:setting') },
          { title: t('account-info:title') },
          { title: t('account-info:personalInfo'), href: '/settings/account/info' },
          { title: t('account-info:email.title'), href: '/settings/account/info/email' }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="buyer" />
            </Col>
            <Col xl={18} lg={24}>
              <Title className="hps-title" level={4}>
                {t('account-info:email.title')}
              </Title>
              <Row className={styles.highlight}>
                <Col md={{ span: 4, offset: 6 }} xs={8}>
                  <Text>{t('account-info:email.currentEmail')} :</Text>
                </Col>
                <Col md={12} xs={16}>
                  <Text className={styles.textPrimary}>{props.email}</Text>
                </Col>
              </Row>
              <Row>
                <Col xl={{ span: 12, offset: 6 }} md={{ span: 12, offset: 6 }}>
                  <Form
                    layout="vertical"
                    form={form}
                    name="newEmail"
                    onFinish={onSubmit}
                    initialValues={{
                      email: props.email
                    }}
                  >
                    <Row>
                      <Col span={24}>
                        <Form.Item label={t('account-info:email.currentEmail')} name="email">
                          <Input maxLength={50} />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          label={t('account-info:email.password')}
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: `${t('common:form.required')} ${t(
                                'account-info:form.email'
                              )}`
                            },
                            {
                              type: 'email',
                              message: `${t('common:form.invalid.head')} ${t(
                                'account-info:form.email'
                              )} ${t('common:form.invalid.tail')}`
                            }
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                      </Col>
                      <Col span={24} className="text-center mb-5">
                        <Text type="secondary">{t('account-info:email.msgConfirm')}</Text>
                      </Col>
                      <Col span={24}>
                        <Form.Item>
                          <Button htmlType="submit" type="primary" block>
                            {t('account-info:button.confirm')}
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default Email
