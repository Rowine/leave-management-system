import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Footer from './components/Footer'
import Header from './components/Header'
import CreateLeavePage from './pages/CreateLeavePage'
import EditLeavePage from './pages/EditLeavePage'
import EditProfilePage from './pages/EditProfilePage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <BrowserRouter basename="/">
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        pauseOnHover
      />
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Container fluid className="flex-grow-1">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/create" element={<CreateLeavePage />} />
            <Route path="/edit/:id" element={<EditLeavePage />} />
            <Route path="/profile" element={<EditProfilePage />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
