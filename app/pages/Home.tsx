import { StyleSheet, Text, View, Modal } from 'react-native';
import React from "react";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Home = () => {
    const [projects, setProjects] = useState<any[]>([]);
    console.log(projects)

    useEffect(() => {
      async function getProjects() {
        try {
          let response = await axios.get(`http://10.7.24.27:3001/project`);
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
        <View>
          {projects.map((project) => (
            <View key={project.id}>
              <Text onPress={toggleModal}>
                {JSON.stringify(project.name)}
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

export default Home;
