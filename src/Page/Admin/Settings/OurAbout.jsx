
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { Skeleton } from 'primereact/skeleton';
import { useContext, useRef, useState } from 'react';
import axios from 'axios'; 
import { LocalizationContext } from 'context/LangChange';

const OurAbout = ({ isLaoding, data, section, setIsLaoding, toast }) => {
    let { isLang } = useContext(LocalizationContext);
    const [disabled, setDisabled] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)
    const urlUpdateData = `${process.env.REACT_APP_API_URL}/settings/update-data`;

    const about_title_en = useRef();
    const about_title_ar = useRef();
    const about_content_en = useRef();
    const about_content_ar = useRef();

    const submit = e => {
        e.preventDefault()
        editOurAbout({
            section: 'about_us',
            'settings[about_title_en]': about_title_en.current.value,
            'settings[about_title_ar]': about_title_ar.current.value,
            'settings[about_content_en]': about_content_en.current.value,
            'settings[about_content_ar]': about_content_ar.current.value,
        })
    }

    async function editOurAbout(OurAbout) {
        try {
            setBtnLoading(true);
            let { data } = await axios.post(urlUpdateData, OurAbout, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                    Authorization: 'Bearer ' + localStorage.getItem('tokenNagro'),
                },
            });
            if (data?.status === 200) {
                toast.current.show({ severity: 'success', summary: 'Success', detail: data?.message, life: 3000 });
                setTimeout(() => {
                    setBtnLoading(false);
                    setDisabled(true)
                }, 1000);
            } else if (data?.status === 400) {
                toast.current.show({ severity: 'warn', summary: 'Warn', detail: data?.message, life: 3000 });
                setBtnLoading(false);
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: data?.message, life: 3000 });
            }

        } catch ({ response }) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: response.data.message, life: 3000 });
            setBtnLoading(false);
        }
    }
    return (
        <div>
            <div className='grid btn_gapAr mt-5  w-11  m-auto'>
                <Button size='small' label={`${disabled ? `${isLang === "en" ? 'Edit' : '  تعديل'}` : `${isLang === "en" ? 'Show data' : '  عرض البيانات'}`}`} icon={`${disabled ? 'pi pi-file-edit' : 'pi pi-check-circle'}`} onClick={() => setDisabled(!disabled)} />
            </div>

            <form onSubmit={submit}>

                <div className="grid  mt-5  w-11  m-auto">
                    <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[about_title_en]" className="font-bold block mb-2">
                            {isLang === "en" ? 'about_title_en' : '  عنوان بالإنجليزية'}
                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ?
                            <InputText disabled={disabled}
                                id="settings[about_title_en]"
                                name='settings[about_title_en]'
                                ref={about_title_en}
                                defaultValue={data?.about_title_en}
                                type="text" className="w-full p-inputtext-sm"
                            />
                            : <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>
                    <div className="lg:col-6 md:col-12 sm:col-12   mt-2 input__Col">
                        {isLaoding ? <label htmlFor="settings[about_title_ar]" className="font-bold block mb-2">
                            {isLang === "en" ? 'about_title_ar' : '  عنوان بالعربي'}
                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ? <InputText disabled={disabled} id="settings[about_title_ar]"
                            name='settings[about_title_ar]'
                            ref={about_title_ar}
                            defaultValue={data?.about_title_ar}
                            dir='rtl' className="w-full p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}

                    </div>
                </div>

                <div className="grid    w-11  m-auto">
                    <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[about_content_en]" className="font-bold block mb-2">
                            {isLang === "en" ? 'about_content_en' : '  محتوي بالإنجليزية'}

                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ?
                            <InputTextarea disabled={disabled} id="settings[about_content_en]"
                                name='settings[about_content_en]'
                                ref={about_content_en}
                                defaultValue={data?.about_content_en}
                                rows={5} cols={30} type="text" className="w-full p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>

                    <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[about_content_ar]" className="font-bold block mb-2">
                            {isLang === "en" ? 'about_content_ar' : '  محتوي بالعربي'}

                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ?
                            <InputTextarea disabled={disabled} id="settings[about_content_ar]"
                                name='settings[about_content_ar]'
                                ref={about_content_ar}
                                defaultValue={data?.about_content_ar}
                                dir='rtl'
                                rows={5} cols={30} type="text" className="w-full p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>
                </div>



                {
                    !disabled &&
                    <div className="group  btn_gapAr flex justify-content-center gap-4 ">
                        <Button size='small' icon="pi pi-check" loading={btnLoading} label={isLang == "en" ? 'Submit' : 'إرسال  '} type="submit" className='mt-3' />

                    </div>
                }
            </form>

        </div>
    )
}

export default OurAbout
