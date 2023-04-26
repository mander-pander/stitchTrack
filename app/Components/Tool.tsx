import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Tool = ({ needle_size, onChange}: any) => {

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Needle Size: </Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={needle_size}
                    onChange={onChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
    },
    label: {
        color: "#450920",
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
});

export default Tool;
