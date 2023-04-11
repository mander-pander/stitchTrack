import { StyleSheet, Text, View, Modal } from 'react-native';
import React from "react";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';

const Home = () => {
    const [projects, setProjects] = useState<any[]>([]);
    console.log(projects)

    useEffect(() => {
      async function getProjects() {
        try {
          let response = await axios.get(`http://192.168.1.150:3001/project`);
          if (response.data) {
            setProjects(response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }

      getProjects();
      }, [])

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

      return (
        <View style={styles.container}>
          {projects.map((project) => (
            <View key={project.id}>
              <Text style={styles.projectList} onPress={toggleModal}>
              <Ionicons name="flower-outline"/> {project.name}
              </Text>
              <Modal
                ref={modalRef}
                visible={isModalVisible}
              >
                <Text>{JSON.stringify(project.name)}</Text>
                <Text onPress={hideModal}>Close</Text>
              </Modal>
            </View>
          ))}
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9DBBD',
    minHeight: '100%',
  },
  projectList: {
    fontSize: 20,
    color: '#450920',
  }
});

export default Home;
