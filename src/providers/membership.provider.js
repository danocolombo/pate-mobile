import axios from 'axios';
import { API, graphqlOperation } from 'aws-amplify';
import { printObject } from '../utils/helpers';
import * as mutations from '../pateGraphQL/mutations';

export const updateGQLMembership = async (membershipInfo) => {
    if (!membershipInfo) {
        return {
            status: 400,
            data: 'updateGQLMembership: membershipInfo is required',
        };
    }
    if (!membershipInfo.id) {
        return {
            status: 400,
            data: 'updateGQLMembership: id is required to update record',
        };
    }

    try {
        let returnValue = {};
        const updateMembershipResults = await API.graphql({
            query: mutations.updateMembership,
            variables: { input: membershipInfo },
        });
        if (updateMembershipResults?.data?.updateMembership?.id) {
            //==========================================
            // update REDUX
            //==========================================
            return {
                status: 200,
                data: updateMembershipResults?.data?.updateMembership,
            };
        } else {
            return {
                status: 404,
                data: updateMembershipResults,
            };
        }
    } catch (error) {
        return { status: 400, data: error, line: 28 };
    }
};
export const createGQLMembership = async (membershipInfo) => {
    if (!membershipInfo) {
        return {
            status: 400,
            data: 'updateGQLMembership: membershipInfo is required',
        };
    }

    let DANO = false;
    if (DANO) {
        printObject(
            'U:26-(PROVIDER)createGQLMembership::membershipInfo:\n',
            membershipInfo
        );
        return {
            status: 200,
            data: membershipInfo,
        };
    }
    printObject('MP:72-->membershipInfo:\n', membershipInfo);
    try {
        let returnValue = {};
        const createMembershipResults = await API.graphql({
            query: mutations.createMembership,
            variables: { input: membershipInfo },
        });
        if (createMembershipResults?.data?.createMembership?.id) {
            //==========================================
            // update REDUX
            //==========================================
            return {
                status: 200,
                data: createMembershipResults?.data?.createMembership,
            };
        } else {
            return {
                status: 404,
                data: createMembershipResults,
            };
        }
    } catch (error) {
        return { status: 400, data: error, line: 28 };
    }
};
