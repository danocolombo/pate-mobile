import { API, graphqlOperation } from 'aws-amplify';
import { printObject } from '../utils/helpers';
import * as mutations from '../pateGraphQL/mutations';
export const updateGQLResidence = async (residenceInfo) => {
    if (!residenceInfo) {
        return {
            status: 400,
            data: 'updateGQLResidence: residenceInfo is required',
        };
    }
    if (!residenceInfo.id) {
        return {
            status: 400,
            data: 'updateGQLResidence: id is required to update record',
        };
    }

    let DANO = false;
    if (DANO) {
        printObject('residenceInfo:\n', residenceInfo);
        return {
            status: 200,
            data: residenceInfo,
        };
    }

    try {
        let returnValue = {};
        const updateUserResidenceResults = await API.graphql({
            query: mutations.updateResidence,
            variables: { input: residenceInfo },
        });
        if (updateUserResidenceResults?.data?.updateResidence?.id) {
            //==========================================
            // update REDUX
            //==========================================
            return {
                status: 200,
                data: updateUserResidenceResults?.data?.updateResidence,
            };
        } else {
            return {
                status: 404,
                data: updateUserResidenceResults,
            };
        }
    } catch (error) {
        return { status: 400, data: error, line: 28 };
    }
};
export const createGQLResidence = async (residenceInfo, userId) => {
    if (!residenceInfo) {
        return {
            status: 400,
            data: 'createGQLResidence: residenceInfo is required',
        };
    }

    try {
        let returnValue = {};
        const createUserResidenceResults = await API.graphql({
            query: mutations.createResidence,
            variables: { input: residenceInfo },
        });
        if (createUserResidenceResults?.data?.createResidence?.id) {
            console.log('777777777777777777777777777777777777777777777');
            printObject(
                'createUserResidenceResults:\n',
                createUserResidenceResults
            );
            console.log('777777777777777777777777777777777777777777777');

            // need to add the residence.id to the User table
            const userResidenceUpdate = {
                id: userId,
                residenceResidentsId:
                    createUserResidenceResults.data.createResidence.id,
            };

            const updateUserResidenceResults = await API.graphql({
                query: mutations.updateUser,
                variables: { input: userResidenceUpdate },
            });
            if (updateUserResidenceResults?.data?.updateUser?.id) {
                console.log('888888888888888888888888888888888888888888888');
                printObject(
                    'updateUserResidenceResults:\n',
                    updateUserResidenceResults
                );
                console.log('888888888888888888888888888888888888888888888');
                // update REDUX for the user
                //==========================================
                // update REDUX
                //==========================================
                return {
                    status: 200,
                    data: createUserResidenceResults?.data?.createResidence,
                };
            } else {
                //  Residence was added, but we failed to update User with residence id
                return {
                    status: 400,
                    message:
                        'Residence created, but could not update user with residence id',
                    data: {
                        createUserResidenceResults: createUserResidenceResults,
                        updateUserResidenceResults: updateUserResidenceResults,
                    },
                };
            }
        } else {
            return {
                status: 404,
                data: createUserResidenceResults,
            };
        }
    } catch (error) {
        return { status: 400, data: error, line: 28 };
    }
};
