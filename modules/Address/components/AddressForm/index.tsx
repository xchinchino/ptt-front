import React, { useState } from 'react'
import { Input, Space, Form, FormInstance, Col, Row, Select, Modal, Typography, Button } from 'antd'
import { DeepPartial } from 'redux'
import { Rule } from 'antd/lib/form'
import PickLocationField from './components/PickLocationField'
import provinceData from './mock-data/province-data.json'
import districtData from './mock-data/district-data.json'
import styles from './AddressForm.module.scss'
import t from '~/locales'
import AddressTagField from './components/AddressTagField'
import AddressCheckboxField from './components/AddressCheckboxField'
import { IAddressFormValues } from '~/model/Address'

const { Text } = Typography

const provinceOptions: IBaseOption[] = provinceData.map((d: any) => ({
  label: d.name_th,
  value: d.name_th
}))

const districtOptions: IBaseOption[] = districtData.map((d: any) => ({
  label: d.name_th,
  value: d.name_th
}))

const postalCodeOptions: IBaseOption[] = ['73100', '73150'].map((d: any) => ({
  label: d,
  value: d
}))

interface IAddressFormProps {
  parentForm: FormInstance
  initialValues?: Partial<IAddressFormValues>
  onSubmit: (values: IAddressFormValues) => void
  isSeller?: boolean
}

const AddressForm: React.FC<IAddressFormProps> = (props: IAddressFormProps) => {
  const { parentForm, initialValues, onSubmit, isSeller } = props
  const [hintModalVisible, setHintModalVisible] = useState<boolean>(false)
  const [hintModalData, setHintModalData] = useState<any>({})

  const [form] = Form.useForm(parentForm)
  const [, /* formValues */ setFormValues] = useState<DeepPartial<IAddressFormValues>>({})

  const baseRules: Rule[] = [{ required: true, message: t('required') }]

  function onHintClick(hintType: string): void {
    switch (hintType) {
      // TODO: wait final msg
      case 'isStore':
        setHintModalData({
          title: 'เลือกเป็นที่อยู่ในการรับสินค้า',
          description: 'คำอธิบายบางอย่าง'
        })
        break
      case 'isRefundStore':
        setHintModalData({
          title: 'เลือกเป็นที่อยู่ในการรับสินค้าคืน',
          description: 'คำอธิบายบางอย่าง'
        })
        break
      default:
        break
    }
    setHintModalVisible(true)
  }

  function onFormFinish(values: IAddressFormValues): void {
    console.log({ formValues: values })
    onSubmit?.(values)
  }

  function onFormChange(values: IAddressFormValues): void {
    setFormValues(values)
  }

  return (
    <div className={styles.form}>
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onValuesChange={onFormChange}
        onFinish={onFormFinish}
      >
        <Row
          className={[styles.fieldRow, styles.fieldRowGap].join(' ')}
          gutter={{
            md: 24,
            sm: 12
          }}
        >
          <Col className={styles.fieldCol} md={12} sm={12}>
            <Form.Item label={t('address.form.fullName')} name="fullName" rules={[...baseRules]}>
              <Input />
            </Form.Item>
          </Col>
          <Col className={styles.fieldCol} md={12} sm={12}>
            <Form.Item label={t('address.form.mobileNo')} name="mobileNo" rules={[...baseRules]}>
              <Input />
            </Form.Item>
          </Col>
          <Col className={styles.fieldCol} md={12} sm={12}>
            <Form.Item label={t('address.form.province')} name="province" rules={[...baseRules]}>
              <Select
                filterOption={(value: string, options: IBaseOption): boolean =>
                  `${options.value}`.includes(value)
                }
                allowClear
                autoClearSearchValue
              >
                {provinceOptions.map((option: IBaseOption) => (
                  <Select.Option key={`${option.value}`} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className={styles.fieldCol} md={12} sm={12}>
            <Form.Item label={t('address.form.district')} name="district" rules={[...baseRules]}>
              <Select
                filterOption={(value: string, options: IBaseOption): boolean =>
                  `${options.value}`.includes(value)
                }
                allowClear
                autoClearSearchValue
              >
                {districtOptions.map((option: IBaseOption) => (
                  <Select.Option key={`${option.value}`} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className={styles.fieldCol} md={12} sm={12}>
            <Form.Item
              label={t('address.form.postalCode')}
              name="postalCode"
              rules={[...baseRules]}
            >
              <Select
                filterOption={(value: string, options: IBaseOption): boolean =>
                  `${options.value}`.includes(value)
                }
                allowClear
                autoClearSearchValue
              >
                {postalCodeOptions.map((option: IBaseOption) => (
                  <Select.Option key={`${option.value}`} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className={styles.fieldCol} span={24}>
            <Form.Item
              label={t('address.form.addressDetails')}
              name="addressDetails"
              rules={[...baseRules]}
            >
              <Input.TextArea
                className={styles.addressDetails}
                showCount
                maxLength={200}
                rows={3}
              />
            </Form.Item>
          </Col>
        </Row>
        <Space />
        <Form.Item label={t('address.form.location')} name="location">
          <PickLocationField />
        </Form.Item>
        <Row className={styles.fieldRow}>
          <Col className={styles.fieldCol} md={12} sm={12}>
            <Form.Item
              name="addressType"
              label={t('address.form.addressType')}
              rules={[...baseRules]}
            >
              <AddressTagField />
            </Form.Item>
          </Col>
          <Col className={styles.fieldCol} md={12} sm={12} style={{ alignItems: 'center' }}>
            <Form.Item name="isDefault" noStyle>
              <AddressCheckboxField label={t('address.form.isDefault')} />
            </Form.Item>
          </Col>
          <Col className={styles.fieldCol} md={12} sm={12}>
            <Form.Item name="isStore" noStyle>
              <AddressCheckboxField
                label={t('address.form.isStore')}
                onHintClick={onHintClick.bind(null, 'isStore')}
                disabled={!isSeller}
              />
            </Form.Item>
          </Col>
          <Col className={styles.fieldCol} md={12} sm={12}>
            <Form.Item name="isRefundStore" noStyle>
              <AddressCheckboxField
                label={t('address.form.isRefundStore')}
                onHintClick={onHintClick.bind(null, 'isRefundStore')}
                disabled={!isSeller}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Modal
        className={styles.hintModal}
        visible={hintModalVisible}
        onCancel={setHintModalVisible.bind(null, !hintModalVisible)}
        title={
          <Col span={24}>
            <Text>
              <h4 className="mb-0 text-center">
                <i className={`${styles.cInfo} fas fa-info-circle mr-2`} />
                {hintModalData?.title}
              </h4>
            </Text>
          </Col>
        }
        footer={[
          <Col span={24}>
            <Button type="primary" onClick={setHintModalVisible.bind(null, false)}>
              {t('common.confirm')}
            </Button>
          </Col>
        ]}
      >
        <Text type="secondary"> {hintModalData?.description}</Text>
      </Modal>
    </div>
  )
}

export default AddressForm
