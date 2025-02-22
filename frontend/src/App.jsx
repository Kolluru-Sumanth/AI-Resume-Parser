import UploadPage from './Uploadpage'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Jobs from './Jobs'

function App() {

  return (
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path='/jobs' element={<Jobs/>} />
      </Routes>
  )
}

export default App
