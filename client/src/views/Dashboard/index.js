import { Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import EditUser from "../components/EditUser"
import { useSelector } from "react-redux"
import UserList from "../components/UserList"

export const Dashboard = () => {
  const user = useSelector(state => state.userData.user)
  const navegate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      navegate('/login')
    }
  }, [])

  return (
    <Container fluid className="p-3">
      <Row>
        <Col xs={3}>
          <EditUser />
        </Col>
        <Col>
          {user.permission === 1 && <UserList />}
        </Col>
      </Row>
    </Container>
  )
}