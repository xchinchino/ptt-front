import React, { FC, useState } from 'react'
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
import t from '~/locales'
import { CustomUrl } from '~/utils/main'
import HighlightLabel from '~/components/main/HighlightLabel'
import styles from './Profile.module.scss'

const { Text, Title } = Typography

interface IFormModel {
  firstName: string
  lastName: string
  mobileNo: string
  email: string
}

const Profile: FC = () => {
  const router: NextRouter = useRouter()
  const [form] = Form.useForm()
  const [value, setValue] = useState<number>(1)

  function onChange(e: RadioChangeEvent): void {
    setValue(e.target.value)
  }

  function onSubmit(values: IFormModel): void {
    console.log(values)
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('meta.title')} | {t('profile.title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('profile.setting') },
          { title: t('profile.title') },
          { title: t('profile.personalInfo'), href: '/settings/account/info' }
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
                {t('profile.title')}
              </Title>
              <HighlightLabel title={t('profile.personalInfo')} />
              <Form layout="vertical" form={form} name="profileForm" onFinish={onSubmit}>
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
                        {t('profile.button.chooseImage')}
                      </Button>
                    </Upload>
                    <Text type="secondary">{t('profile.form.msgChooseImage')}</Text>
                  </Col>
                  <Col sm={12} xs={24}>
                    <Text className={styles.label}>{t('profile.form.memberId')} :</Text>
                    <Text className={styles.textPrimary}>mem01</Text>
                    <br />
                    <Text className={styles.label}>{t('profile.form.username')} :</Text>
                    <Text className={styles.textPrimary}>New_user</Text>
                  </Col>
                </Row>
                <Row gutter={[16, 8]}>
                  <Col sm={12} xs={24}>
                    <Form.Item
                      label={t('profile.form.firstName')}
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: `${t('common.form.required')} ${t('profile.form.firstName')}`
                        }
                      ]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col sm={12} xs={24}>
                    <Form.Item
                      label={t('profile.form.lastName')}
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: `${t('common.form.required')} ${t('profile.form.lastName')}`
                        }
                      ]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Row gutter={8}>
                      <Col md={3} sm={4} xs={6}>
                        <Form.Item label={t('profile.form.birthday')} name="birthday">
                          <Select defaultValue="">
                            <Select.Option value="">{t('profile.form.date')}</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={5} sm={6} xs={9}>
                        <Form.Item label="&nbsp;" name="birthMonth">
                          <Select defaultValue="">
                            <Select.Option value="">{t('profile.form.month')}</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={5} sm={6} xs={9}>
                        <Form.Item label="&nbsp;" name="birthYear">
                          <Select defaultValue="">
                            <Select.Option value="">{t('profile.form.year')}</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row gutter={[16, 24]}>
                      <Col xs={8}>
                        <Text>{t('profile.form.gender')}</Text>
                      </Col>
                      <Col xs={16}>
                        <Radio.Group onChange={onChange} value={value} className={styles.radioFlex}>
                          <Radio value={1}>{t('profile.form.man')}</Radio>
                          <Radio value={2}>{t('profile.form.female')}</Radio>
                          <Radio value={3}>{t('profile.form.other')}</Radio>
                        </Radio.Group>
                      </Col>
                      <Col xs={8}>
                        <Text>{t('profile.form.email')}</Text>
                      </Col>
                      <Col sm={12} xs={11}>
                        <Text type="danger">xxxxx@gmail.com</Text>
                      </Col>
                      <Col sm={4} xs={5} className="text-right">
                        <Link href={CustomUrl.href('/settings/account/info/email', router.locale)}>
                          <a className={styles.textSecondary}>
                            <i className="fas fa-pen mr-1" />
                            {t('profile.button.edit')}
                          </a>
                        </Link>
                      </Col>
                      <Col xs={8}>
                        <Text>{t('profile.form.phoneNumber')}</Text>
                      </Col>
                      <Col sm={12} xs={11}>
                        <Text type="danger">xxxxx11</Text>
                      </Col>
                      <Col sm={4} xs={5} className="text-right">
                        <Link href={CustomUrl.href('/settings/account/info/phone', router.locale)}>
                          <a className={styles.textSecondary}>
                            <i className="fas fa-pen mr-1" />
                            {t('profile.button.edit')}
                          </a>
                        </Link>
                      </Col>
                      <Col sm={{ span: 12, offset: 6 }} xs={24}>
                        <Form.Item>
                          <Button htmlType="submit" type="primary" block>
                            {t('profile.button.save')}
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
