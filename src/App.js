import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Navbar} from "./components/Navbar";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Profile} from "./pages/Profile";
import {AlertState} from "./context/alert/AlertState";
import {Alert} from "./components/Alert";
import {GithubState} from "./context/github/GithubState";

function App() {
    return (
        <GithubState>
            <AlertState>
                <BrowserRouter>
                    <Navbar/>
                    <div className="container pt-4">
                        <Alert alert={{text: "Введите текст", type: 'danger'}}/>
                        <Switch>
                            <Route path='/' exact component={Home}/>
                            <Route path='/about' component={About}/>
                            <Route path='/profile/:name' component={Profile}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </AlertState>
        </GithubState>
    );
}

export default App;
