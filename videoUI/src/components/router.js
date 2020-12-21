import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SectionOne from './homepage/sectionone';
export default RouterApp => {



    
    return (
        <Router>
        <SectionOne/>
        <Switch>
        </Switch>
        </Router>
    )

}