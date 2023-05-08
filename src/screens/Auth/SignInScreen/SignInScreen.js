import {
    View,
    Image,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    Alert,
} from 'react-native';
import axios from 'axios';
import React, { useState } from 'react';
import Logo from '../../../../assets/images/FEO-words.png';
import CustomInput from '../../../components/ui/CustomInput';
import CustomButton from '../../../components/ui/Auth/CustomButton/CustomButton';
import SocialSignInButtons from '../../../components/ui/Auth/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../pateGraphQL/queries';
import * as mutations from '../../../pateGraphQL/mutations';
import { useDispatch } from 'react-redux';
// import { ALL_EVENTS } from '../../../../data/getRegionalEvents';
import { updateCurrentUser } from '../../../features/users/usersSlice';
import {
    initializeDivision,
    getDivisionInfo,
    loadDivisionInfo,
} from '../../../features/division/divisionSlice';

import {
    updateAppName,
    setRegion,
    setEventRegion,
    updateAffiliate,
    updateAffiliateTitle,
    updateStateProv,
    updateAffiliationString,
    updateUserRole,
} from '../../../features/system/systemSlice';
import { getToday, printObject } from '../../../utils/helpers';
import { REGION } from '../../../constants/regions';
import { getPateDate } from '../../../utils/date';

