import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './app.module.css';
import Tablelist from './components/table/tablelist';
import Addwrite from './components/write/addwrite';
import Editmodal from './components/edit/editmodal';

function App() {

  const [info, setInfo] = useState([]);
  const [selected, setSelected] = useState('');
  const [modalOn, setModalOn] = useState(false);

  // 고유id 값을 변수에 담기
  const nextId = useRef(11);

  // user 더미 데이터 호출하기
  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/users').then((response)=>{
      setInfo(response.data);
    });
  },[]);

  // 데이터 삭제하기
  const handleRemove = (id) => {
    setInfo(info => info.filter(item => item.id !== id));
  }

  // 데이터 추가하기
  const handleSave = (data) => {
    if(data.id) {
      setInfo(
        info.map(row => data.id === row.id ? {
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          website: data.website
        } : row))
    } else {
      setInfo(info => info.concat(
        {
          id: nextId.current,
          name: data.name,
          email: data.email,
          phone: data.phone,
          website: data.website
        }
      ))
      nextId.current += 1;
    }
  }

  // 데이터 수정
  const handleEdit = (item) => {
    setModalOn(true);
    const selectedData = {
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      website: item.website
    };
    console.log(selectedData);
    setSelected(selectedData);
  };

  const handleCancel = () => {
    setModalOn(false);
  }

  const handleEditSubmit = (item) => {
    console.log(item);
    handleSave(item);
    setModalOn(false);
  }

  return (
    <div className={styles.app}>
      <div className={styles.tit}>고객 정보 리스트</div>
      <table>
        <thead>
          <tr>
            <th className={`${styles.th} ${styles.id}`}>No.</th>
            <th className={`${styles.th} ${styles.name}`}>이름</th>
            <th className={`${styles.th} ${styles.mail}`}>이메일</th>
            <th className={`${styles.th} ${styles.tel}`}>연락처</th>
            <th className={`${styles.th} ${styles.site}`}>홈페이지</th>
            <th className={`${styles.th} ${styles.edit}`}>수정</th>
            <th className={`${styles.th} ${styles.del}`}>삭제</th>
          </tr>
        </thead>
        <Tablelist info={info} handleRemove={handleRemove} handleEdit={handleEdit} />
      </table>
      <Addwrite onSaveData={handleSave} />
      {modalOn && <Editmodal selectedData={selected} handleCancel={handleCancel} handleEditSubmit={handleEditSubmit} />}
    </div>
  );
}

export default App;
