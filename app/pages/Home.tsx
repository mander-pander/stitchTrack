import { StyleSheet, Text, View, Modal, Button, TextInput, Image } from 'react-native';
import React from "react";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card } from '@rneui/themed';

const Home = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    async function getProjects() {
      try {
        let response = await axios.get(`http://192.168.1.150:3001/project`);
        if (response.data) {
          setProjects(response.data);
        }
      } catch (err) {
        setProjects([null]);
      }
    }
    getProjects();
  }, []);

  return (
    <View style={styles.container}>
      {projects.map((project) => <CardWithModal project={project} />)}
    </View>
  );
};

const CardWithModal = (props) => {
  const {
    project
  } = props;

  const modalRef = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editProject, setEditProject] = useState(null);

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

  const toggleEdit = () => {
    setEditProject(true);
  }

  if (editProject) {
    return (
      <Modal
        ref={modalRef}>
          <Text>{project.name}</Text>
      </Modal>
    )
  }


  return (
    <Card key={project.id}>
      <Text style={styles.projectList} onPress={toggleModal}>
        {project.name}
      </Text>
      {/* modal pop up */}
      <Modal
        ref={modalRef}
        visible={isModalVisible}
        key={project.id}
      >
        <View style={styles.modalInfo}>
          <Image
            style={{width: '100%', height: '50%'}}
            source={{uri:'https://images.unsplash.com/photo-1544967919-44c1ef2f9e7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2750&q=80'}}
          />
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
            <Button color="#450920" title="Edit project details" onPress={toggleEdit}/>
          </View>
        </View>
      </Modal>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#463F3A',
    minHeight: '100%',
  },
  projectList: {
    fontSize: 20,
    color: '#463F3A',
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
