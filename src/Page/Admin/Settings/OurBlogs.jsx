import { LocalizationContext } from 'context/LangChange';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { Skeleton } from 'primereact/skeleton';
import { useContext, useRef, useState } from 'react';
import axios from 'axios';

const OurBlogs = ({ isLaoding, data, toast }) => {

    let { isLang } = useContext(LocalizationContext);

    const urlUpdateData = `${process.env.REACT_APP_API_URL}/settings/update-data`;
    const blogs_title_en = useRef();
    const blogs_title_ar = useRef();
    const blogs_content_en = useRef();
    const blogs_content_ar = useRef();

    const [disabled, setDisabled] = useState(true)
    const [loadingBtn, setloadingBtn] = useState(false)

    const submit = e => {
        e.preventDefault()
        editOurblogs({
            section: 'blogs',
            'settings[blogs_title_en]': blogs_title_en.current.value,
            'settings[blogs_title_ar]': blogs_title_ar.current.value, 
            'settings[blogs_content_en]': blogs_content_en.current.value,
            'settings[blogs_content_ar]': blogs_content_ar.current.value
        })
    }

    async function editOurblogs(Ourblogs) {
        console.log(Ourblogs);
        try {
            setloadingBtn(true);
            let { data } = await axios.post(urlUpdateData, Ourblogs, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + localStorage.getItem('tokenNagro'),
                },
            });
            if (data?.status === 200) {
                toast.current.show({ severity: 'success', summary: 'Success', detail: data?.message, life: 3000 });
                setTimeout(() => {
                    setloadingBtn(false);
                    setDisabled(true)
                }, 1000);
            } else if (data?.status === 400) {
                toast.current.show({ severity: 'warn', summary: 'Warn', detail: data?.message, life: 3000 });
                setloadingBtn(false);
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: data?.message, life: 3000 });
            }

        } catch ({ response }) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: response.data.message, life: 3000 });
            setloadingBtn(false);
        }
    }

    return (
        <div>
            <div className='grid  btn_gapAr mt-5  w-11  m-auto'>
                <Button label={`${disabled ? `${isLang === "en" ? 'Edit' : '  تعديل'}` : `${isLang === "en" ? 'Show data' : '  عرض البيانات'}`}`} size='small' icon={`${disabled ? 'pi pi-file-edit' : 'pi pi-check-circle'}`} onClick={() => setDisabled(!disabled)} />
            </div>

            <form onSubmit={submit}>

                <div className="grid  mt-5  w-11  m-auto">
                    <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ?
                            <label htmlFor="settings[blogs_title_en]" className="font-bold block mb-2">

                                {isLang === "en" ? 'blogs_title_en' : ' عنوان مقاله بالإنجليزية'}

                            </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ?
                            <InputText
                                disabled={disabled}
                                keyfilter="text"
                                name="settings[blogs_title_en]"
                                id="settings[blogs_title_en]"
                                ref={blogs_title_en}
                                defaultValue={data?.blogs_title_en}
                                className="w-full p-inputtext-sm"
                            />
                            : <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>
                    <div className="lg:col-6 md:col-12 sm:col-12   mt-2 input__Col">
                        {isLaoding ? <label htmlFor="settings[blogs_title_ar]" className="font-bold block mb-2">
                            {isLang === "en" ? 'blogs_title_ar' : ' عنوان مقاله بالعربية'}

                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ? <InputText
                            disabled={disabled}
                            id="settings[blogs_title_ar]"
                            name='settings[blogs_title_ar]'
                            ref={blogs_title_ar}
                            defaultValue={data?.blogs_title_ar}
                            dir='rtl' keyfilter="email" className="w-full p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}

                    </div>
                </div>

                <div className="grid    w-11  m-auto">
                    <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[blogs_content_en]" className="font-bold block mb-2">
                            {isLang === "en" ? 'blogs_content_en' : '  محتوي بالإنجليزية'}
                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ?
                            <InputTextarea
                                disabled={disabled}
                                id="settings[blogs_content_en]"
                                name='settings[blogs_content_en]'
                                ref={blogs_content_en}
                                defaultValue={data?.blogs_content_en}
                                rows={5} cols={30} keyfilter="text" className="w-full p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>

                    <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[blogs_content_ar]" className="font-bold block mb-2">
                            {isLang === "en" ? 'blogs_content_ar' : '  محتوي بالعربية'}

                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ?
                            <InputTextarea disabled={disabled} id="settings[blogs_content_ar]"
                                name='settings[blogs_content_ar]'
                                ref={blogs_content_ar}
                                defaultValue={data?.blogs_content_ar}
                                dir='rtl'
                                rows={5} cols={30} keyfilter="text" className="w-full p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>
                </div>

                {
                    !disabled &&
                    <div className="group btn_gapAr flex justify-content-center gap-4 ">
                        <Button icon="pi pi-check" loading={loadingBtn} label={isLang == "en" ? 'Submit' : 'إرسال  '} type="submit" size='small' className='mt-3' />
                    </div>
                }
            </form>

        </div>
    )

}

export default OurBlogs

