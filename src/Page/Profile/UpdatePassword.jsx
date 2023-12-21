import axios from 'axios';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import * as Yup from 'yup'; // استيراد yup

const UpdatePassword = ({ isLang, visiblePassword, setVisiblePassword }) => {
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);

    const url = `${process.env.REACT_APP_API_URL}/auth/update-password`;
    const [handelOpenPasswordOld, setHandelOpenPasswordOld] = useState('password');
    const [handelOpenPasswordNew, setHandelOpenPasswordNew] = useState('password');
    const [handelOpenPasswordConfirmation, setHandelOpenPasswordConfirmation] = useState('password');

    const validationSchema = Yup.object().shape({
        old_password: Yup.string().required(isLang === "en" ? 'Old password is required' : 'كلمة المرور القديمة مطلوبة'),
        new_password: Yup.string().min(6, isLang === "en" ? 'New password must be at least 6 characters' : 'يجب أن تتكون كلمة المرور الجديدة من 6 أحرف على الأقل').required(isLang === "en" ? 'New password is required' : 'كلمة المرور الجديدة مطلوبة'),
        password_confirmation: Yup.string().oneOf([Yup.ref('new_password'), null], isLang === "en" ? 'Passwords must match' : 'يجب أن تتطابق كلمات المرور').required(isLang === "en" ? 'Password confirmation is required' : 'مطلوب تأكيد كلمة المرور'),
    });

    const formik = useFormik({
        initialValues: {
            old_password: '',
            new_password: '',
            password_confirmation: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                let { data } = await axios.post(url, values, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('tokenNagro'),
                    },
                });
                if (data?.status === 200) {
                    toast.current.show({ severity: 'success', summary: 'Success', detail: data?.message, life: 3000 });
                    setTimeout(() => {
                        setVisiblePassword(false)
                        setLoading(false);
                        resetForm();
                    }, 2000);
                } else if (data?.status === 400) {
                    toast.current.show({ severity: 'warn', summary: 'Warn', detail: data?.message, life: 3000 });
                    setLoading(false);
                    resetForm();
                }
            } catch (error) {
                console.error(error);
            }
        }
    });

    return (
        <>
            <Toast ref={toast} position={isLang === "en" ? 'top-right' : 'top-left'} />

            <Dialog header={isLang === "en" ? 'Update Password' : 'تحديث كلمه المرور'} visible={visiblePassword} className='lg:w-5 md:w-7 sm:w-11' onHide={() => setVisiblePassword(false)} dir={isLang === "en" ? 'ltr' : 'rtl'}>
                <form onSubmit={formik.handleSubmit} className='flex justify-content-center align-items-center flex-column'>

                    <div className="mt-2 w-full">
                        <label htmlFor="old_password" className="font-bold block mb-2">
                            {isLang === "en" ? 'Old password' : 'كلمة المرور القديمة'}
                        </label>
                        <div className="password_open">

                            <InputText
                                id="old_password"
                                name="old_password"
                                type={handelOpenPasswordOld}
                                value={formik.values.old_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full  p-inputtext-sm"
                                dir='ltr'

                            />
                            {
                                handelOpenPasswordOld === "password" ?
                                    <i className="pi pi-eye-slash app__login-btn-icons" onClick={() => setHandelOpenPasswordOld('text')}  ></i> :
                                    <i className="pi pi-eye app__login-btn-icons" onClick={() => setHandelOpenPasswordOld('password')}  ></i>

                            }
                        </div>
                        {formik.touched.old_password && formik.errors.old_password ? (
                            <div className="text-red-500">{formik.errors.old_password}</div>
                        ) : null}
                    </div>
                    <div className="mt-4 w-full">
                        <label htmlFor="new_password" className="font-bold block mb-2">
                            {isLang === "en" ? 'New password' : 'كلمة المرور الجديدة'}
                        </label>
                        <div className="password_open">

                            <InputText
                                id="new_password"
                                name="new_password"
                                type={handelOpenPasswordNew}
                                value={formik.values.new_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full  p-inputtext-sm"
                                dir='ltr'

                            />
                            {
                                handelOpenPasswordNew === "password" ?
                                    <i className="pi pi-eye-slash app__login-btn-icons" onClick={() => setHandelOpenPasswordNew('text')}  ></i> :
                                    <i className="pi pi-eye app__login-btn-icons" onClick={() => setHandelOpenPasswordNew('password')}  ></i>

                            }
                        </div>
                        {formik.touched.new_password && formik.errors.new_password ? (
                            <div className="text-red-500">{formik.errors.new_password}</div>
                        ) : null}
                    </div>
                    <div className="mt-4 w-full">
                        <label htmlFor="password_confirmation" className="font-bold block mb-2">
                            {isLang === "en" ? 'Confirmation password' : 'تأكيد كلمة المرور'}
                        </label>
                        <div className="password_open">

                            <InputText
                                id="password_confirmation"
                                name="password_confirmation"
                                type={handelOpenPasswordConfirmation}
                                value={formik.values.password_confirmation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full  p-inputtext-sm"
                                dir='ltr'
                            />
                            {
                                handelOpenPasswordConfirmation === "password" ?
                                    <i className="pi pi-eye-slash app__login-btn-icons" onClick={() => setHandelOpenPasswordConfirmation('text')}  ></i> :
                                    <i className="pi pi-eye app__login-btn-icons" onClick={() => setHandelOpenPasswordConfirmation('password')}  ></i>

                            }
                        </div>
                        {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
                            <div className="text-red-500">{formik.errors.password_confirmation}</div>
                        ) : null}
                    </div>
                    <div className="group btn_gapAr flex gap-4">
                        <Button icon="pi pi-check" loading={loading} label={isLang == "en" ? 'Submit' : 'إرسال  '} type="submit" size='small' className='mt-3' />
                        <Button label={isLang == "en" ? 'Cancel' : 'إلغاء  '} type="reset" outlined size='small' onClick={() => setVisiblePassword(false)} className='mt-3' />
                    </div>
                </form>
            </Dialog>
        </>
    );
}

export default UpdatePassword;
