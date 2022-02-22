import NavBar from './components/NavBar'
import NotFound from './components/NotFound'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AllAnnouncements from './components/AllAnnouncements'
import AddAnnouncement from './components/AddAnnouncement'
import EditAnnouncement from './components/EditAnnouncement'
import Announcement from './components/Announcement'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/' component={AllAnnouncements} />
        <Route exact path='/add' component={AddAnnouncement} />
        <Route exact path='/edit/:id' component={EditAnnouncement} />
        <Route exact path='/announcements/:id' component={Announcement} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
