import * as Yup from 'yup';

const HOSTNAME = "http://3.7.48.196:8085";
const API_HOSTNAME = `${HOSTNAME}/web`;
const APPCONSTANTS = {
    SCHEMAS: {
        LOGIN: Yup.object({
            email: Yup.string()
                .max(15, 'Less than 15 characters')
                .required('Required'),
            password: Yup.string()
                .required('Required'),
        })
    },
    APIS: {
        LOGIN: `${API_HOSTNAME}/login`
    },
    MESSAGES: {
        SUCCESS: {
            
        },
        INFO: {

        },
        ERROR: {

        }
    }
}

export default APPCONSTANTS;