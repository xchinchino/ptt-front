import React, { FC } from 'react'
import Helmet from 'react-helmet'
import { Typography, Button, Row, Col, Form, Input} from 'antd'
import t from '~/locales'
import styles from './Profile.module.scss'

const { Text } = Typography

const AddPhone: FC = () => {
  return (  
    <main className="main account">
        <Helmet>
            <title>{t('meta.title')} | {t('accountProfile.form.title')}</title>
        </Helmet>
        <nav className="breadcrumb-nav">
            <div className="container">
                <ul className="breadcrumb">
                    <li><i className="d-icon-home"/></li>
                    <li disabled>{t('accountProfile.form.setting')}</li>
                    <li disabled>{t('accountProfile.form.title')}</li>
                    <li disabled>{t('accountProfile.form.personalInfo')}</li>
                    <li disabled>{t('accountProfile.phone.titleEdit')}</li>
                    <li>{t('accountProfile.phone.titleAdd')}</li>
                </ul>
            </div>
        </nav>
        <div className="page-content mb-9">
        <div className="container">
        <Row gutter={48}>
            <Col xl={6} lg={0}>
                Menu
            </Col> 
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} md={24}>
                <Text>
                <h4 className={`text-center mb-5 ${styles.textPrimary}`}>{t('accountProfile.phone.titleAdd')}</h4>
                </Text>
                <Form layout="vertical">
                    <Row gutter={[16, 8]}>
                        <Col md={12} xs={24} offset="6">
                            <Form.Item label={t('accountProfile.phone.newPhone')} name="phone">
                            <Input maxLength={10} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24} offset="6">
                            <Form.Item>
                            <Button htmlType="submit" className={styles.btnInfo} block>{t('accountProfile.button.sendVerificationCode')}</Button>
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={64} offset="6">
                            <Form.Item label={t('accountProfile.phone.otp')} name="otp">
                            <Input maxLength={10} />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24} offset="6">
                            <Form.Item>
                            <Button  className={styles.btnPrimary} block>{t('accountProfile.button.addPhone')}</Button>
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

export default AddPhone
