import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import axios from 'axios';

const YarnTab: React.FC = () => {
  const [showEdit, setShowEdit] = useState(false);
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

    const showForm = () => {
      setShowEdit(true);
    }

    return (
        <View>
          {!showEdit &&
            <>
              <Text onPress={showForm}>Add Yarn</Text>
              {yarns.map((yarn) => <Text>{JSON.stringify(yarn.name)}</Text>)}
            </>
          }
          {showEdit &&
            <>
              <Text>add or edit here</Text>
            </>
          }
        </View>
    );
}

export default YarnTab;