const SignInScreen = () => {
    const [loading, setLoading] = useState(false);
    const { height } = useWindowDimensions();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    console.log('Errors', errors);
    // need this to pass the username on to forgot password
    const user = watch('username');
    const onSignInPressed = async (data) => {
        const { username, password } = data;
        let alertPayload = {};
        // this loading feature prevents user from sending another request before the first one returns
        if (loading) {
            return;
        }
        setLoading(true);
        // authenticate with AWS cognito
        let setAlert = {};
        await Auth.signIn(username, password)
            .then((user) => {
                // printObject('SIS:73-->Auth.signIn response:\n', user);
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                    Auth.completeNewPassword(
                        username, // the Cognito User Object
                        password,
                        []
                    )
                        .then((user) => {
                            // at this time the user is logged in if no MFA required
                            printObject('SIS:75-->user:\n', user);
                        })
                        .catch((e) => {
                            const alertPayload = {
                                msg: 'Authentication failed. Please check your credentials',
                                alertType: 'danger',
                            };
                            setAlert(alertPayload);
                            console.log(' need to return');
                            // return;
                        });
                } else {
                    // console.log('the user is good...');
                }
            })
            .catch((e) => {
                switch (e.code) {
                    case 'UserNotFoundException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    case 'PasswordResetRequiredException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    case 'NotAuthorizedException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    default:
                        alertPayload = {
                            msg: 'Signin error: [' + e.message + ']',
                            alertType: 'danger',
                        };
                        break;
                }
            });
        // if we have error loaded, let's return
        if (alertPayload.msg) {
            Alert.alert(alertPayload.msg);
            alertPayload = {};
            setLoading(false);
            return;
        }
        let currentUserInfo = {};
        let currentSession = {};
        let graphQLProfile = {};
        await Auth.currentUserInfo().then((u) => {
            currentUserInfo = u;
        });
        await Auth.currentSession().then((data) => {
            currentSession = data;
        });
        //save JWT token to currentUser
        dispatch(
            updateCurrentUser({ jwtToken: currentSession?.idToken?.jwtToken })
        );
        graphQLProfile = {
            ...graphQLProfile,
            authUserInfo: currentUserInfo,
            role: 'unknown',
            status: 'unknown',
        };

        //  ***********************************************
        //      FUNCTION: GET PROFILE BY SUB
        //  ***********************************************
        const getUserBySub = async (sub) => {
            console.log('sub: ', sub);
            const variables = {
                id: sub,
            };
            const getProfileResponse = await API.graphql(
                graphqlOperation(queries.getProfileBySub, variables)
            );
            // printObject(
            //     'SIS:165-->getProfileResponse.data.listUsers.items[0]:\n',
            //     getProfileResponse.data.listUsers.items[0]
            // );
            if (getProfileResponse?.data?.listUsers?.items[0]) {
                return getProfileResponse.data.listUsers.items[0];
            } else {
                return null;
            }
        };

        //  ***********************************************
        //      FUNCTION: CREATE NEW GQL USER
        // at this point the person has authenticated and
        // no profile is in gql database. enter one.
        //  ***********************************************
        const createNewUser = async () => {
            const newProfile = {
                sub: currentUserInfo?.attributes?.sub,
                username: currentUserInfo?.username,
                firstName: '',
                lastName: '',
                email: currentUserInfo?.attributes?.email,
                phone: '',
                divisionDefaultUsersId: '271a8cbb-15b4-4f90-ba9f-a5d348206493',
            };
            try {
                const createUserResponse = await API.graphql({
                    query: mutations.createUser,
                    variables: { input: newProfile },
                });
                if (createUserResponse.data.createUser.id) {
                    return createUserResponse.data.createUser;
                } else {
                    return null;
                }
            } catch (error) {
                return error;
            }
        };
        //  ***********************************************
        //   FUNCTION: CREATE NEW GQL AFFILIATION
        //  ***********************************************
        const createNewAffiliation = async (userId) => {
            const newAff = {
                role: 'guest',
                status: 'active',
                divisionAffiliationsId: '271a8cbb-15b4-4f90-ba9f-a5d348206493',
                userAffiliationsId: userId,
            };
            try {
                const createAffResponse = await API.graphql({
                    query: mutations.createAffiliation,
                    variables: { input: newAff },
                });
                if (createAffResponse.data.createAffiliation.id) {
                    return createAffResponse.data.createAffiliation;
                } else {
                    return null;
                }
            } catch (error) {
                return error;
            }
        };
        //  ***********************************************
        //      EXECUTE EXECUTE EXECUTE EXECUTE EXECUTE
        //      EXECUTE EXECUTE EXECUTE EXECUTE EXECUTE
        //  ***********************************************
        await getUserBySub(currentSession.idToken.payload.sub)
            .then((subResponse) => {
                // We got a profile response
                // printObject(
                //     'SIS:234-->back from getUSserBySub:\n',
                //     subResponse
                // );
                if (!subResponse) {
                    // no profile need to create....
                    // printObject('SIS:240-->subResponse:\n', subResponse);
                    return createNewUser().then(
                        async (newUser) =>
                            await createNewAffiliation(newUser.id).then(
                                (newAffiliation) => {
                                    console.log('newUser:', newUser);
                                    console.log(
                                        'newAffiliation:',
                                        newAffiliation
                                    );
                                    //make array for affiliation
                                    let affiliationArray = [];
                                    let theAffiliation = {
                                        id: newAffiliation.id,
                                        status: newAffiliation.status,
                                        role: newAffiliation.role,
                                        division: {
                                            id: newAffiliation.division.id,
                                            code: newAffiliation.division.code,
                                            organization: {
                                                id: newAffiliation.division
                                                    .organization.id,
                                                appName:
                                                    newAffiliation.division
                                                        .organization.appName ||
                                                    '',
                                                available:
                                                    newAffiliation.division
                                                        .organization
                                                        .available || false,
                                                category:
                                                    newAffiliation.division
                                                        .organization
                                                        .category || '',
                                                description:
                                                    newAffiliation.division
                                                        .organization
                                                        .description || '',
                                                exposure:
                                                    newAffiliation.division
                                                        .organization
                                                        .exposure || '',
                                                label:
                                                    newAffiliation.division
                                                        .organization.label ||
                                                    '',
                                                name:
                                                    newAffiliation.division
                                                        .organization.name ||
                                                    '',
                                                value:
                                                    newAffiliation.division
                                                        .organization.value ||
                                                    '',
                                                code:
                                                    newAffiliation.division
                                                        .organization.code ||
                                                    '',
                                                title:
                                                    newAffiliation.division
                                                        .organization.title ||
                                                    '',
                                            },
                                        },
                                    };
                                    affiliationArray.push(theAffiliation);
                                    // create items container for the array...
                                    const theAffiliations = {
                                        items: affiliationArray,
                                    };
                                    const newProfile = {
                                        ...newUser,
                                        affiliations: theAffiliations,
                                    };

                                    return newProfile;
                                }
                            )
                    );
                } else {
                    // printObject('SIS:240-->subResponse:\n', subResponse);
                    // the user was found by sub
                    return subResponse;
                }
            })
            .then((result) => {
                graphQLProfile = {
                    ...graphQLProfile,
                    ...result,
                };
                // printObject('SIS:254-->graphQLProfile:\n', graphQLProfile);
            })
            .catch((error) => {
                console.error(error);
            });

        // console.log('SIS:259-->now DEFINING ROLE & STATUS');
        // printObject('graphQLProfile:\n', graphQLProfile);
        //  ***********************************************
        //      DEFINE THE ROLE & STATUS
        //  ***********************************************

        if (graphQLProfile?.affiliations?.items.length > 0) {
            // we have affiliations
            //check if we have defaultDivision defined
            if (graphQLProfile?.defaultDivision?.id) {
                // we have defaultDivision and Affiliations, get role
                graphQLProfile.affiliations.items.forEach((aff, index) => {
                    if (
                        aff?.division?.id ===
                            graphQLProfile?.defaultDivision?.id &&
                        aff?.division?.organization?.id ===
                            graphQLProfile?.defaultDivision?.organization?.id
                    ) {
                        graphQLProfile.role = aff?.role;
                        graphQLProfile.status = aff?.status;
                        graphQLProfile.affiliations.active = {
                            affiliationId: aff.id,
                            status: aff.status,
                            role: aff.role,
                            divisionId: aff.division.id,
                            divisionCode: aff.division.code,
                            organizationId: aff.division.organization.id,
                            organizationId: aff.division.organization.id,
                            organizationAppName:
                                aff.division.organization.appName,
                            organizationAvailable:
                                aff.division.organization.available,
                            organizationCategory:
                                aff.division.organization.category,
                            organizationDescription:
                                aff.division.organization.description,
                            organizationExposure:
                                aff.division.organization.exposure,
                            organizationLabel: aff.division.organization.label,
                            organizationName: aff.division.organization.name,
                            organizationValue: aff.division.organization.value,
                            organizationCode: aff.division.organization.code,
                            organizationTitle: aff.division.organization.title,

                            label: aff.division?.organization?.title,
                            region: aff.division?.code,
                            role: aff?.role,
                            value: aff?.division?.organization?.code,
                        };
                    }
                });
            }
        }

        dispatch(updateCurrentUser(graphQLProfile));
        //  ******************************************
        //      get the divisionEvents
        //  ******************************************
        const variables = {
            divId: graphQLProfile?.affiliations?.active?.divisionId,
        };
        if (variables.divId) {
            const getDivisionalEvents = async () => {
                //  ******************************************
                //      get the divisionEvents
                //  ******************************************

                try {
                    await API.graphql(
                        graphqlOperation(
                            queries.getAllDivisionEvents,
                            variables
                        )
                    )
                        .then((divEventsResponse) => {
                            //  *************************************
                            //      got graphQL divEvents response
                            //  *************************************

                            if (divEventsResponse?.data?.getDivision?.id) {
                                dispatch(
                                    initializeDivision(
                                        divEventsResponse.data.getDivision
                                    )
                                );
                            }
                        })
                        .catch((error) => {
                            printObject(
                                'SIS:284--> divEventRequest error:\n',
                                error
                            );
                        });
                } catch (error) {
                    printObject(
                        'SIS:287--> divEventRequest try/catch error:\n',
                        error
                    );
                }
            };
            getDivisionalEvents();
        }
        dispatch(
            updateAffiliationString(graphQLProfile?.affiliations?.active?.value)
        );

        setLoading(false);
        return;
    };
    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };
    const forgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword', { user });
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                {/* <Image
                    source={Logo}
                    // styles={[styles.logo, { height: height * 0.1 }]}
                    // resizeMode='stretch'
                /> */}
                <Image style={styles.tinyLogo} source={Logo} />
                <CustomInput
                    name='username'
                    rules={{
                        required: 'Username is required',
                        minLength: {
                            value: 4,
                            message: 'Username minimum length is 4',
                        },
                    }}
                    placeholder='Username'
                    control={control}
                />
                <CustomInput
                    name='password'
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 3,
                            message: 'Password length too short',
                        },
                    }}
                    placeholder='Password'
                    control={control}
                    secureTextEntry
                />

                <CustomButton
                    text={loading ? 'Loading...' : 'Sign In'}
                    onPress={handleSubmit(onSignInPressed)}
                />
                <CustomButton
                    text='Forgot Password'
                    onPress={forgotPasswordPressed}
                    type='TERTIARY'
                />
                {/* <SocialSignInButtons /> */}
                <CustomButton
                    text="Don't have an account? Create one"
                    onPress={onSignUpPressed}
                    type='TERTIARY'
                />
            </View>
        </ScrollView>
    );
};

export default SignInScreen;
const styles = StyleSheet.create({
    root: {
        // flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40,
        // width: '100%',
        marginHorizontal: 20,
    },
    logo: {
        width: '40%',
        maxheight: 150,
        maxWidth: 150,
    },
    tinyLogo: {
        width: 225,
        height: 225,
    },
});
