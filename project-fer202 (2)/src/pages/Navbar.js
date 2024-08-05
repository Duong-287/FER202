import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './Nav.css';

export default function Nav() {
    const [searchKey, setSearchKey] = useState("");
    const navigate = useNavigate();//Điều này có nghĩa là bạn có thể điều hướng người dùng đến các route 
    //khác nhau mà không cần sử dụng các liên kết (links) hoặc các thành phần điều hướng khác.

    const handleSearchChange = (e) => {
        setSearchKey(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${searchKey}`);
    };
    return (
        <div className="container-fluid border-bottom">
            <nav className="navbar">
                <div className="container pt-3 pb-3" style={{ maxWidth: "1840px" }}>
                    <div >
                        <a className="navbar-brand fw-bold fs-5" href="/">EduBridge</a>
                        <div className="d-inline-block" style={{ width: '30rem' }}>
                            <form onSubmit={handleSearchSubmit}>
                                <div className="position-relative">
                                    <input
                                        className="form-control rounded-5 pe-5 border"
                                        placeholder="Keyword for searching"
                                        value={searchKey}
                                        onChange={handleSearchChange}
                                    />
                                    <div className="position-absolute end-0 top-0 pe-2" style={{ transform: 'translateY(22%)' }}>
                                        <i className="bi bi-search" onClick={handleSearchSubmit}></i>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <select title="Category" style={{border:"none",width:"100px",height:"35px",borderRadius:"10px",backgroundColor:"rgb(220,220,220)",marginLeft:"10px"}}>
                            <option value="" disabled selected>Category</option>
                            <option value="a">Ngôn ngữ lập trình</option>
                            <option value="b">Something else</option>
                        </select>
                        <a className="btn ms-2 aa" href="" target="_blank">Plans and pricing</a>
                    </div>
                    <div>
                        <Link className="aa btn position-relative" to="/wishlist">
                            Wishlist
                        </Link>
                        <Link className="btn position-relative fw-bold fs-5" to="/login">
                            Login
                        </Link>
                        <button style={{ backgroundColor: "black", color: "white" }}>
                            <span className='aa'>Get started</span>
                            <span><i className="bi bi-arrow-right"></i></span>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}