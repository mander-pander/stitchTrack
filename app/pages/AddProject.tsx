import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import React, { useState } from "react";
// import Date from '../Components/Date';
import Gauge from '../Components/Gauge';
import Tool from '../Components/Tool';
import Yarn from '../Components/Yarn';
import axios from 'axios';


const AddProject = () => {
    const [newProject, setNewProject] = useState({
        name: '',
        needle_size: 0,
        gauge: 0,
        user_id: 0,
        date_started: '',
        date_finished: ''
    });

    const [yarn, setYarn] = useState({
        yarn_name: '',
        weight: 0,
        yardage: 0,
        color: '',
        project_id: 0
    });

    const handleProjectChange = (e: any) => {
      e.preventDefault();
      setNewProject({
        ...newProject,
        [e.target.name]: e.target.value
      });
    }

    const handleYarnChange = (e: any) => {
      e.preventDefault();
      setYarn({
        ...yarn,
        [e.target.name]: e.target.value
      });
    };

    const handleAddProject = async (e: any) => {
        e.preventDefault();
        if (newProject.name.trim() === '') {
          Alert.alert('Error', 'Please enter a name for project');
        } else {
          let res = await axios.post('http://192.168.1.150:3001/project', {
            newProject, yarn
          })
          console.log(res);
          console.log(newProject)
          console.log("yarn info")
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>What are you working on?</Text>
            <View>
              <Text style={styles.label}>Project Name:</Text>
              <TextInput
                  style={styles.input}
                  value={newProject.name}
                  onChange={handleProjectChange}
              />
              <Gauge gauge={newProject.gauge} onChange={handleProjectChange} />
              <Tool needle_size={newProject.needle_size} onChange={handleProjectChange}/>
              <Yarn yarn_name={yarn.yarn_name} weight={yarn.weight} yardage={yarn.yardage} color={yarn.color} onChange={handleYarnChange} />
              <View style={styles.submitBtn} >
              <Button title="Add Project" onPress={handleAddProject} color="#450920" />
              </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFF",
    minHeight: "100%",
    color: "#1E2749",
    padding: '2%',
  },
  title: {
    alignSelf: "center",
    color: "#1E2749",
    fontWeight: "bold",
    fontSize: 19
  },
  label: {
    color: "#1E2749",
  },
  input: {
    padding: 10,
    borderColor: "#1E2749",
    borderBottomWidth: 1,
},
  submitBtn: {
    alignSelf: "center",
  },
});

export default AddProject;
