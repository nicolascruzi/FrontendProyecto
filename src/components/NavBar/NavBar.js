import React from 'react';
import './NavBar.css'
import img from "../Images/medicamentos.avif"


const Navbar = () => {
    const state = { clicked: false }

    return (

        <div className="NavbarItems justify-between">
            <div className="flex">
                <img className="foto_navbar" src={img} alt="" />
                <h1 className="navbar-logo pt-3">PrecioJusto <i className="fab fa-react"></i></h1>
                <div className="menu-icon" >
                    <i className={state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
            </div>

            <ul className={state.clicked ? 'nav-menu active' : 'nav-menu space-x-4 pr-4'}>
                <button className="text-white text-xl border-white rounded-lg bg-transparent px-7 py-2 hover:bg-slate-300" >
                    Nosotros
                </button>
                <button className="text-white text-xl border-white rounded-lg bg-transparent px-7 py-2 hover:bg-slate-300" >
                    Buscar Medicamentos
                </button>
            </ul>
        </div>
    )

}


export default Navbar