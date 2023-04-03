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
            <Text>Add new project</Text>
            <Gauge />
            <Tool />
            <Yarn />
            <Text onPress={handleAddProject}>Add Project</Text>
        </View>
    )
}

export default AddProject;
