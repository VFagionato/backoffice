import { Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import EditUser from "../components/EditUser"

export const Dashboard = () => {
  const navegate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      navegate('/')
    }
  }, [])

  return (
    <Container className="m-1">
      <Row>
        <EditUser />
      </Row>
    </Container>
  )
}