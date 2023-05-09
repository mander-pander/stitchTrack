import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import axios from 'axios';
import Yarn from '../Components/Yarn';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '@rneui/themed';

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

  useEffect(() => {
    async function getYarn() {
      try {
        let response = await axios.get(`http://192.168.1.150:3001/yarn`);
        if (response.data) {
          setYarns(response.data);
        }
      } catch (error) {
        setYarns([null]);
      }
    }
    getYarn();
  }, []);


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
    let res = await axios.post('http://192.168.1.150:3001/yarn', {
      newYarn
    });
    console.log(res);
    console.log(newYarn);
  };

  //form for new yarn addition
  if (showAdd) {
    return (
      <View style={styles.addForm}>
        <Yarn yarn_name={newYarn.yarn_name} weight={newYarn.weight} yardage={newYarn.yardage} color={newYarn.color} onChange={handleYarnChange} />
        <View style={styles.buttons}>
          <Text onPress={handleAddYarn}>Add Yarn</Text>
          <Text onPress={showForm}>Go Back</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.yarnContainer}>
      <Text onPress={showForm} style={styles.addYarnBtn}>Add Yarn</Text>
      {yarns.map((yarn) => <CardWithModal yarn={yarn} />)}
    </View>
  );
}

// Problem
// We can have more than 1 yarn which creates more than 1 modal. However
// we have only a single modal reference so when we open a specific modal
// React won't know which one to open since there's one reference for all
// modals.

// Solution:
// Break out card with modal into its own component which handles it's own
// visible logic and reference. This way each card with modal has their own
// reference.

const CardWithModal = (props) => {
  const {
    yarn
  } = props;

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

  const handleDelete = async (yarn_id: any) => {
    let params = { data: { yarn_id } };
    let res = await axios.delete(`http://192.168.1.150:3001/yarn/`, {
      params
    });
    console.log(res);
  };

  return (
    <Card key={yarn.id} >
      <Text style={styles.yarnList}  onPress={toggleModal}>
        {yarn.name}
      </Text>
      <Text>{yarn.color}</Text>
      {/* modal pop up */}
      <Modal
        ref={modalRef}
        visible={isModalVisible}
        key={yarn.id}
      >
        <View style={styles.modalInfo}>
          <Text>{yarn.name}</Text>
          <Text>{yarn.color}</Text>
          <Text onPress={hideModal}>Close</Text>
          <Ionicons name="trash-outline" onPress={() => handleDelete(yarn.id)} />
        </View>
      </Modal>
    </Card>
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
  addForm: {
    backgroundColor: '#F9DBBD',
    color: '#450920',
    minHeight: '100%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  yarnList: {
    color: '#450920',
    fontSize: 20,
  },
  modalInfo: {
    minHeight: '100%',
    backgroundColor: '#F9DBBD',
    color: '#450920',
  },
})

export default YarnTab;
