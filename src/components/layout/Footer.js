import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="footer">
                <footer className="py-3 mt-4 text-light" style={{backgroundColor:"#3CB29C"}}>
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                        <li className="nav-item"><a href="/" className="nav-link px-2 text-light">Home</a></li>
                        <li className="nav-item"><a href="/" className="nav-link px-2 text-light">Features</a></li>
                        <li className="nav-item"><a href="/" className="nav-link px-2 text-light">Pricing</a></li>
                        <li className="nav-item"><a href="/" className="nav-link px-2 text-light">FAQs</a></li>
                        <li className="nav-item"><a href="/" className="nav-link px-2 text-light">About</a></li>
                    </ul>
                    <p className="text-center text-light">© 2024 ExpenseTrackPro, Inc</p>
                </footer>
            </div>
        </>
    )
}

export default Footer
