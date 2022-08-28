import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { printObject } from '../../utils/helpers';
import UserCard from './UserCard';
import { useNavigation } from '@react-navigation/native';
import { Surface } from 'react-native-paper';

const UsersList = (props) => {
    const navigation = useNavigation();
    const profiles = props.data;
    const listTitle = props.title;
    const cStyles = props.customStyle;
    // printObject('UL09--> cStyles', cStyles);
    const handleUserRequest = (profile) => {};
    return (
        <>
            <Surface style={[styles.surface, cStyles]}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.titleText}>{listTitle}</Text>
                </View>
                <View style={styles.listContainer}>
                    {!!profiles
                        ? profiles.map((p) => {
                              return (
                                  <View
                                      key={p.uid}
                                      style={{
                                          width: '100%',
                                          marginLeft: '20%',
                                      }}
                                  >
                                      <TouchableOpacity
                                          key={p.uid}
                                          onPress={() =>
                                              navigation.navigate(
                                                  'UserProfile',
                                                  {
                                                      profile: p,
                                                  }
                                              )
                                          }
                                          style={({ pressed }) =>
                                              pressed && styles.pressed
                                          }
                                      >
                                          <UserCard user={p} key={p.uid} />
                                      </TouchableOpacity>
                                  </View>
                              );
                          })
                        : null}
                </View>
            </Surface>
        </>
    );
};

export default UsersList;

const styles = StyleSheet.create({
    surface: {
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    titleWrapper: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    titleText: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
    },
    listContainer: {
        alignItems: 'center',
        // marginTop: 10,
    },
    pressed: {
        opacity: 0.7,
    },
});
