import React, { useEffect, useState, useRef } from 'react'
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

    // Delete User Function

    const [userId, setUserId] = useState('');
    const closeRef = useRef(null);

    const deleteUser = async (id, e) => {
        e.preventDefault();

        await axios.delete(`http://localhost:3500/api/v1/user/${id}`);

        closeRef.current.click()
        setTimeout(() => {
            dispatch(getUsers())
        }, 500);

    }
    return (
        <>
            {/* Delete POPUP/MODAL */}
            <div class="modal fade" id="deleteUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete User</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h5 className='mb-4'>Are you sure, you want to Delete?</h5>
                            <a onClick={(e) => deleteUser(userId, e)} href="/" className="btn btn-danger">Delete</a>
                            <a ref={closeRef} href="/" className="ms-5 btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</a>
                        </div>

                    </div>
                </div>
            </div>
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
                                        <a onClick={() => setUserId(user._id)} href="/" className="ms-3 btn btn-danger mt-2" data-bs-toggle="modal" data-bs-target="#deleteUser">Delete User</a>
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
