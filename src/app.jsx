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

  // 고유id 값으로 사용될 id
  // ref로 변수 담기
  const nextId = useRef(11);

  // user 더미 데이터 호출해서 마운트 됐을때 바로 뿌려주기
  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/users').then((response)=>{
      setInfo(response.data);
    });
  },[]);

  // 데이터 삭제하기 : filter()함수로 전달 받은 id가 아닐 경우 true로 리스트에 남고, 같은 id일 경우 false가 되어 리스트에서 제거
  const handleRemove = (id) => {
    setInfo(info => info.filter(item => item.id !== id));
  }

  // 데이터 추가하기, 기존 배열에 추가하여 새배열을 만들어줌
  const handleSave = (data) => {
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

  // 데이터 수정
  // 함수 실행 시 modalOn을 true로 만들어서 수정창 보이기
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

  // 수정창에서 닫기 버튼 클릭시 modalOn을 false로 만들어서 끄기
  const handleCancel = () => {
    setModalOn(false);
  }

  // 수정하고 저장하면 수정된 값 넘기기
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
