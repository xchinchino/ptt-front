import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import Link from 'next/link'
import Helmet from 'react-helmet'
import type { RadioChangeEvent } from 'antd'
import _ from 'lodash'
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
  Radio,
  message
} from 'antd'
import Loading from '~/components/main/Loading'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { CustomUrlUtil } from '~/utils/main'
import HighlightLabel from '~/components/main/HighlightLabel'
import { ImageAcceptConst, LocaleNamespaceConst } from '~/constants'
import { IMemberProfile, IMemberProfileUpdate } from '~/interfaces'
import { MemberService } from '~/services'
import styles from './Profile.module.scss'

const { Text, Title } = Typography
const { Option } = Select

interface IProps {
  profile: IMemberProfile
}
const Profile: FC<IProps> = (props: IProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'account-info'])
  const router: NextRouter = useRouter()
  const [form] = Form.useForm()
  const [valueGender, setValueGender] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const month = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  }

  function onChange(e: RadioChangeEvent): void {
    setValueGender(e.target.value)
  }

  async function onSubmit(values: IMemberProfile): Promise<void> {
    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      const payload: IMemberProfileUpdate = {
        firstname: values.firstName,
        lastname: values.lastName,
        birthday: `${values.year}-${values.month}-${values.day}`,
        gender: valueGender
      }
      await MemberService.updateMemberProfile(payload)
      isSuccess = true
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

  async function fetchData(): Promise<void> {
    try {
      await MemberService.getProfile()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
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
      <Loading show={isLoading} />
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
                initialValues={{ ...props.profile }}
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
                    <Upload accept={ImageAcceptConst.toString()}>
                      <Button className="hps-btn-secondary">
                        {t('account-info:button.chooseImage')}
                      </Button>
                    </Upload>
                    <Text type="secondary">{t('account-info:form.msgChooseImage')}</Text>
                  </Col>
                  <Col sm={12} xs={24}>
                    <div>
                      <Text className={styles.label}>{t('account-info:form.memberId')} :</Text>
                      <Text className={styles.textPrimary}>mem01</Text>
                    </div>
                    <div>
                      <Text className={styles.label}>{t('account-info:form.username')} :</Text>
                      <Text className={styles.textPrimary}>{props.profile.username}</Text>
                    </div>
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
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Row gutter={8}>
                      <Col md={3} sm={4} xs={6}>
                        <Form.Item label={t('account-info:form.birthday')} name="day">
                          <Select defaultValue="">
                            <Option value="">{t('account-info:form.date')}</Option>
                            {_.range(1, 31 + 1).map((value: number) => (
                              <Option key={value} value={value}>
                                {value}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={5} sm={6} xs={9}>
                        <Form.Item label="&nbsp;" name="month">
                          <Select defaultValue="">
                            <Option value="">{t('account-info:form.month')}</Option>
                            {Object.keys(month).forEach((key: string, index: number) => {
                              ;<Option key={index} value={key}>
                                {month[key]}
                              </Option>
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={5} sm={6} xs={9}>
                        <Form.Item label="&nbsp;" name="year">
                          <Select defaultValue="">
                            <Option value="">{t('account-info:form.year')}</Option>
                            {_.range(1938, 2004 + 1).map((value: number) => (
                              <Option key={value} value={value}>
                                {value}
                              </Option>
                            ))}
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
                          value={valueGender}
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
