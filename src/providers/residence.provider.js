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
