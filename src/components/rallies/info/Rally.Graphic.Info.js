import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Collapsible from 'react-native-collapsible';
import { Storage } from 'aws-amplify';
import { S3Image } from 'aws-amplify';

// import { S3Image } from 'aws-amplify-react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../../../constants/colors';
import { printObject } from '../../../utils/helpers';
const RallyGraphicInfo = ({ rally }) => {
    const [collapsed, setCollapsed] = useState(true); //col
    const [eventGraphic, setEventGraphic] = useState([]);

    const getGraphicFile = async () => {
        // check to see if there is a graphic file for event,
        // if not, set generic file.
        const targetFile = rally.uid + '.png';
        console.log('targetFile:', targetFile);
        const requestedData = '';
        await Storage.list(requestedData, { level: 'public' })
            .then((requestResponse) => {
                let graphicFile = 'no-image-available.png';
                requestResponse.forEach((s3File) => {
                    console.log('s3File.key:', s3File.key);
                    if (s3File.key === targetFile) {
                        graphicFile = s3File;
                        printObject('RGI:25-->s3File', s3File);
                    }
                });
                if (graphicFile !== 'no-image-available.png') {
                    // console.log('USE GENERIC');
                    // console.log('USE THIS ONE: ', graphicFile);
                    setEventGraphic(graphicFile);
                }
                printObject('RGI:32-->eventGraphic', eventGraphic);

                return;
            })
            .catch((e) => {
                printObject('RGI:39-->Storage.get CATCH e:', e);
                return e;
            });
    };
    // const uploadPrivateGraphicFile = async () => {
    //     const testFile = '../../images/no-events-card.png';
    //     //   this sample uploads the testfile to the S3 public location.
    //     try {
    //         const result = await Storage.put('PrivateImage.png', testFile, {
    //             level: 'private',
    //             // contentType: 'text/plain',
    //         });

    //         printObject('RGI:48-->result:', result);
    //         return 'TRUE';
    //     } catch (error) {
    //         printObject('RGI:51-->error:', error);
    //         return 'FALSE';
    //     }
    // };
    // const uploadPublicGraphicFile = async () => {
    //     const testFile = '../../images/no-image-available.png';
    //     //   this sample uploads the testfile to the S3 public location.
    //     try {
    //         const result = await Storage.put(
    //             'no-image-available.png',
    //             testFile
    //         );
    //         printObject('RGI:60-->result:', result);
    //         return 'TRUE';
    //     } catch (error) {
    //         printObject('RGI:63-->error:', error);
    //         return 'FALSE';
    //     }
    // };

    useEffect(() => {
        // uploadPublicGraphicFile().then((results) => {
        //     console.log('upload response: ', results);
        // });
        // getS3Files();
        // uploadPrivateGraphicFile().then((results) => {
        //     console.log('upload response: ', results);
        // });

        getGraphicFile();
        console.log('RGI:85-->eventGraphic: ', eventGraphic);
    }, []);

    const toggleExpanded = () => {
        //Toggling the state of single Collapsible
        setCollapsed(!collapsed);
    };
    const theGraphicFile = 'no-image-available.png';
    return (
        <View>
            <View style={styles.page}>
                <TouchableOpacity onPress={toggleExpanded}>
                    <View style={styles.collapsibleHeaderRow}>
                        <Text style={styles.collapsibleHeaderText}>
                            Graphics
                        </Text>
                        <View style={styles.collapsibleHeaderIcon}>
                            {collapsed ? (
                                <AntDesign
                                    name='caretright'
                                    size={18}
                                    color={Colors.gray60}
                                />
                            ) : (
                                <AntDesign
                                    name='caretdown'
                                    size={18}
                                    color={Colors.gray60}
                                />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <Collapsible collapsed={collapsed} align='center'>
                <View style={styles.graphicsContainer}>
                    <Text>GraphicFile: {eventGraphic}</Text>
                    <View>
                        {/* <S3Image imgKey={'/public/' + eventGraphic} /> */}

                        {/* <AmplifyS3Image
                            style={{ '--width': '100%' }}
                            imgKey={theGraphicFile}
                        /> */}
                        <S3Image imgKey='no-image-available.png' />
                    </View>
                    {/* <View style={{ width: '400' }}>
                        <S3Image imgKey={eventGraphic} />
                    </View> */}
                </View>
            </Collapsible>
        </View>
    );
};

export default RallyGraphicInfo;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        marginHorizontal: 20,
    },
    collapsibleHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: Colors.secondary,
        borderWidth: 1,
        borderColor: 'grey',
        paddingVertical: 2,
        alignItems: 'center',
    },
    collapsibleHeaderText: {
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    graphicsContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 20,
    },
});
