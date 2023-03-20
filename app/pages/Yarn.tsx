import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

const Yarn: React.FC = () => {
    const [yarns, setYarns] = useState<any[]>([]);

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

export default Yarn;
