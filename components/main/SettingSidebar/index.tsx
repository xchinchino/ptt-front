import React, { useState, useEffect, FC } from 'react'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import { Typography, Button, Menu, MenuProps } from 'antd'
import { MenuInfo } from 'rc-menu/lib/interface'
import { LocaleNamespaceConst } from '~/constants'

const { Text } = Typography

interface ISettingSidebarProps {
  sidebarType: string
}

interface IMenuItem {
  href?: string
  label: string
  key: string
  icon?: React.ReactNode
  children?: MenuItem[]
  type?: 'group'
}

type MenuItem = Required<MenuProps>['items'][number]

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): IMenuItem =>
  ({
    key,
    icon,
    children,
    label,
    type
  } as IMenuItem)

const SettingSidebar: FC<ISettingSidebarProps> = (props: ISettingSidebarProps) => {
  const { t } = useTranslation(LocaleNamespaceConst)
  const router: NextRouter = useRouter()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentSelected, setCurrentSelected] = useState<string[]>([])

  // ===========================
  // ========== Buyer ==========
  // ===========================
  const buyerItems: MenuProps['items'] = [
    getItem(t('setting-sidebar:buyer.account.title'), 'account', <i className="fas fa-user" />, [
      getItem(t('setting-sidebar:buyer.account.info'), 'info'),
      getItem(t('setting-sidebar:buyer.account.address'), 'address'),
      getItem(t('setting-sidebar:buyer.account.password'), 'password'),
      getItem(t('setting-sidebar:buyer.account.relation'), 'relation')
    ]),
    getItem(t('setting-sidebar:buyer.wallet.title'), 'finance', <i className="fas fa-wallet" />, [
      getItem(t('setting-sidebar:buyer.wallet.eWallet'), 'e-wallet'),
      getItem(t('setting-sidebar:buyer.wallet.bank'), 'bank'),
      getItem(t('setting-sidebar:buyer.wallet.point'), 'happy-point')
    ]),
    getItem(t('setting-sidebar:buyer.coupon.title'), 'coupon', <i className="fas fa-ticket-alt" />),
    getItem(
      t('setting-sidebar:buyer.history.title'),
      'history',
      <i className="fas fa-shopping-cart" />
    ),
    getItem(
      t('setting-sidebar:buyer.notification.title'),
      'notification',
      <i className="fas fa-bell" />
    )
  ]

  // ============================
  // ========== Seller ==========
  // ============================
  const sellerItems: MenuProps['items'] = [
    getItem(t('setting-sidebar:seller.delivery.title'), 'delivery', <i className="fas fa-truck" />),
    getItem(
      t('setting-sidebar:seller.order.title'),
      'order',
      <i className="fas fa-file-invoice-dollar" />
    ),
    getItem(t('setting-sidebar:seller.product.title'), 'product', <i className="fas fa-box" />, [
      getItem(t('setting-sidebar:seller.product.list'), 'list'),
      getItem(t('setting-sidebar:seller.product.add'), 'add')
    ]),
    getItem(t('setting-sidebar:seller.marketing.title'), 'marketing', <i className="fas fa-tag" />),
    getItem(t('setting-sidebar:seller.payment.title'), 'payment', <i className="fas fa-wallet" />),
    getItem(
      t('setting-sidebar:seller.report.title'),
      'report',
      <i className="fas fa-chart-line" />
    ),
    getItem(t('setting-sidebar:seller.shop.title'), 'shop', <i className="fas fa-store" />, [
      getItem(t('setting-sidebar:seller.shop.point'), 'point'),
      getItem(t('setting-sidebar:seller.shop.detail'), 'detail'),
      getItem(t('setting-sidebar:seller.shop.category'), 'category'),
      getItem(t('setting-sidebar:seller.shop.recommended'), 'recommended')
    ]),
    getItem(
      t('setting-sidebar:seller.management.title'),
      'management',
      <i className="fas fa-cog" />,
      [
        getItem(t('setting-sidebar:seller.management.address'), 'address'),
        getItem(t('setting-sidebar:seller.management.account'), 'account')
      ]
    ),
    getItem(
      t('setting-sidebar:seller.service.title'),
      'service',
      <i className="fas fa-comment-dots" />
    )
  ]
  const items: MenuProps['items'] = props.sidebarType === 'seller' ? sellerItems : buyerItems

  useEffect(() => {
    calcCollapsed()
    initCurrentSelected()
    window.addEventListener('resize', calcCollapsed)

    return (): void => {
      window.removeEventListener('resize', calcCollapsed)
    }
  }, [])

  function initCurrentSelected(): void {
    const selected: string[] = []
    items.forEach((item: IMenuItem) => {
      if (item.children?.length) {
        item.children.forEach((i: IMenuItem) => {
          if (router.pathname.includes(i.key)) {
            selected.push(i.key)
          }
        })
      } else if (router.pathname.includes(item.key)) {
        selected.push(item.key)
      }
    })
    setCurrentSelected(selected)
  }

  function calcCollapsed(): void {
    if (window.innerWidth >= 1200) {
      setCollapsed(false)
    } else {
      setCollapsed(true)
    }
  }

  function getClassName(): string {
    if (collapsed) {
      if (isOpen) {
        return 'setting-sidebar ss-collapsed ss-active'
      }
      return 'setting-sidebar ss-collapsed'
    }
    return 'setting-sidebar'
  }

  function getDefaultOpenKey(): string[] {
    const selected: string[] = []
    items.forEach((item: IMenuItem) => {
      selected.push(item.key)
    })
    return selected
  }

  function onClick(e: MenuInfo): void {
    let pathname: string = ''
    if (e.keyPath?.length) {
      pathname += props.sidebarType === 'seller' ? '/seller/settings' : '/settings'
      e.keyPath.reverse().forEach((key: string) => {
        pathname += `/${key}`
      })
    }
    if (pathname) {
      router.push(pathname)
    }
  }

  function onClose(e: any): void {
    if (e.target.className === 'ss-bar') {
      setIsOpen(false)
    }
  }

  return (
    <div className={getClassName()}>
      <div className="ss-open">
        <Button
          icon={<i className="fas fa-chevron-right" />}
          size="large"
          onClick={(): void => setIsOpen(true)}
        />
      </div>
      <div className="ss-bar" onClick={onClose} aria-hidden="true">
        <div className="ss-close">
          <Text onClick={(): void => setIsOpen(false)}>
            <i className="d-icon-times" />
          </Text>
        </div>
        <Menu
          className="hps-scroll"
          onClick={onClick}
          defaultOpenKeys={getDefaultOpenKey()}
          selectedKeys={currentSelected}
          mode="inline"
          items={items}
        />
      </div>
    </div>
  )
}

export default SettingSidebar
