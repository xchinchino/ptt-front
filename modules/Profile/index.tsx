import React, { FC,useState } from 'react'
import Helmet from 'react-helmet'
import type { RadioChangeEvent } from 'antd'
import { Typography, Button, Row, Col, Form, Input,Upload ,Avatar,Image,Select,Radio} from 'antd'
import t from '~/locales'
import styles from './Profile.module.scss'
import Link from 'next/link'
import { useRouter, NextRouter } from 'next/router'
import { Url } from '~/utils/main'
import SideBarSettingMenu from '~/components/main/SideBarSettingMenu'

const { Text } = Typography
interface IFormModel {
  firstName: string
  lastName: string
  mobileNo: string
  email: string
}
const Profile: FC = () => {
  const router: NextRouter = useRouter()
  const [form] = Form.useForm()
  function onSubmit(values: IFormModel): void {
    console.log(values)
  }
  const [value, setValue] = useState(1)
  const onChange = (e: RadioChangeEvent): void => {
    setValue(e.target.value)
  }
  return (
    <main className="main account">
      <Helmet>
        <title>{t('meta.title')} | {t('accountProfile.form.title')}</title>
      </Helmet>
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <Link href={Url.href('/', router.locale)}>
                  <i className="d-icon-home" />
              </Link>
            </li>
            <li disabled>{t('accountProfile.form.setting')}</li>
            <li disabled>{t('accountProfile.form.title')}</li>
            <li><Link href={Url.href('/personal-info', router.locale)}>{t('accountProfile.form.personalInfo')}</Link></li>
          </ul>
        </div>
      </nav>
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6} lg={0}>
              <SideBarSettingMenu/>
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} md={24}>
              <Text>
                <h4 className={`text-center mb-5 ${styles.textPrimary}`}>{t('accountProfile.form.title')}</h4>
                <h4 className={`text-left ${styles.textPrimary}`}>{t('accountProfile.form.personal_information')}</h4>
              </Text>
              <Form layout="vertical" form={form} name="accountProfile" onFinish={onSubmit}>
                <Row gutter={[16, 8]}>
                  <Col md={3} xs={12} className="text-center alert alert-message alert-light alert-primary">
                    <Avatar src={<Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />} size={64} />
                  </Col>
                  <Col md={9} xs={12} className="pt-5 text-center alert alert-message alert-light alert-primary">
                    <Upload><Button> {t('accountProfile.button.chooseImage')}</Button></Upload>
                    <Text type="secondary">{t('accountProfile.form.msgChooseImage')}</Text>
                  </Col>
                  <Col md={12} xs={24} className="pt-5 alert alert-message alert-light alert-primary">
                    <Col md={24} xs={24}>
                      <Text>{t('accountProfile.form.memberId')} :</Text>
                      <Text className={styles.textUnderline}> mem01</Text>
                    </Col>
                    <Col md={24} xs={24}>
                      <Text>{t('accountProfile.form.username')} :</Text>
                      <Text className={styles.textUnderline}> New_user</Text>
                    </Col>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item label={t('accountProfile.form.firstName')} name="firstName" rules={[{ required: true, message: t('accountProfile.rules.firstName') }]}>
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item label={t('accountProfile.form.lastName')} name="lastName" rules={[{ required: true, message: t('accountProfile.rules.lastName') }]}>
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={24} xs={64}>
                    <Form.Item label={t('accountProfile.form.birthday')} name="birthday">
                      <Select defaultValue={t('accountProfile.form.date')} style={{ width: 100 }}>
                        <Option value="1">1</Option>
                      </Select>
                      <Select defaultValue={t('accountProfile.form.month')} style={{ width: 120 }}>
                        <Option value="01">01</Option>
                      </Select>
                      <Select defaultValue={t('accountProfile.form.year')} style={{ width: 120 }}>
                        <Option value="2022">2022</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col md={3} xs={24}><Text>{t('accountProfile.form.gender')}</Text></Col>
                  <Col md={16} xs={24}>
                    <Radio.Group onChange={onChange} value={value} className={styles.radioFlex}>
                      <Radio value={1}>{t('accountProfile.form.man')}</Radio>
                      <Radio value={2}>{t('accountProfile.form.female')}</Radio>
                      <Radio value={3}>{t('accountProfile.form.other')}</Radio>
                    </Radio.Group>
                  </Col>
                  <Col md={6} xs={6}><Text>{t('accountProfile.form.email')}</Text></Col>
                  <Col md={12} xs={12}><Text type="danger">xxxxx@gmail.com</Text></Col>
                  <Col md={6} xs={6}>
                    <Link href="/personal-info/email">
                      <a className={styles.textPrimary}><i className={`fas fa-pen ${styles.padding5} ${styles.textPrimary}`}/>{t('accountProfile.button.edit')}</a>
                    </Link>
                  </Col>
                  <Col md={6} xs={6}><Text>{t('accountProfile.form.phoneNumber')}</Text></Col>
                  <Col md={12} xs={12}><Text type="danger">xxxxx11</Text></Col>
                  <Col md={6} xs={6}>
                    <Link href="/personal-info/phone">
                      <a className={styles.textPrimary}><i className={`fas fa-pen ${styles.padding5}`}/>{t('accountProfile.button.edit')}</a>
                    </Link>
                  </Col>
                  <Col md={12} xs={12} offset={6}>
                    <Form.Item>
                      <Button htmlType="submit" className={styles.btnPrimary} block>{t('accountProfile.button.save')}</Button>
                    </Form.Item>
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