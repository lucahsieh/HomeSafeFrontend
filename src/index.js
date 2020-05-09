import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import { Segment, Container } from 'semantic-ui-react'

import HomePage from "./_pages/home/home.page";
import LoginPage from "./_pages/login.page";
import dashboardPage from "./_pages/dashboard/dashboard.page";
import ProtectedRoute from "./_helpers/protected.route";
import configureFakeBackend from './_helpers/fake-backend';
import ListingPage from './_pages/listing/listing.page';
import PropertyPage from './_pages/property/property.page'

import * as routes from './_constants/routes'

import Navbar from './_components/navbar';
import Footer from './_components/footer';


class App extends React.Component {


    componentDidMount() {
        configureFakeBackend();

    }
    render() {

        return (
            <div className="App">
                <Container>
                    <Navbar></Navbar>
                    <Switch>
                        <Route exact path={routes.HOME} component={HomePage} />
                        <Route exact path={routes.LOGIN} component={LoginPage} />
                        <Route exact path={routes.LISTING} component={ListingPage} />
                        <Route exact path={routes.PROPERTY + '/:id'} component={PropertyPage} />

                        <ProtectedRoute
                            exact
                            path={routes.DASHBOARD}
                            component={dashboardPage} />
                        <Route path="*" component={() => "404 NOT FOUND"} />
                    </Switch>
                </Container>
                <Footer></Footer>
            </div>
        )
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root"));