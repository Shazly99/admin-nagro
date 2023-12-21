import axios from 'axios';
import { useFormik } from 'formik';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FetchApi } from 'context/FetchApi';
import { LocalizationContext } from 'context/LangChange';
import { useTranslation } from 'react-i18next';


const AddUsers = () => {
  let { isLang } = useContext(LocalizationContext);
  let { t } = useTranslation()

  let { roles, fetchBrandsAjex, brandsAjex, branchesAjex, fetchbranchesAjex } = useContext(FetchApi);
  const [handelOpenPasswordNew, setHandelOpenPasswordNew] = useState('password');
  const url = `${process.env.REACT_APP_API_URL}/users/add`;
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  let navigate = useNavigate()

  const items = [
    { label: <Link to={'/users'}>{isLang === "en" ? "َusers  " : 'المستخدمين'}  </Link> },
    { label: <Link to={'/users/add'} className='bg-orange-100 p-2 border-round'>  {isLang === "en" ? "New users  " : 'إضافة مستخدم'} </Link> }
  ];

  const home = { icon: 'pi pi-home', url: '/' };
  const formik = useFormik({
    initialValues: {
      UserName: '',
      UserPhone: '',
      UserPhoneFlag: '+02',
      UserPassword: '',
      UserEmail: '',
      IDBrand: 1,
      UserLanguage: 'en',
      IDBrand: '',
      IDRole: '',
      IDBranch: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        let { data } = await axios.post(url, values,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('tokenNagro'),
            },
          })
        console.log(data);
        if (data?.Success) {
          toast.current.show({ severity: 'success', summary: 'Success', detail: data?.ApiMsg, life: 3000 });
          setTimeout(() => {
            setLoading(false);
            navigate('/users')
            resetForm();
          }, 1000);
        } else if (!data?.Success) {
          toast.current.show({ severity: 'info', summary: 'Warn', detail: data?.ApiMsg, life: 3000 });
          setLoading(false);
        } else if (data?.status === 400) {
          toast.current.show({ severity: 'warn', summary: 'Warn', detail: data?.ApiMsg, life: 3000 });

          setLoading(false);
        } else {
          toast.current.show({ severity: 'error', summary: 'Error', detail: data?.ApiMsg, life: 3000 });
        }

      } catch ({ response }) {
        console.error(response.data.message);
        toast.current.show({ severity: 'error', summary: 'Error', detail: response.data.message, life: 3000 });
        setLoading(false);
      }
    }
  });
  useEffect(() => { 
    fetchBrandsAjex()
    return () => { 
      fetchBrandsAjex() 
    }
  }, [isLang])
  return (
    <>
      <div>
        <Toast ref={toast} position={isLang === "en" ? 'top-right' : 'top-left'} />

        <BreadCrumb model={items} home={home} />
        <form onSubmit={formik.handleSubmit} className='mt-6 w-11  m-auto'>

          <div className="grid  mt-5  ">
            <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
              <label htmlFor="UserName" className="font-bold block mb-2">  {isLang === "en" ? "UserName" : 'الاسم'}    </label>
              <InputText name='UserName' id="UserName" type='text' className="w-full  p-inputtext-sm" onChange={formik.handleChange}
                onBlur={formik.handleBlur} />
            </div>
            <div className="lg:col-6 md:col-12 sm:col-12   mt-2 input__Col" >
              <label htmlFor="UserEmail" className="font-bold block mb-2">{t('email')}   </label>

              <InputText name='UserEmail' id="UserEmail" type='email' className="w-full  p-inputtext-sm" onChange={formik.handleChange}
                onBlur={formik.handleBlur} />
            </div>
          </div>

          <div className="grid  mt-3  ">
            <div className="lg:col-6 md:col-12 sm:col-12   input__Col ">
              <label htmlFor="UserPhone" className="font-bold block mb-2">{t('phone')}   </label>
              <InputText name='UserPhone' id="UserPhone" type='tel' className="w-full  p-inputtext-sm" onChange={formik.handleChange}
                onBlur={formik.handleBlur} />
            </div>
            <div className="lg:col-6 md:col-12 sm:col-12   input__Col ">
              <label htmlFor="UserPassword" className="font-bold block mb-2">
                {isLang === "en" ? ' password' : 'كلمة المرور الجديدة'}
              </label>
              <div className="password_open">
                <InputText
                  id="UserPassword"
                  name="UserPassword"
                  type={handelOpenPasswordNew}
                  value={formik.values.UserPassword}
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
              {formik.touched.UserPassword && formik.errors.UserPassword ? (
                <div className="text-red-500">{formik.errors.UserPassword}</div>
              ) : null}
            </div>


            <div className="lg:col-6 md:col-12 sm:col-12      ">
              <label htmlFor="IDRole" className="font-bold block mb-2">{isLang === "en" ? "Role " : 'فئة فرعية'}</label>
              <Dropdown
                options={roles?.map(item => ({
                  name: item.RoleName,
                  value: item.IDRole,
                }))}
                id="IDRole"
                name="IDRole"
                optionLabel="name"
                optionValue="value"
                value={formik.values.IDRole} // Add this line 
                onChange={(e) => formik.setFieldValue("IDRole", e.value)}
                onBlur={formik.handleBlur}
                placeholder={isLang === "en" ? 'Select a IDRole' : 'اختر '}
                className="w-full p-inputtext-sm"
              />
            </div>
            {
              formik?.values?.IDRole === 2 &&
              <>
                <div className="lg:col-6 md:col-12 sm:col-12   ">
                  <label htmlFor="IDBrand" className="font-bold block mb-2"> {t('brand_name')}</label>
                  <Dropdown
                    options={brandsAjex?.map(item => ({
                      name: item.BrandName,
                      value: item.IDBrand,
                    }))}
                    id="IDBrand"
                    name="IDBrand"
                    optionLabel="name"
                    optionValue="value"
                    value={formik.values.IDBrand} // Add this line 
                    onChange={(e) => {
                      formik.setFieldValue("IDBrand", e.value)
                      fetchbranchesAjex(e.value)
                    }}
                    onBlur={formik.handleBlur}
                    placeholder={t('status_placeholder')}
                    className="w-full p-inputtext-sm"
                  />
                </div>
                <div className="lg:col-6 md:col-12 sm:col-12      ">
                  <label htmlFor="IDBranch" className="font-bold block mb-2">{isLang === "en" ? "Branch " : 'الفروع'}</label>

                  <Dropdown
                    options={branchesAjex?.map(item => ({
                      name: item.BranchAddress,
                      value: item.IDBranch,
                    }))}
                    id="IDBranch"
                    name="IDBranch"
                    optionLabel="name"
                    optionValue="value"
                    value={formik.values.IDBranch} // Add this line 
                    onChange={(e) => formik.setFieldValue("IDBranch", e.value)}
                    onBlur={formik.handleBlur}
                    placeholder={isLang === "en" ? 'Select a IDBranch' : 'اختر '}
                    className="w-full p-inputtext-sm"
                  />
                </div> 
              </>
            }



          </div>




          <div className="btn_gapAr p-button-main  group flex justify-content-center gap-4 ">
            <Button severity="warning" icon="pi pi-check" loading={loading} label={t('submit')} size='small' className='mt-3' />
            <Link to={'/users'}>
              <Button severity="warning" label={t('cancel')} type="reset" outlined size='small' className='mt-3' />
            </Link>
          </div>
        </form >
      </div >
    </>
  )
}

export default AddUsers