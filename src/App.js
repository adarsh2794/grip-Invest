import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import NavBar from './components/NavBar';
import Clients from './components/client/client';
import Actions from './components/actions/Actions';

export default function App() {
  return (
    <Router>
      <NavBar/>
        <Route path="/" exact render={()=><Clients/>}/>
        <Route path="/actions" exact render={() => <Actions />} />
    </Router>
  );
}