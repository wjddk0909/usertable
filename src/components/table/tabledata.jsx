import React from "react";
import styles from './tabledata.module.css';

const Tabledata = ({ item, handleRemove, handleEdit }) => {
    // 해당 id를 가진 item 삭제
    const onRemove = () => {
        handleRemove(item.id)
    }
    // 수정하기
    const onEdit = () => {
        handleEdit(item);
    }

    return (
        <>
            <tr>
                <td className={`${styles.td} ${styles.id}`}>{item.id}</td>
                <td className={styles.td}>{item.name}</td>
                <td className={styles.td}>{item.email}</td>
                <td className={styles.td}>{item.phone}</td>
                <td className={styles.td}>{item.website}</td>
                <td onClick={onEdit} className={`${styles.td} ${styles.icon}`}><i class="fas fa-pen-square"></i></td>
                <td onClick={onRemove} className={`${styles.td} ${styles.icon}`}><i class="fas fa-minus-square"></i></td>
            </tr>
        </>
    )
}

export default Tabledata;