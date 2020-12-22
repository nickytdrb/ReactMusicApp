import './App.css';
import './css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage'
import Artist from './components/Artist';
import Discography from './components/Discography';
import ArtistDetails from './components/ArtistDetails';

function App() {
  return (
    
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
        <Route exact path='/' component={HomePage}></Route>  
        <Route exact path='/artistdetails/:artistname' component={ArtistDetails}></Route>
        <Route exact path='/discography/:artistname' component={Discography}></Route>
        <Route exact path='/:artistname' component={Artist}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
