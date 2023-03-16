import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail"
import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Router = () => {
    return (
        <BrowserRouter>
        <Layout>
            <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:id" element={<Detail />} />
                </Routes>
            <Footer />
        </Layout>
        </BrowserRouter>
    );
};

export default Router;