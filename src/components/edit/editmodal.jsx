import React, { useState } from "react";
import styles from './editmodal.module.css';

const Editmodal = ({ selectedData, handleCancel, handleEditSubmit }) => {
    // 수정 선택된 객체 가져오기
    const [edited, setEdited] = useState(selectedData);
    const onCancel = () => {
        handleCancel();
    }

    // input창 변경되면 value값 넣어주기
    const onEditChange = (e) => {
        setEdited({
            ...edited,
            [e.target.name]: e.target.value
        })
    }

    // 수정된 값 넘기기
    const onSubmitEdit = (e) => {
        e.preventDefault();
        handleEditSubmit(edited);
    }
     return (
        <div className={styles.modalWrap}>
            <div className={styles.modalBox}>
                <div className={styles.titBox}>
                    <div className={styles.modalTit}>정보 수정</div>
                </div>
                <form onSubmit={onSubmitEdit}>
                    <div className={styles.modalForm}>
                        <div><span className={styles.subject}>이름 : </span><input className={styles.modalInput} type="text" name='name' value={edited.name} onChange={onEditChange} /></div>
                        <div><span className={styles.subject}>이메일 : </span><input className={styles.modalInput} type="text" name='email' value={edited.email} onChange={onEditChange} /></div>
                        <div><span className={styles.subject}>연락처 : </span><input className={styles.modalInput} type="text" name='phone' value={edited.phone} onChange={onEditChange} /></div>
                        <div><span className={styles.subject}>웹사이트 : </span><input className={styles.modalInput} type="text" name='website' value={edited.website} onChange={onEditChange} /></div>
                    </div>
                    <div className={styles.modalBtn}>
                        <button className={`${styles.btn} ${styles.modalCancel}`} onClick={onCancel}>취소</button>
                        <button className={`${styles.btn} ${styles.modalSave}`} type="submit">수정</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Editmodal;