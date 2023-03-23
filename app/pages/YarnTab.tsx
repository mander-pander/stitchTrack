import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

const YarnTab: React.FC = () => {
    const [yarns, setYarns] = useState<any[]>([]);
    const [yarn, setYarn] = useState({
        yarn_name: '',
        weight: 0,
        yardage: 0,
        color: '',
        project_id: 0
    });

    useEffect(() => {
        const getYarn = async() => {
          try {
            let result = await axios.get(`http://192.168.1.150:3001/yarn`)
            setYarns(result.data);
          } catch (error) {
            setYarns([null]);
          }
        }
        getYarn();
    });

    return (
        <View>
            {yarns.map((yarn) => <Text>{JSON.stringify(yarn.name)}</Text>)}
        </View>
    );
}

export default YarnTab;
