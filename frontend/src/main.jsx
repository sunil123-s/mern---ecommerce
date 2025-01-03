
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import appstore from './store/StoreConfig/store'
import ChatProvider from './store/Context/UserContext'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <Provider store={appstore}>
    <ChatProvider>
     <App />
    </ChatProvider>
   </Provider>
   <Toaster/>
  </BrowserRouter>
)
