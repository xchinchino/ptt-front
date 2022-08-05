import React from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Radio, Col, Form, Input, Row, Select } from 'antd'
import HighlightLabel from '~/components/main/HighlightLabel'
import { LocaleNamespaceConst } from '~/constants'

const { Text } = Typography

interface IFormProductFeaturesProps {
  label?: string
  value?: boolean
  onChange?: (value: boolean) => void
  onHintClick?: () => void
  disabled?: boolean
}
const Features: React.FC<IFormProductFeaturesProps> = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])
  return (
    <>
      <HighlightLabel title={t('seller.product:form.features.title')} />
      <Row gutter={[16, 8]}>
        <Col md={12}>
          <Form.Item
            label={t('seller.product:form.features.brand')}
            name="brand"
            rules={[{ required: true }]}
          >
            <Select defaultValue="">
              <Select.Option value="">{t('common.form.option')}</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item
            label={t('seller.product:form.features.weight')}
            name="weight"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input suffix={<Text type="secondary">{t('seller.product:form.features.kg')}</Text>} />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item label={t('seller.product:form.features.shelfLife')} name="shelfLife">
            <Input suffix={<Text type="secondary">{t('seller.product:form.features.day')}</Text>} />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item label={t('seller.product:form.features.condition')} name="condition">
            <Radio.Group>
              <Radio value={1} className="mr-5">
                {t('seller.product:form.features.old')}
              </Radio>
              <Radio value={2}>{t('seller.product:form.features.new')}</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

Features.defaultProps = {
  value: false,
  onChange: undefined,
  onHintClick: undefined,
  disabled: false
}

export default Features
