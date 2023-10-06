import React, {FC, ReactElement, useState} from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';

const UserLogin: FC<{}> = ({}): ReactElement => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
      <View>
        <View>
          <TextInput
            value={username}
            placeholder={'Username'}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
          />
          <TextInput
            value={password}
            placeholder={'Password'}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => {}}>
            <View>
              <Text>{'Sign in'}</Text>
            </View>
          </TouchableOpacity>
        </View>

    </View>
)}

export default UserLogin;
