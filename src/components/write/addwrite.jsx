import React, { useState } from "react";
import styles from './addwrite.module.css';

const Addwrite = ({ onSaveData }) => {
    const [add, setAdd] = useState({
        name: '',
        email:'',
        phone:'',
        website:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdd({
            ...add,
            [name]: value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveData(add);
        console.log(add);
        setAdd({ // 인풋박스 초기화 시키기
            name:'',
            email:'',
            phone:'',
            website:''
        })
    }

    return (
        <>
            <div className={styles.addTit}>정보 추가</div>
            <form onSubmit={handleSubmit}>
                <div className={styles.formBox}>
                    <label htmlFor="username" className={styles.namebox}>이름 <input name="name" type="text" placeholder="이름 입력" value={add.name} onChange={handleChange} /></label>
                    <label htmlFor="usermail" className={styles.mailbox}>메일 <input name="email" type="email" placeholder="이메일 입력" value={add.email} onChange={handleChange} /></label>
                </div>
                <div className={styles.formBox}>
                    <label htmlFor="userphone" className={styles.phonebox}>연락처 <input name="phone" type="text" placeholder="연락처 입력" value={add.phone} onChange={handleChange} /></label>
                    <label htmlFor="usersite" className={styles.sitebox}>웹사이트 <input name="website" type="text" placeholder="웹사이트 입력" value={add.website} onChange={handleChange} /></label>
                </div>
                <div className={styles.btnbox}>
                    <button className={styles.save} type="submit">저장</button>
                </div>
            </form>
        </>
    )
}

export default Addwrite;