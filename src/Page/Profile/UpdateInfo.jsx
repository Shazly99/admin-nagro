import Img from "constants/Img";
import { FetchApi } from 'context/FetchApi';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useContext, useEffect, useRef, useState } from 'react';

import axios from 'axios';

const UpdateInfo = ({ isLang, visible, setVisible, data, fetchProfileData }) => {
    let { fetchProfile } = useContext(FetchApi);

    const toast = useRef(null);
    const [loading, setLoading] = useState(false);

    const url = `${process.env.REACT_APP_API_URL}/auth/update-personal-data`;
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
        formik.setFieldValue('image', event.target.files[0]);
    };
    const formik = useFormik({
        initialValues: {
            name: data?.name || '',
            email: data?.email || '',
            image: selectedImage,
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                console.log(selectedImage);

                setLoading(true);
                let { data } = await axios.post(url,values, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('tokenNagro'),
                    },
                });
                if (data?.status === 200) {
                    toast.current.show({ severity: 'success', summary: 'Success', detail: data?.message, life: 3000 });
                    setTimeout(() => {
                        setVisible(false)
                        resetForm();
                        fetchProfileData()
                        setLoading(false);
                        fetchProfile()
                    }, 1000);
                } else if (data?.status === 400) {
                    toast.current.show({ severity: 'warn', summary: 'Warn', detail: data?.message, life: 3000 });
                    setLoading(false);
                    resetForm();
                } else {
                    setLoading(false);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: data?.message, life: 3000 });
                }

            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        }
    });
    useEffect(() => {
        formik.setFieldValue('image', selectedImage);
    }, [selectedImage]);

    useEffect(() => {
        formik.setValues({
            name: data?.name || '',
            email: data?.email || '',
        }); 
    }, [data, formik.setValues]);
    return (
        <>
            <Toast ref={toast} position={isLang === "en" ? 'top-right' : 'top-left'} />

            <Dialog header={isLang === "en" ? 'Update Info' : 'تحديث البيانات'} visible={visible} className='lg:w-5 md:w-8 sm:w-11' onHide={() => setVisible(false)} dir={isLang === "en" ? 'ltr' : 'rtl'} >
                <form onSubmit={formik.handleSubmit} className='flex justify-content-center align-items-center flex-column'>
                    <div className="mt-3 " style={{ position: 'relative', marginBottom: '30px' }}>
                        {formik.values.image ? (
                            <img
                                loading="lazy"
                                src={URL.createObjectURL(formik.values.image)}
                                // alt={formik.values.image.name}
                                className=' rounded-circle mx-auto '
                                style={{ border: '6px solid #fff', width: '190px', height: '172' }}
                            />
                        ) :
                            <> 
                                {
                                    data?.image ?
                                        <img
                                            loading="lazy"
                                            src={data?.image}
                                            // alt={formik.values.image.name}
                                            className=' rounded-circle mx-auto '
                                            style={{ border: '6px solid #fff', width: '190px', maxHeight: '172' }}
                                        /> :
                                        <img src={Img.DefaultImage} alt="" srcset="" />
                                }

                            </>
                        }
                        <div style={{ position: 'absolute', right: '-5px', bottom: '0px' }}>
                            <input
                                type="file"
                                id="file-input"
                                accept="image/*"
                                onChange={handleImageSelect}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="file-input" className="btn__porfile" style={{ pointerEvents: 'all' }}>
                                <i className='pi pi-image color-wight'></i>
                            </label>
                        </div>
                    </div>
                    <div className="mt-2 w-full">
                        <label htmlFor="name" className="font-bold block mb-2">
                            {isLang === "en" ? 'Name' : 'الاســـم'}

                        </label>

                        <InputText
                            id="name"
                            name="name"
                            value={formik.values.name || data?.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full  p-inputtext-sm"
                        />
                    </div>
                    <div className="mt-4 w-full">
                        <label htmlFor="email" className="font-bold block mb-2">
                            {isLang === "en" ? 'Email' : 'بريد الالكتروني'}

                        </label>
                        <InputText
                            id="email"
                            name="email"
                            value={formik.values.email || data?.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full  p-inputtext-sm"
                        />
                    </div>
                    <div className="btn_gapAr group flex gap-4">
                        <Button icon="pi pi-check" loading={loading} label={isLang == "en" ? 'Submit' : 'إرسال  '} type="submit" size='small' className='mt-3' />
                        <Button label={isLang == "en" ? 'Cancel' : 'إلغاء  '} type="reset" outlined size='small' onClick={() => setVisible(false)} className='mt-3' />
                    </div>
                </form>
            </Dialog>
        </>
    );
};

export default UpdateInfo;
