import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import Link from 'next/link'
import Helmet from 'react-helmet'
import type { RadioChangeEvent } from 'antd'
import {
  Typography,
  Button,
  Row,
  Col,
  Form,
  Input,
  Upload,
  Avatar,
  Image,
  Select,
  Radio
} from 'antd'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { CustomUrlUtil } from '~/utils/main'
import HighlightLabel from '~/components/main/HighlightLabel'
import { LocaleNamespaceConst } from '~/constants'
import { IMemberProfile } from '~/interfaces'
import styles from './Profile.module.scss'

const { Text, Title } = Typography

interface IProps {
  profile: IMemberProfile
}

const Profile: FC<IProps> = (props: IProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'account-info'])
  const router: NextRouter = useRouter()
  const [form] = Form.useForm()
  const [value, setValue] = useState<number>(1)

  function onChange(e: RadioChangeEvent): void {
    setValue(e.target.value)
  }

  function onSubmit(values: IMemberProfile): void {
    console.log(values)
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('account-info:title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('account-info:setting') },
          { title: t('account-info:title') },
          { title: t('account-info:personalInfo'), href: '/settings/account/info' }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="buyer" />
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 2 }} md={24}>
              <Title className="hps-title" level={4}>
                {t('account-info:title')}
              </Title>
              <HighlightLabel title={t('account-info:personalInfo')} />
              <Form
                layout="vertical"
                form={form}
                name="profileForm"
                onFinish={onSubmit}
                initialValues={{
                  firstName: props.profile.firstName,
                  lastName: props.profile.lastName,
                  gender: props.profile.gender
                }}
              >
                <Row className={styles.highlight} gutter={[16, 16]} align="middle">
                  <Col sm={4} xs={12}>
                    <Avatar
                      src={
                        <Image
                          src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                          preview={false}
                        />
                      }
                      size={80}
                    />
                  </Col>
                  <Col sm={8} xs={12} className="text-center">
                    <Upload>
                      <Button className="hps-btn-secondary">
                        {t('account-info:button.chooseImage')}
                      </Button>
                    </Upload>
                    <Text type="secondary">{t('account-info:form.msgChooseImage')}</Text>
                  </Col>
                  <Col sm={12} xs={24}>
                    <Text className={styles.label}>{t('account-info:form.memberId')} :</Text>
                    <Text className={styles.textPrimary}>mem01</Text>
                    <br />
                    <Text className={styles.label}>{t('account-info:form.username')} :</Text>
                    <Text className={styles.textPrimary}>{props.profile.username}</Text>
                  </Col>
                </Row>
                <Row gutter={[16, 8]}>
                  <Col sm={12} xs={24}>
                    <Form.Item
                      label={t('account-info:form.firstName')}
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: `${t('common:form.required')} ${t(
                            'account-info:form.firstName'
                          )}`
                        }
                      ]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col sm={12} xs={24}>
                    <Form.Item
                      label={t('account-info:form.lastName')}
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: `${t('common:form.required')} ${t('account-info:form.lastName')}`
                        }
                      ]}
                    >
                      <Input maxLength={50} value={props.profile.lastName} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Row gutter={8}>
                      <Col md={3} sm={4} xs={6}>
                        <Form.Item label={t('account-info:form.birthday')} name="birthday">
                          <Select defaultValue="">
                            <Select.Option value="">{t('account-info:form.date')}</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={5} sm={6} xs={9}>
                        <Form.Item label="&nbsp;" name="birthMonth">
                          <Select defaultValue="">
                            <Select.Option value="">{t('account-info:form.month')}</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={5} sm={6} xs={9}>
                        <Form.Item label="&nbsp;" name="birthYear">
                          <Select defaultValue="">
                            <Select.Option value="">{t('account-info:form.year')}</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row gutter={[16, 24]}>
                      <Col xs={8}>
                        <Text>{t('account-info:form.gender')}</Text>
                      </Col>
                      <Col xs={16}>
                        <Radio.Group
                          name="gender"
                          onChange={onChange}
                          value={value}
                          className={styles.radioFlex}
                        >
                          <Radio value="M">{t('account-info:form.man')}</Radio>
                          <Radio value="F">{t('account-info:form.female')}</Radio>
                          <Radio value="O">{t('account-info:form.other')}</Radio>
                        </Radio.Group>
                      </Col>
                      <Col xs={8}>
                        <Text>{t('account-info:form.email')}</Text>
                      </Col>
                      <Col sm={12} xs={11}>
                        <Text type="danger">{props.profile.email}</Text>
                      </Col>
                      <Col sm={4} xs={5} className="text-right">
                        <Link href={CustomUrlUtil('/settings/account/info/email', router.locale)}>
                          <a className={styles.textSecondary}>
                            <i className="fas fa-pen mr-1" />
                            {t('account-info:button.edit')}
                          </a>
                        </Link>
                      </Col>
                      <Col xs={8}>
                        <Text>{t('account-info:form.phoneNumber')}</Text>
                      </Col>
                      <Col sm={12} xs={11}>
                        <Text type="danger">{props.profile.mobile}</Text>
                      </Col>
                      <Col sm={4} xs={5} className="text-right">
                        <Link href={CustomUrlUtil('/settings/account/info/phone', router.locale)}>
                          <a className={styles.textSecondary}>
                            <i className="fas fa-pen mr-1" />
                            {t('account-info:button.edit')}
                          </a>
                        </Link>
                      </Col>
                      <Col sm={{ span: 12, offset: 6 }} xs={24}>
                        <Form.Item>
                          <Button htmlType="submit" type="primary" block>
                            {t('account-info:button.save')}
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default Profile
