import React from "react";
import {NavLink} from "react-router-dom";


const Home=()=>{
    return(
        <div className="home">
            <header>
                <h1>File Uploader</h1>
            </header>

            <main>
                <section>
                    <h2>Welcome to File Uploader!</h2>
                    <p>Upload and share your files with ease.</p>
                    <NavLink to="/login" className="cta-button">Get Started</NavLink>
                    {/*<a href="#" className="cta-button">Get Started</a>*/}
                </section>
            </main>

            <footer>
                <p>&copy; 2023 File Uploader. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Home;