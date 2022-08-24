import { SellerApprovalStatusEnum, SellerShopTypeEnum } from '~/enums'

export interface ISellerRegisterService {
  type: SellerShopTypeEnum
  fullName: string
  mobile: string
  email: string
  corporateName?: string
  corporateId?: string
  brandName: string
  category: string
  website?: string
  facebookPage?: string
  instagram?: string
  socialMedia?: string
  mallApplicantRole?: string
  mallOfflineShopDetail?: string
  note?: string
}

export interface ISellerInfoRes {
  id: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  type: SellerShopTypeEnum
  fullName: string
  mobile: string
  email: string
  brandName: string
  category: string
  website?: string
  facebookPage?: string
  instagram?: string
  socialMedia?: string
  corperateName?: string
  corperateId?: string
  approvalStatus: SellerApprovalStatusEnum
  shopName?: string
  shopDescription?: string
  productCount: number
  replyRate: string
  shopScore: string
  scoreCount: number
  cancelRate: string
  mallApplicantRole?: string
  mallOfflineShopDetail?: string
  note?: string
  profileImagePath?: string
  coverImagePath?: string
  memberId: number
}
