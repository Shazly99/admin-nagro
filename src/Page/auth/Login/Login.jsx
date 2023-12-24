import { LocalizationContext } from 'context/LangChange';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Img from 'constants/Img';
import * as Yup from 'yup';

import { handelLogin } from '../Services/AuthService';
import { validateLoginForm } from '../Services/Validation';
import "./login.scss";

const Login = () => {
    const toast = useRef(null);
    const [loademail, setLoadEmail] = useState(false);
    const [handelOpenPassword, setHandelOpenPassword] = useState('password');
    let navigate = useNavigate();
    let { isLang } = useContext(LocalizationContext);
    let validation = Yup.object({
        email: Yup.string().required(isLang === "en" ? 'Email is required' : 'البريد الالكتروني مطلوب').email(isLang === "en" ? 'Email is invalied' : "البريد الإلكتروني غير صالح"),
        password: Yup.string().required(isLang==="en"?'Password is required':'كلمة المرور مطلوبة')/* .matches(/^[A-Z][a-z0-9]{0,10}$/,'password must start with uppercase ...') */,
    })
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validation,
        onSubmit: (values) => handelLogin(values, setLoadEmail, navigate).then((data) => {
            const { severity, summary, detail } = data;
            toast.current.show({ severity, summary, detail, life: 3000 });
        })
    });

    return (
        <>
            <Toast ref={toast} position={isLang === "en" ? 'top-right' : 'top-left'} />
            <div className="app__login    flex justify-content-center align-items-center">
                <div className="app__login-left bg__login shadow">
                    <img loading="lazy" src={Img.loginBg} width={'30px'} height={'20px'} className='bg__login-icons' alt="Login page background" />
                    <div className="login__form_inputs">
                        <form onSubmit={formik.handleSubmit} className='login__form'>
                            <div className="input_form" dir={isLang === "en" ? 'ltr' : 'rtl'}>
                                <label htmlFor="email" >{isLang === "en" ? 'Email' : 'البريد الإلكتروني'}</label>
                                <InputText
                                    id="email"
                                    name="email"
                                    type="email"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    placeholder={isLang === "en" ? 'enter your email' : 'ادخل   بريدك الإلكتروني'}

                                    className={`  custom-input`} // Add the custom-input class here
                                    dir='ltr'
                                />
                                {formik.errors.email && formik.touched.email ?
                                    <Message severity="error" text={formik.errors.email} /> : null
                                }

                            </div>
                            <div className="input_form" dir={isLang === "en" ? 'ltr' : 'rtl'}>
                                <label htmlFor="password">{isLang === "en" ? 'Password' : 'كلمة المرور'}</label>
                                <div className="password_open">
                                    <InputText
                                        id="password"
                                        name="password"
                                        type={handelOpenPassword}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        placeholder={isLang === "en" ? 'enter your password' : 'ادخل رقمك السري'}
                                        className='w-full'
                                        dir='ltr'

                                    />
                                    {
                                        handelOpenPassword === "password" ?
                                            <i className="pi pi-eye-slash app__login-btn-icons" onClick={() => setHandelOpenPassword('text')}  ></i> :
                                            <i className="pi pi-eye app__login-btn-icons" onClick={() => setHandelOpenPassword('password')}  ></i>

                                    }
                                </div>


                                {formik.errors.password && formik.touched ?
                                    <Message severity="error" text={formik.errors.password} /> : null
                                }
                            </div>
                            <div className='w-100 d-flex align-items-center justify-content-center'>
                                <Button disabled={!(formik.isValid && formik.dirty)} className={`${!(formik.isValid && formik.dirty) ? 'app__login-btn opisity' : 'app__login-btn opisity1'} mt-3`} type='submit'>
                                    {loademail ? (
                                        <i className="pi pi-spin pi-spinner text-white"  ></i>
                                    ) : (
                                        <i className="pi pi-arrow-right text-white"></i>
                                    )}

                                </Button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
