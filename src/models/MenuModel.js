import GOBALS from '../GOBALS';
export default class MenuModel {

    constructor() {
    }
    async getMenuBy(data) {
        return fetch(GOBALS.URL + '/menu/getMenuBy', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {

                return responseJson;
            }).catch((error) => {
                return {
                    data: [],
                    error: error,
                    query_result: false,
                    server_result: false
                };
            });
    }
    async getMenuByCode(data) {
        return fetch(GOBALS.URL + '/menu/getMenuByCode', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ menu_type_code: data })
        }).then((response) => response.json())
            .then((responseJson) => {

                return responseJson;
            }).catch((error) => {
                return {
                    data: [],
                    error: error,
                    query_result: false,
                    server_result: false
                };
            });
    }
    // async getMenuMaxCode(data) {
    //     return fetch(GOBALS.URL + '/menu/getMenuMaxCode', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).then((response) => response.json())
    //         .then((responseJson) => {

    //             return responseJson;
    //         }).catch((error) => {
    //             return {
    //                 data: [],
    //                 error: error,
    //                 query_result: false,
    //                 server_result:false
    //             };
    //         });
    // }

    // async insertMenuBy(data) {
    //     return fetch(GOBALS.URL + '/menu/insertMenuBy', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).then((response) => response.json())
    //         .then((responseJson) => {

    //             return responseJson;
    //         }).catch((error) => {
    //             return {
    //                 data: [],
    //                 error: error,
    //                 query_result: false,
    //                 server_result:false
    //             };
    //         });
    // }

    // async updateMenuBy(data) {
    //     return fetch(GOBALS.URL + '/menu/updateMenuBy', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).then((response) => response.json())
    //         .then((responseJson) => {

    //             return responseJson;
    //         }).catch((error) => {
    //             return {
    //                 data: [],
    //                 error: error,
    //                 query_result: false,
    //                 server_result:false
    //             };
    //         });
    // }

    // async deleteByCode(data) {
    //     return fetch(GOBALS.URL + '/menu/deleteByCode', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({Menu_code:data})
    //     }).then((response) => response.json())
    //         .then((responseJson) => {

    //             return responseJson;
    //         }).catch((error) => {
    //             return {
    //                 data: [],
    //                 error: error,
    //                 query_result: false,
    //                 server_result:false
    //             };
    //         });
    // }

    // async getMenuByCode(data) {
    //     return fetch(GOBALS.URL + '/menu/getMenuByCode', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({Menu_code:data})
    //     }).then((response) => response.json())
    //         .then((responseJson) => {

    //             return responseJson;
    //         }).catch((error) => {
    //             return {
    //                 data: [],
    //                 error: error,
    //                 query_result: false,
    //                 server_result:false
    //             };
    //         });
    // }


}