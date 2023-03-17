import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [projects, setProjects] = useState<any[]>([]);
    console.log(projects)

    useEffect(() => {
        axios.get(`http://192.168.1.150:3001/project`)
          .then((result: any) => {
            setProjects(result.data);
          },
            (error) => {
              console.log(error);
            })
      }, [])

    return (
        <View>
            <Text>{JSON.stringify(projects[0])}</Text>
        </View>
    )
}

export default Home;
