import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from "react";
// import Date from '../Components/Date';
import Gauge from '../Components/Gauge';
import Tool from '../Components/Tool';
import Yarn from '../Components/Yarn';
import axios from 'axios';


const AddProject = () => {
    const [project, setProject] = useState({
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

    const handleAddProject = async (e: any) => {
        e.preventDefault();
        let res = await axios.post('http://10.113.6.118:3001/project', {
          project, yarn
        })
        console.log(res);
        console.log(project)
        console.log("yarn info")
      }

      const handleProjectChange = (e: any) => {
        e.preventDefault();
        setProject({
          ...project,
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What are you working on?</Text>
            <View>
              <Text style={styles.label}>Project Name:</Text>
              <TextInput
                  style={styles.input}
                  value={project.name}
                  onChange={handleProjectChange}
              />
              <Gauge gauge={project.gauge} onChange={handleProjectChange} />
              <Tool needle_size={project.needle_size} onChange={handleProjectChange}/>
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
    backgroundColor: "#F9DBBD",
    minHeight: "100%",
    color: "#450920",
  },
  title: {
    alignSelf: "center",
    color: "#450920",
    fontWeight: "bold",
    fontSize: 19
  },
  label: {
    color: "#450920",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
},
  submitBtn: {
    alignSelf: "center",
  },
});

export default AddProject;
