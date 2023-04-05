import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.user)

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }
  }, [userInfo])

  return <div>{userInfo && <h1>Hello {userInfo.name}</h1>}</div>
}
export default HomePage
