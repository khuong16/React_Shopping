import React, { useEffect, useState } from 'react';
import UserAPI from '../API/UserAPI';
import queryString from 'query-string'
import MessengerAPI from '../API/MessengerAPI';

import io from "socket.io-client";
const socket = io("http://localhost:3000");

function Chat(props) {

    const [another, setAnother] = useState([])

    const id_admin = '5ff808424e24e9118cee77b2'

    const [id_user2, set_id_user2] = useState('')

    const [message, setMessage] = useState([])

    // Hàm này dùng để tìm ra những user khác với admin
    useEffect(() => {

        const fetchData = async () => {

            const response = await UserAPI.getAllData()

            const user_another = response.filter(value => {
                return value._id !== id_admin
            })

            console.log(user_another)

            setAnother(user_another)
        }

        fetchData()

    }, [])

    // Hàm này dùng để lấy id_user2
    const handler_id_user = (value) => {

        set_id_user2(value)

    }

    // Hàm này dùng để load dữ liệu message và nó sẽ chạy lại khi state id_user2 thay đổi
    // Tức là khi admin chọn người dùng mà admin muốn chat thì state id_user2 sẽ thay đổi
    // để gọi lại hàm này
    useEffect(() => {

        const fetchData = async () => {

            const params = {
                id_user1: id_admin,
                id_user2: id_user2
            }

            const query = '?' + queryString.stringify(params)

            const response = await MessengerAPI.getMessage(query)

            setMessage(response.content)

        }

        fetchData()

    }, [id_user2])



    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-7 align-self-center">
                        <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">Chat</h4>
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0 p-0">
                                    <li className="breadcrumb-item text-muted active" aria-current="page">Apps</li>
                                    <li className="breadcrumb-item text-muted" aria-current="page">Chat</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="row no-gutters">
                                <div className="col-lg-3 col-xl-2 border-right">
                                    <div className="card-body border-bottom">
                                        <form>
                                            <input className="form-control" type="text" placeholder="Search Contact" />
                                        </form>
                                    </div>
                                    <div className="scrollable position-relative" style={{ height: 'calc(100vh - 111px)' }}>
                                        <ul className="mailbox list-style-none">
                                            <li>
                                                <div className="message-center">
                                                    {
                                                        another && another.map(value => (
                                                            (<a href="#" key={value._id} onClick={() => handler_id_user(value._id)}
                                                                className="message-item d-flex align-items-center border-bottom px-3 py-2">
                                                                <div className="user-img"> <img src="https://img.icons8.com/color/36/000000/administrator-male.png"
                                                                    alt="user" className="img-fluid rounded-circle"
                                                                    width="40px" /> <span
                                                                        className="profile-status away float-right"></span>
                                                                </div>
                                                                <div className="w-75 d-inline-block v-middle pl-2">
                                                                    <h6 className="message-title mb-0 mt-1">{value.fullname}</h6>
                                                                    <span
                                                                        className="font-12 text-nowrap d-block text-muted text-truncate">Online</span>
                                                                    <span className="font-12 text-nowrap d-block text-muted">9:08AM</span>
                                                                </div>
                                                            </a>)
                                                        ))
                                                    }

                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-9  col-xl-10">
                                    <div className="chat-box scrollable position-relative"
                                        style={{ height: 'calc(100vh - 111px)' }}>
                                        <ul className="chat-list list-style-none px-3 pt-3">

                                            {
                                                message && message.map(value => (
                                                    value.category === 'send' ? (
                                                        <li className="chat-item odd list-style-none mt-3" key={value.id}>
                                                            <div className="chat-content text-right d-inline-block pl-3">
                                                                <div className="box msg p-2 d-inline-block mb-1">
                                                                    {value.message}
                                                                </div>
                                                                <br />
                                                            </div>
                                                        </li>
                                                    ) : (
                                                            <li className="chat-item list-style-none mt-3" key={value.id}>
                                                                <div className="chat-img d-inline-block">
                                                                    <img
                                                                        src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="user"
                                                                        className="rounded-circle" width="45" />
                                                                </div>
                                                                <div className="chat-content d-inline-block pl-3">
                                                                    <h6 className="font-weight-medium">{value.fullname}</h6>
                                                                    <div className="msg p-2 d-inline-block mb-1">
                                                                        {value.message}
                                                                    </div>
                                                                </div>
                                                                <div className="chat-time d-block font-10 mt-1 mr-0 mb-3">
                                                                    10:57 am
                                                                </div>
                                                            </li>
                                                        )
                                                ))
                                            }



                                        </ul>
                                    </div>
                                    <div className="card-body border-top">
                                        <div className="row">
                                            <div className="col-9">
                                                <div className="input-field mt-0 mb-0">
                                                    <input id="textarea1" placeholder="Type and enter"
                                                        className="form-control border-0" type="text" />
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <a className="btn-circle btn-lg btn-cyan float-right text-white"
                                                    href="#"><i className="fas fa-paper-plane"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer text-center">
                All Rights Reserved by Adminmart. Designed and Developed by <a
                    href="https://wrappixel.com">WrapPixel</a>.
            </footer>
        </div>
    );
}

export default Chat;