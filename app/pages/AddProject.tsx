import { StyleSheet, Text, View, TextInput } from 'react-native';
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
        let res = await axios.post('http://localhost:3001/project', {
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
        <View>
            <Text style={styles.title}>What are you working on?</Text>
            <View>
              <Text>Name:</Text>
              <TextInput
                  value={project.name}
                  onChange={handleProjectChange}
              />
              <Gauge gauge={project.gauge} onChange={handleProjectChange} />
              <Tool needle_size={project.needle_size} onChange={handleProjectChange}/>
              <Yarn yarn_name={yarn.yarn_name} weight={yarn.weight} yardage={yarn.yardage} color={yarn.color} onChange={handleYarnChange} />
              <Text style={styles.submitBtn} onPress={handleAddProject}>Add Project</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
  },
  submitBtn: {
    alignSelf: 'center',
    height: 20,
    width: 80,
    borderRadius: 8,
    shadowColor: '#52006A',
    shadowRadius: 5,
    shadowOpacity: .9,
    shadowOffset: {width: -2, height: 4},
  },
});

export default AddProject;
