export interface IMemberProfile {
  username: string
  firstName: string
  lastName: string
  mobile: string
  birthday?: string
  day?: string
  month?: string
  year?: string
  gender?: string
  email: string
  code?: string
}

export interface IMemberProfileUpdate {
  firstName: string
  lastName: string
  birthday: string
  gender: string
}

export interface IMemberEmailUpdate {
  newEmail: string
  password: string
}

export interface IMemberMobile {
  id: number
  mobile: string
  isPrimary: boolean
  deletedAt: string
}

export interface IMemberMobilePayload {
  mobile: string
  otpCode: string
  refCode: string
}

export interface IMemberChangePassword {
  oldPassword: string
  newPassword: string
}
