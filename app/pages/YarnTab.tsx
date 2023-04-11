import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import axios from 'axios';
import Yarn from '../Components/Yarn';
import Ionicons from '@expo/vector-icons/Ionicons';

const YarnTab: React.FC = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [yarns, setYarns] = useState<any[]>([]);
  const [newYarn, setNewYarn] = useState({
      yarn_name: '',
      weight: 0,
      yardage: 0,
      color: '',
      project_id: 0
  });

  const modalRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const toggleModal = () => {
    if (modalRef.current) {
      modalRef.current.isVisible ? hideModal() : showModal();
    }
  };

  useEffect(() => {
    const getYarn = async () => {
      try {
        let result = await axios.get(`http://192.168.1.150:3001/yarn`)
        setYarns(result.data);
      } catch (error) {
        setYarns([null]);
      }
    }
    getYarn();
  });

  const showForm = () => {
    setShowAdd(!showAdd);
  };

  const handleYarnChange = (e: any) => {
    e.preventDefault();
    setNewYarn({
      ...newYarn,
      [e.target.name]: e.target.value
    });
  };

  const handleAddYarn = async (e: any) => {
    e.preventDefault();
    let res = await axios.post('http://localhost:3001/yarn', {
      newYarn
    });
    console.log(res);
    console.log(newYarn);
  };

  if (showAdd) {
    //form for new yarn addition
    return (
      <>
        <Yarn yarn_name={newYarn.yarn_name} weight={newYarn.weight} yardage={newYarn.yardage} color={newYarn.color} onChange={handleYarnChange} />
        <Text onPress={handleAddYarn}>Add Yarn</Text>
        <Text onPress={showForm}>Go Back</Text>
      </>
    );
  }

  return (
    <View style={styles.yarnContainer}>
      <Text onPress={showForm} style={styles.addYarnBtn}>Add Yarn</Text>
      {yarns.map((yarn) => (
        <View key={yarn.id} >
          <Text style={styles.yarnList}  onPress={toggleModal}>
          <Ionicons name="flower-outline"/> {yarn.name}
          </Text>
          <Modal
            ref={modalRef}
            visible={isModalVisible}
          >
            <Text>{JSON.stringify(yarn.name)}</Text>
            <Text onPress={hideModal}>Close</Text>
          </Modal>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  yarnContainer: {
    backgroundColor: '#F9DBBD',
    minHeight: '100%',
  },
  addYarnBtn: {
    alignSelf: 'flex-end',
    padding: 3,
    color: '#FFA5AB',
    backgroundColor: '#450920',
    marginTop: 5,
    marginRight: 2,
  },
  yarnList: {
    color: '#450920',
    fontSize: 20,
  }
})

export default YarnTab;
