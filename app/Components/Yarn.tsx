import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Yarn = ({yarn_name, weight, yardage, color, onChange }: any) => {
    return (
        <View>
            <Text>Yarn Info: </Text>
            <Text>Name:</Text>
            <TextInput
                value={yarn_name}
                onChange={onChange}
            />
            <Text>Weight:</Text>
            <TextInput
                keyboardType='numeric'
                value={weight}
                onChange={onChange}
            />
            <Text>Yardage:</Text>
            <TextInput
                keyboardType='numeric'
                value={yardage}
                onChange={onChange}
            />
            <Text>Color:</Text>
            <TextInput
                value={color}
                onChange={onChange}
            />
        </View>
    );
}

export default Yarn;
