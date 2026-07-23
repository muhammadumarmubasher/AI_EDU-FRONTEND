import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Analyzer from "./pages/Analyzer";
import Features from "./pages/Features";

import "./App.css";


function Home() {


    const scrollToSection = (id) => {

        const section = document.getElementById(id);

        if(section){

            section.scrollIntoView({
                behavior: "smooth"
            });

        }

    };


    return (

        <div className="app">


            <nav className="navbar">


                <div className="logo">
                    <span>AI</span> Edu
                </div>



                <div className="nav-links">


                    <button
                    className="nav-home"
                    onClick={()=>{
                        window.scrollTo({
                            top:0,
                            behavior:"smooth"
                        });
                    }}
                    >
                        Home
                    </button>



                    <a
                    href="#features"
                    onClick={(e)=>{
                        e.preventDefault();
                        scrollToSection("features");
                    }}
                    >
                        Features
                    </a>



                    <a
                    href="#analyzer"
                    onClick={(e)=>{
                        e.preventDefault();
                        scrollToSection("analyzer");
                    }}
                    >
                        Analyzer
                    </a>


                </div>


            </nav>





            <section className="hero">


                <div className="hero-text">


                    <h1>
                        Learn Smarter
                        <br/>
                        With <span>AI Technology</span>
                    </h1>



                    <p>
                        AI Edu is an AI Powered Educational System
                        that analyzes learning content and generates
                        summaries, quizzes and intelligent answers.
                    </p>



                    <button
                    className="main-btn"
                    onClick={()=>{
                        scrollToSection("analyzer");
                    }}
                    >
                        Start Learning
                    </button>


                </div>




            </section>





            <section id="features">

                <Features />

            </section>





            <section id="analyzer">

                <Analyzer />

            </section>


        </div>

    );

}





function App(){

    return (

        <BrowserRouter>

            <Routes>


                <Route
                path="/"
                element={<Home />}
                />


            </Routes>

        </BrowserRouter>

    );

}


export default App;