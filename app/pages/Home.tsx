import { StyleSheet, Text, View, Modal, Button } from 'react-native';
import React from "react";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card } from '@rneui/themed';

const Home = () => {
    const [projects, setProjects] = useState<any[]>([]);
    console.log(projects)

    useEffect(() => {
      async function getProjects() {
        try {
          let response = await axios.get(`http://10.113.6.118:3001/project`);
          if (response.data) {
            setProjects(response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
      getProjects();
      }, []);

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
            <Card key={project.id}>
              <Text style={styles.projectList} onPress={toggleModal}>
                {project.name}
              </Text>
              <Modal
                ref={modalRef}
                visible={isModalVisible}
              >

                <View style={styles.modalInfo}>
                <Text>
                  Project Name: {project.name}
                </Text>
                <Text>
                  Needle Size: {project.needle_size}
                </Text>
                <Text>
                  Gauge: {project.gauge}
                </Text>
                <Text>
                  Notes: {project.notes}
                </Text>
                  <View style={styles.buttons}>
                    <Button color="#450920" title="Go back to projects" onPress={hideModal} />
                    <Button color="#450920" title="Edit project details" />
                  </View>
                </View>
              </Modal>
            </Card>
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
  },
  modalInfo: {
    minHeight: '100%',
    backgroundColor: '#F9DBBD',
    color: '#450920',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

export default Home;
