import React, { FC } from 'react'
import { AxiosResponse } from 'axios'
import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Profile from '~/modules/Profile'
import { LocaleNamespaceConst } from '~/constants'
import { MembersService } from '~/services'
import { IMemberProfile } from '~/interfaces'
import { CommonApiCodeEnum } from '~/enums'

interface IProfilePageProps {
  profile: IMemberProfile
}

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  let profile: IMemberProfile = {
    username: '',
    firstName: '',
    lastName: '',
    mobile: '',
    birthday: '',
    gender: '',
    email: ''
  }

  const { req } = context
  if (req) {
    try {
      const result: AxiosResponse = await MembersService.memberProfile(req)
      if (result.data?.code === CommonApiCodeEnum.SUCCESS) {
        profile = result.data.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'account-info'])),
      profile
    }
  }
}

const ProfilePage: FC<IProfilePageProps> = (props: IProfilePageProps) => (
  <Profile member={props.profile} />
)

export default ProfilePage
