import React, { useEffect, useState, useRef } from 'react'
import './cards.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../action/UserAction'
import { SpinnerRoundOutlined } from 'spinners-react';
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserList = () => {
    const notify = () => toast("Wow so easy !");
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

    // Edit User Functionality
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [img, setImg] = useState('');

    const openEditModel = useRef(null)

    // Getting editing user details and displaying POPUP
    const getSingleUser = async (id, e) => {

        e.preventDefault();
        let result = await axios.get(`http://localhost:3500/api/v1/user/${id}`);
        const { name, email, img } = result.data.user;

        openEditModel.current.click();
        setName(name)
        setEmail(email)
        setImg(img)
        setUserId(id)
    }
    // Update User data
    const updateUser = async (e) => {

        e.preventDefault();

        await fetch("http://localhost:3500/api/v1/user/update", {
            method: "Post",
            body: JSON.stringify({
                name, email, img, userId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        closeRef.current.click();
        dispatch(getUsers())
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
            {/* Edit User POPUP/MODAL */}
            <div class="modal fade" id="editUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Update User</h5>
                            <button ref={closeRef} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <div className="col-10 mx-auto">
                                <form>
                                    <div className="mb-3 ">
                                        <label for="exampleInputEmail1" className=" form-label">Name</label>
                                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="form-control" />
                                    </div>
                                    <div className="mb-3 ">
                                        <label for="exampleInputEmail1" className=" form-label">Email address</label>
                                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" />
                                    </div>
                                    <div className="mb-3 ">
                                        <label for="exampleInputEmail1" className=" form-label">Image Link</label>
                                        <input onChange={(e) => setImg(e.target.value)} value={img} type="text" className="form-control" />
                                    </div>

                                    <a onClick={(e) => updateUser(e)} href="/" className="btn btn-primary">Update User</a>
                                </form>
                            </div>
                            <input type="hidden" ref={openEditModel} className="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#editUser" />
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
                                        <a onClick={(e) => getSingleUser(user._id, e)} href="/" className="btn btn-primary mt-2">Edit User</a>
                                        <a onClick={() => setUserId(user._id)} href="/" className="ms-3 btn btn-danger mt-2" data-bs-toggle="modal" data-bs-target="#deleteUser">Delete User</a>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

<button onClick={notify}>Notify !</button>
                </div>
            </div>
        </>
    )
}
