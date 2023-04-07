import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import axios from 'axios';
import Yarn from '../Components/Yarn';

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
    setShowAdd(true);
  };

  const handleYarnChange = (e: any) => {
    e.preventDefault();
    setNewYarn({
      ...newYarn,
      [e.target.name]: e.target.value
    });
  };

  if (showAdd) {
    //form for new yarn addition
    return <Yarn yarn_name={newYarn.yarn_name} weight={newYarn.weight} yardage={newYarn.yardage} color={newYarn.color} onChange={handleYarnChange} />;
  }

  return (
    <View>
      <Text onPress={showForm} style={styles.addYarnBtn}>Add Yarn</Text>
      {yarns.map((yarn) => (
        <View key={yarn.id} style={styles.yarnContainer}>
          <Text onPress={toggleModal}>
            {yarn.name}
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
    alignItems: 'center',
  },
  addYarnBtn: {
    alignSelf: 'flex-end',
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
})

export default YarnTab;
