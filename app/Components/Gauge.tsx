import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Gauge = ({gauge, onChange}: any) => {

    return (
        <View>
            <Text>Gauge: </Text>
            <TextInput
                keyboardType='numeric'
                value={gauge}
                onChange={onChange}
            />
        </View>
    )
}

export default Gauge;
