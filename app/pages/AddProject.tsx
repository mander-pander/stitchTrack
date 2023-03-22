import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from "react";
// import Date from '../Components/Date';
import Gauge from '../Components/Gauge';

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

    return (
        <View>
            <Text>Add new project</Text>
            <Gauge />
        </View>
    )
}

export default AddProject;
