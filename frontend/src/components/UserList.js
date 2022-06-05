import React, { useEffect } from 'react'
import './cards.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../action/UserAction'
import { SpinnerRoundOutlined } from 'spinners-react';
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";

export const UserList = () => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.users)
    useEffect(() => {

        dispatch(getUsers())

        AOS.init();
        AOS.refresh();

    }, [dispatch])

    const deleteUser = async (id,e) => {
        e.preventDefault();
        // alert(id)
        await axios.delete(`http://localhost:3500/api/v1/user/${id}`);

        dispatch(getUsers())
    }
    return (
        < >
            {
                (loading) ?
                    <div className="container loading_container">
                        <div className="row">
                            <div className="col-12">
                                {
                                    <SpinnerRoundOutlined size={90} thickness={150} speed={100} color="rgba(255, 140, 50, 1)" />
                                }

                            </div>
                        </div>
                    </div>
                    : null
            }
            <div className='container mt-5'>
                <div className="row">
                    {
                        users && users.map((user) => (
                            <div data-aos="fade-up" className="col-4 mb-5" id={user._id}>
                                <div className="card text-star">
                                    <img src={user.img} className="card_img card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{user.name}</h5>
                                        <h6>Email : {user.email}</h6>
                                        <a href="/" className="btn btn-primary mt-2">Edit User</a>
                                        <a onClick={(e)=>deleteUser(user._id,e)} href="/" className="ms-3 btn btn-danger mt-2">Delete User</a>
                                </div>
                            </div>
                            </div>
                ))
                    }


            </div>
        </div>
        </>
    )
}
