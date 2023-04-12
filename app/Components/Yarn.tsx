import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Yarn = ({yarn_name, weight, yardage, color, onChange }: any) => {
    const [length, setLength] = useState('yards');
    return (
        <View style={styles.container}>
            <Text style={styles.catTitle}>Yarn Info: </Text>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.input}
                value={yarn_name}
                onChange={onChange}
            />
            <Text style={styles.label}>Weight:</Text>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                value={weight}
                onChange={onChange}
            />
            <Text style={styles.label}>Yards or Meters Per Skein:</Text>
            <View style={styles.lengthPicker}>
                <TextInput
                    style={styles.lengthInput}
                    keyboardType='numeric'
                    value={yardage}
                    onChange={onChange}
                />
                <Picker
                    style={{width:150}}
                    selectedValue={length}
                    onValueChange={currentLength => setLength(currentLength)}>
                    <Picker.Item label="yards" value="yards" />
                    <Picker.Item label="meters" value="meters" />
                </Picker>
            </View>
            <Text style={styles.label}>Color:</Text>
            <TextInput
                style={styles.input}
                value={color}
                onChange={onChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
    },
    catTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: "#450920",
    },
    lengthPicker: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        color: "#450920",
    },
    label: {
        color: "#450920",
    },
    lengthInput: {
        width: 175,
        borderWidth: 1,
        borderRadius: 5
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
});

export default Yarn;
