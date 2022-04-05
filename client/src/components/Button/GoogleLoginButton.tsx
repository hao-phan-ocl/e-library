import GoogleLogin from 'react-google-login'
import { useDispatch } from 'react-redux'

import instance from '../../axios/instance'
import { request } from '../../axios/requests'
import { loginSuccess } from '../../redux/auth/actions'
import { User } from '../../types'

type GoogleLoginResponse = {
  user: User
  token: string
}

export default function GoogleLoginButton() {
  const dispatch = useDispatch()

  const responseGoogle = async (response: any) => {
    const tokenId = response?.tokenId

    const res = await instance.post<GoogleLoginResponse>(
      request('users', 'google-login'),
      {
        id_token: tokenId,
      }
    )

    if (res.status === 200) {
      const { user, token } = res.data

      localStorage.setItem('access_token', token)
      dispatch(loginSuccess(user))
    } else {
      alert('Google login failed')
    }
  }

  return (
    <GoogleLogin
      theme="dark"
      clientId={
        '49177348542-h4qigqvg6mcqp0glua3piaoftfqql2h5.apps.googleusercontent.com'
      }
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}
