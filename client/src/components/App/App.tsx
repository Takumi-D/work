import React, { useEffect } from 'react';
import { Route, Routes, useLocation  } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../store/store";
import { clearSuccessMessage, clearErrorMessage } from "../../slices/references-slice"

import "./App.scss";

import Header from "../Header";
import HomePage from "../HomePage";
import ReferenceForm from "../ReferenceForm";
import WorkTypeForm from "../WorkTypeForm";
import Listing from "../Listing";

function App(){
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    useEffect(() => {
        dispatch(clearSuccessMessage());
        dispatch(clearErrorMessage());
    }, [location.pathname]);

    return (
        <>
            <Header />

            <Routes>
                <Route path="/" Component={ HomePage } />
                <Route path="/listing" Component={ Listing } />
                <Route path="/reference-form" Component={ ReferenceForm } />
                <Route path="/reference-form/:id" Component={ ReferenceForm } />
                <Route path="/work-type-form" Component={ WorkTypeForm } />
            </Routes>
        </>
    )
}

export default App;