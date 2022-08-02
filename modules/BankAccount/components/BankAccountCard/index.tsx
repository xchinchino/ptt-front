import { Col, Image, Row, Typography } from 'antd'
import React, { useMemo } from 'react'
import { BankStatus, IBankAccountData } from '~/model/BankAccount'
import styles from './BankAccountCard.module.scss'
import BankLogo from './BankLogo'
import t from '~/locales'
import { sensorBankAccountNo } from '~/utils/main/helper'

const { Text } = Typography

interface IBankAccountCardProps {
  data: IBankAccountData
  onEditClick: () => void
  onFavoriteClick: () => void
  onDeleteClick: () => void
}

const BankAccountCard: React.FC<IBankAccountCardProps> = (props: IBankAccountCardProps) => {
  const { data, onEditClick, onFavoriteClick, onDeleteClick } = props

  const statusLabel: string = useMemo(() => {
    switch (data.status) {
      case BankStatus.APPROVED:
        return t('bankAccount.status.approved')
      case BankStatus.REJECTED:
        return t('bankAccount.status.rejected')
      case BankStatus.PENDING:
      default:
        return t('bankAccount.status.pending')
    }
  }, [data.status])

  function handleFavoriteClick(): void {
    if (!data.isDefault) {
      onFavoriteClick()
    }
  }

  function handleDeleteClick(): void {
    if (!data.isDefault) {
      onDeleteClick()
    }
  }

  return (
    <Row className={styles.layout} gutter={[8, 8]}>
      <Col sm={18} xs={24}>
        <Row gutter={[16, 16]}>
          <Col className={styles.bankLogo} xs={4}>
            <BankLogo bank={data.bankName} />
          </Col>
          <Col className={styles.bankInfoLayout}>
            <div className={styles.bankName}>
              <Text>{`${data.bankFullName} (${data.bankName})`}</Text>
            </div>
            <div className={styles.bankStatus}>
              <Text>{statusLabel}</Text>
            </div>
            <div className={styles.bankAccountName}>
              <Text>{data.bankAccountName}</Text>
            </div>
            <div className={styles.bankTagDefault}>
              {data.isDefault && (
                <Image preview={false} src="./images/main/buyer/bank-account-tag-default.svg" />
              )}
            </div>
          </Col>
        </Row>
      </Col>
      <Col className={styles.bankAccountNo}>
        <div>
          <Text>{sensorBankAccountNo(data.bankAccountNo)}</Text>
        </div>
      </Col>
      <Col className={styles.actionLayout} md={4} sm={2}>
        <Image
          className={[styles.clickable, styles.actionIcon].join(' ')}
          preview={false}
          src="./images/main/buyer/icon-edit.svg"
          onClick={onEditClick}
        />
        <Image
          className={[
            styles.clickable,
            styles.actionIcon,
            data.isDefault ? styles.disabled : ''
          ].join(' ')}
          preview={false}
          src={`./images/main/buyer/icon-favorite${data.isDefault ? '-disabled' : ''}.svg`}
          onClick={handleFavoriteClick}
        />
        <Image
          className={[
            styles.clickable,
            styles.actionIcon,
            data.isDefault ? styles.disabled : ''
          ].join(' ')}
          preview={false}
          src={`./images/main/buyer/icon-delete${data.isDefault ? '-disabled' : ''}.svg`}
          onClick={handleDeleteClick}
        />
      </Col>
    </Row>
  )
}

export default BankAccountCard
