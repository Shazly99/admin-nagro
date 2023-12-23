
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { Skeleton } from 'primereact/skeleton';
import axios from 'axios';

import { LocalizationContext } from 'context/LangChange';
import { useContext, useRef, useState } from 'react';

const OurFooter = ({ isLaoding, data, section, setIsLaoding, toast }) => {
    let { isLang } = useContext(LocalizationContext);
    const urlUpdateData = `${process.env.REACT_APP_API_URL}/settings/update-data`;

    const [disabled, setDisabled] = useState(true)
    const [loadingBtn, setloadingBtn] = useState(false)

    const description_en = useRef();
    const description_ar = useRef();

    const city_1_en = useRef();
    const city_1_ar = useRef();
    const address_1_en = useRef();
    const address_1_ar = useRef();

    const city_2_en = useRef();
    const city_2_ar = useRef();
    const address_2_en = useRef();
    const address_2_ar = useRef();

    const phone = useRef();
    const whats = useRef();
    const email = useRef();
    const facebook = useRef();
    const twitter = useRef();
    const instagram = useRef();
    const youtube = useRef();
    const linked_in = useRef();

    const submit = e => {
        e.preventDefault()
        editFooter({
            section: 'footer',
            'settings[description_en]': description_en.current.value,
            'settings[description_ar]': description_ar.current.value,
            'settings[city_1_en]': city_1_en.current.value,
            'settings[city_1_ar]': city_1_ar.current.value,
            'settings[address_1_en]': address_1_en.current.value,
            'settings[address_1_ar]': address_1_ar.current.value,
            'settings[city_2_en]': city_2_en.current.value,
            'settings[city_2_ar]': city_2_ar.current.value,
            'settings[address_2_en]': address_2_en.current.value,
            'settings[address_2_ar]': address_2_ar.current.value,
            'settings[phone]': phone.current.value,
            'settings[whats]': whats.current.value,
            'settings[email]': email.current.value,
            'settings[facebook]': facebook.current.value,
            'settings[twitter]': twitter.current.value,
            'settings[instagram]': instagram.current.value,
            'settings[youtube]': youtube.current.value,
            'settings[linked_in]': linked_in.current.value,
        })
    }

    async function editFooter(Footer) {

        try {
            setloadingBtn(true);
            let { data } = await axios.post(urlUpdateData, Footer, {
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
        <div className='mb-8'>
            <div className='grid  btn_gapAr  mt-5  w-11  m-auto'>
                <Button label={`${disabled ? `${isLang === "en" ? 'Edit' : '  تعديل'}` : `${isLang === "en" ? 'Show data' : '  عرض البيانات'}`}`} icon={`${disabled ? 'pi pi-file-edit' : 'pi pi-check-circle'}`} onClick={() => setDisabled(!disabled)} />
            </div>

            <form onSubmit={submit}>

                <div className="grid  mt-3  w-11  m-auto">
                    <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[description_en]" className="font-bold block mb-2">
                            {isLang === "en" ? 'Description en' : '  محتوي بالإنجليزية'}

                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ?
                            <InputText disabled={disabled} id="settings[description_en]"
                                name='settings[description_en]'
                                ref={description_en}
                                defaultValue={data?.description_en}
                                type="text" className="w-full p-inputtext-sm" />
                            : <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>
                    <div className="lg:col-6 md:col-12 sm:col-12   mt-2 input__Col">
                        {isLaoding ? <label htmlFor="settings[description_ar]" className="font-bold block mb-2">
                            {isLang === "en" ? 'Description ar' : '     محتوي بالعربية'}
                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ? <InputText disabled={disabled} id="settings[description_ar]"
                            name='settings[description_ar]'
                            ref={description_ar}
                            defaultValue={data?.description_ar}
                            dir='rtl' type="text" className="w-full p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}

                    </div>
                </div>
                {/* Address_1 */}
                <div className="grid w-11  m-auto">
                    <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[address_1_en]" className="font-bold block mb-2">
                            {isLang === "en" ? 'Address_1 en' : '  عنوان الاول بالإنجليزية'}

                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ?
                            <InputTextarea disabled={disabled} id="settings[address_1_en]"
                                name='settings[address_1_en]'
                                ref={address_1_en}
                                defaultValue={data?.address_1_en}
                                type="text" className="w-full p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>

                    <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[address_1_ar]" className="font-bold block mb-2">
                            {isLang === "en" ? 'Address_1 ar' : '  عنوان الاول بالعربية'}
                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ?
                            <InputTextarea disabled={disabled} id="settings[address_1_ar]"
                                name='settings[address_1_ar]'
                                ref={address_1_ar}
                                defaultValue={data?.address_1_ar}
                                dir='rtl'
                                type="text" className="w-full p-inputtext-sm" /> :
                            <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>
                </div>
                {/* City_1 */}
                <div className="grid w-11  m-auto">
                    <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[city_1_en]" className="font-bold block mb-2">
                            {isLang === "en" ? 'City_1 en' : '  مدينة الاولي بالإنجليزية'}

                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ?
                            <InputTextarea disabled={disabled} id="settings[city_1_en]"
                                name='settings[city_1_en]'
                                ref={city_1_en}
                                defaultValue={data?.city_1_en}
                                type="text" className="w-full p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>

                    <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[city_1_ar]" className="font-bold block mb-2">
                            {isLang === "en" ? 'City_1 ar' : '  مديتة الاولي بالعربية'}
                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ?
                            <InputTextarea disabled={disabled} id="settings[city_1_ar]"
                                name='settings[city_1_ar]'
                                ref={city_1_ar}
                                defaultValue={data?.city_1_ar}
                                dir='rtl'
                                type="text" className="w-full p-inputtext-sm" /> :
                            <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>
                </div>
                {/* Address_2 */}
                <div className="grid w-11  m-auto">
                    <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[address_2_en]" className="font-bold block mb-2">
                            {isLang === "en" ? 'Address_2 en' : '  عنوان الثاني بالإنجليزية'}


                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ?
                            <InputTextarea disabled={disabled} id="settings[address_2_en]"
                                name='settings[address_2_en]'
                                ref={address_2_en}
                                defaultValue={data?.address_2_en}
                                type="text" className="w-full p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>

                    <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[address_2_ar]" className="font-bold block mb-2">
                            {isLang === "en" ? 'Address_2 ar' : '  عنوان الثاني بالعربية'}

                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ?
                            <InputTextarea disabled={disabled} id="settings[address_2_ar]"
                                name='settings[address_2_ar]'
                                ref={address_2_ar}
                                defaultValue={data?.address_2_ar}
                                dir='rtl'
                                type="text" className="w-full p-inputtext-sm" /> :
                            <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>
                </div>
                {/* city_2_ar */}
                <div className="grid w-11  m-auto">
                    <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[city_2_en]" className="font-bold block mb-2">
                            {isLang === "en" ? 'City_2 en' : '  مدينة الثانية بالإنجليزية'}

                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ?
                            <InputTextarea disabled={disabled} id="settings[city_2_en]"
                                name='settings[city_2_en]'
                                ref={city_2_en}
                                defaultValue={data?.city_2_en}
                                type="text" className="w-full p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>

                    <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[city_2_ar]" className="font-bold block mb-2">
                            {isLang === "en" ? 'City_2 ar' : '  مديتة الثانية بالعربية'}

                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ?
                            <InputTextarea disabled={disabled} id="settings[city_2_ar]"
                                name='settings[city_2_ar]'
                                ref={city_2_ar}
                                defaultValue={data?.city_2_ar}
                                dir='rtl'
                                type="text" className="w-full p-inputtext-sm" /> :
                            <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>
                </div>
                {/* phone,whatsapp,email */}
                <div className="grid w-11  m-auto">
                    <div className="lg:col-4 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[phone]" className="font-bold block mb-2">
                            {isLang === "en" ? 'Phone' : '  رقم الهاتف  '}
                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ? <InputText disabled={disabled}
                            name='settings[phone]'
                            ref={phone}
                            dir='ltr'
                            defaultValue={data?.phone}
                            id="settings[phone]"
                            type="text" className="w-full p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>
                    <div className="lg:col-4 md:col-12 sm:col-12   mt-2 input__Col">

                        {isLaoding ? <label htmlFor="settings[whats]" className="font-bold block mb-2">
                            {isLang === "en" ? 'Whatsapp' : '  رقم واتساب  '}

                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ? <InputText type="int" name='settings[whats]'
                            disabled={disabled} id="settings[whats]" dir='ltr'
                            ref={whats}
                            defaultValue={data?.whats}
                            className="w-full p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}

                    </div>
                    <div className="lg:col-4 md:col-12 sm:col-12   mt-2 input__Col">
                        {isLaoding ? <label htmlFor="settings[email]" className="font-bold block mb-2">
                            {isLang === "en" ? 'Email' : '   بريد إلكتورني    '}

                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ? <InputText disabled={disabled} name='settings[email]'
                            ref={email}
                            defaultValue={data?.email}
                            type="int" className="w-full p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>

                </div>

                {/* Facebook ,twitter ,youtube*/}
                <div className="grid w-11  m-auto">
                    <div className="lg:col-4 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[facebook]" className="font-bold block mb-2">
                            {isLang === "en" ? 'Facebook' : 'فيس بوك'}
                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ? <InputText disabled={disabled}
                            name='settings[facebook]'
                            ref={facebook}
                            dir='ltr'
                            defaultValue={data?.facebook}
                            id="settings[facebook]"
                            type="text" className="w-full p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>
                    <div className="lg:col-4 md:col-12 sm:col-12   mt-2 input__Col">
                        {isLaoding ? <label htmlFor="settings[twitter]" className="font-bold block mb-2">
                            {isLang === "en" ? 'Twitter' : 'تويتر        '}

                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ? <InputText disabled={disabled} id="settings[twitter]"
                            name='settings[twitter]'
                            ref={twitter}
                            defaultValue={data?.twitter}
                            type="text" className="w-full p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}

                    </div>
                    <div className="lg:col-4 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[youtube]" className="font-bold block mb-2">
                            {isLang === "en" ? 'Youtube' : 'يوتيوب  '}

                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ?
                            <InputText disabled={disabled} id="settings[youtube]"
                                name='settings[youtube]'
                                ref={youtube}
                                defaultValue={data?.youtube}
                                type="text" className="w-full p-inputtext-sm" />
                            : <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>
                </div>

                {/* instagram , LinkedIn */}
                <div className="grid w-11  m-auto">
                    <div className="lg:col-4 md:col-12 sm:col-12   mt-2 input__Col">
                        {isLaoding ? <label htmlFor="settings[instagram]" className="font-bold block mb-2">
                            {isLang === "en" ? 'Instagram' : 'إنستجرام   '}
                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ? <InputText disabled={disabled} id="settings[instagram]"
                            name='settings[instagram]'
                            ref={instagram}
                            defaultValue={data?.instagram} type="instagram" className="w-full p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}

                    </div>
                    <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                        {isLaoding ? <label htmlFor="settings[linked_in]" className="font-bold block mb-2">
                            {isLang === "en" ? 'LinkedIn' : 'لينكد إن   '}

                        </label> : <Skeleton width="5rem" className="mb-3"></Skeleton>}
                        {isLaoding ?
                            <InputText disabled={disabled} id="settings[linked_in]"
                                name='settings[linked_in]'
                                ref={linked_in}
                                defaultValue={data?.linked_in}
                                type="text" className="w-full p-inputtext-sm" />
                            : <Skeleton width="100%" height="3rem"></Skeleton>}
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

export default OurFooter
