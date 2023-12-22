import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Skeleton } from 'primereact/skeleton';
import axios from 'axios';

const Mail = ({ isLang, deleteContactusDialog, setDeleteContactusDialog, toast, IdDeleteContactus }) => {
    const [isLaoding, setIsLaoding] = useState(false);
    const [isLaodingSubmit, setIsLaodingSubmit] = useState(false);
    const [data, setData] = useState(false);
    const hideDeleteContactusDialog = () => setDeleteContactusDialog(false);


    const show = async () => {

        const url = `${process.env.REACT_APP_API_URL}/contact-us/${IdDeleteContactus}`;
        let data = await axios.get(url, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('tokenNagro'),
            }
        });
        setData(data?.data?.data);
        if (data?.status === 200) {
            setTimeout(() => {
                setIsLaoding(true)
            }, 200);
        }
    }
    useEffect(() => {
        if (IdDeleteContactus) {
            show()
        }
    }, [IdDeleteContactus])
    const formik = useFormik({
        initialValues: {
            name: data?.name || '',
            email: data?.email || '',
            body: data?.body || '',
        },
        onSubmit: async (values, { resetForm }) => {
            console.log(values);
            try {
                setIsLaodingSubmit(true);
                const urlMail = `${process.env.REACT_APP_API_URL}/contact-us/send-mail`;

                let { data } = await axios.post(urlMail, values, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        // 'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('tokenNagro'),
                    }
                });
                if (data?.status === 200) {
                    toast.current.show({ severity: 'success', summary: 'Success', detail: data?.message, life: 3000 });
                    setTimeout(() => {
                        setIsLaodingSubmit(false);
                        hideDeleteContactusDialog()
                        resetForm();
                    }, 2000);
                } else if (data?.status === 400) {
                    toast.current.show({ severity: 'warn', summary: 'Warn', detail: data?.message, life: 3000 });
                    setIsLaodingSubmit(false);
                    resetForm();
                }
            } catch (error) {
                console.error(error);
            }
        }
    });

    useEffect(() => {
        formik.setValues({
            name: data?.name || '',
            email: data?.email || '',
            body: data?.body || '',
        });
    }, [data, formik.setValues]);
    return (
        <div>
            <Dialog
                dir={isLang == "en" ? 'ltr' : 'rtl'}
                visible={deleteContactusDialog}
                style={{ width: '32rem' }}
              onHide={hideDeleteContactusDialog}  
                breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header={isLang == "en" ? '  Send mail' : '  أرسل رسالة '}
                modal  >
                <form onSubmit={formik.handleSubmit} className="confirmation-content   flex justify-content-start flex-column align-items-center">

                    <div className="mt-2 w-full">
                        <label htmlFor="name" className="font-bold block mb-2">
                            {isLang == "en" ? 'Name' : 'الأســم'}
                        </label>
                        {
                            isLaoding ?
                                <InputText
                                    id="name"
                                    name="name"
                                    type={'text'}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full"
                                /> : <Skeleton width="100%" height="3rem"></Skeleton>
                        }
                    </div>
                    <div className="mt-4 w-full">
                        <label htmlFor="email" className="font-bold block mb-2">
                            {isLang == "en" ? 'Email' : 'بريد إلكتروني'}

                        </label>
                        {
                            isLaoding ?
                                <InputText
                                    id="email"
                                    name="email"
                                    type={'email'}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full"
                                />
                                : <Skeleton width="100%" height="3rem"></Skeleton>
                        }
                    </div>
                    <div className="mt-4 w-full">
                        <label htmlFor="body" className="font-bold block mb-2">

                            {isLang == "en" ? 'Message' : 'رسالة  '}
                        </label>
                        {
                            isLaoding ?
                                <InputTextarea
                                    id="body"
                                    name="body"
                                    type={'text'}
                                    value={formik.values.body}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full"
                                />
                                : <Skeleton width="100%" height="3rem"></Skeleton>
                        }
                    </div>
                    <div className="btn_gapAr group flex justify-content-end gap-2 ">
                        <Button label={isLang == "en" ? 'Cancel' : 'إلغاء  '} type="reset" outlined onClick={() => setDeleteContactusDialog(false)} size='sm' className='mt-3' />
                        <Button icon="pi pi-check" loading={isLaodingSubmit} label={isLang == "en" ? 'Submit' : 'إرسال  '} type="submit" size='sm' className='mt-3' />
                    </div>
                </form>
            </Dialog>
        </div>
    )
}

export default Mail
