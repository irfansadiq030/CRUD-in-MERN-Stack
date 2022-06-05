import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AddUser = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [img, setImg] = useState('');

    // save user DATA
    const saveUser = async (e) => {
        e.preventDefault();
        await axios({
            method: 'post',
            url: 'http://localhost:3500/api/v1/add',
            data: {
                name, email, img
            }
        });

        setName('');
        setEmail('');
        setImg('');
        // navigate('/users')
    }
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <h3>Add User</h3>
                    <div className="col-6 mx-auto">
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

                            <button onClick={saveUser} type="submit" className="btn btn-primary">Save User</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
