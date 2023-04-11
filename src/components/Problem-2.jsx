import React from 'react';


import { NavLink, Outlet } from 'react-router-dom';
const Problem2 = () => {

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <NavLink to='/problem-2/all'>
                        <button className="btn btn-lg btn-outline-primary" type="button" >All Contacts</button>
                    </NavLink>
                    <NavLink to='/problem-2/us'>
                        <button className="btn btn-lg btn-outline-warning" type="button" >US Contacts</button>
                    </NavLink>

                    <Outlet />
                </div>

            </div>

        </div>
    );
};

export default Problem2;