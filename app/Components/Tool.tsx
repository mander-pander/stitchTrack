import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Tool = ({ needle_size, onChange}: any) => {

    return (
        <View>
            <Text>Needle Size: </Text>
                <TextInput
                    keyboardType='numeric'
                    value={needle_size}
                    onChange={onChange}
            />
        </View>
    )

}

export default Tool;
