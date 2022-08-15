import './styles/App.scss'
import { lazy, Suspense } from 'react'
import Loading from './components/loading'

const Footer = lazy(() => import('./components/footer/Footer'))
const Header = lazy(() => import('./components/header/Header'))
const Main = lazy(() => import('./components/main/Main'))

const App = () => (
  <div className="App">
    <Suspense fallback={<Loading />}>
      <section>
        <Header />
        <Main />
        <Footer />
      </section>
    </Suspense>
  </div>
)

export default App
