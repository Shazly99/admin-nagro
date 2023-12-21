// Validate From Fields
import * as Yup from 'yup';
 


export const validateLoginForm = (values) => {
    let validation = Yup.object({
        email: Yup.string().required('email is required').email('email is valied'),
        password: Yup.string().required('password is required')/* .matches(/^[A-Z][a-z0-9]{0,10}$/,'password must start with uppercase ...') */,
    })
    return validation;
};

export default { 
    validateLoginForm
};