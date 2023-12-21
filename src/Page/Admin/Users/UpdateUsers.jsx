import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LocalizationContext } from 'context/LangChange';
import { useFormik } from 'formik';
import axios from 'axios';
import { BreadCrumb } from 'primereact/breadcrumb';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FetchApi } from 'context/FetchApi';
import { Dropdown } from 'primereact/dropdown';
import { useTranslation } from 'react-i18next';

const UpdateUsers = () => {
  let { id } = useParams()
  let { t } = useTranslation()
  const toast = useRef(null);
  let navigate = useNavigate();
  let { isLang } = useContext(LocalizationContext);
  const urlUpdateData = `${process.env.REACT_APP_API_URL}/users/edit`;
  let { roles } = useContext(FetchApi);
  const [data, setData] = useState([])
  const [handelOpenPasswordNew, setHandelOpenPasswordNew] = useState('password');

  async function getdata() {

    const url = `${process.env.REACT_APP_API_URL}/users/profile/${id}`;
    let { data } = await axios.get(url, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('tokenNagro'),
      }
    })
    if (data?.Success) {

      setData(data?.Response)
    }
    console.log(data?.Response);

  }

  const [loading, setLoading] = useState(false);

  const items = [
    { label: <Link to={'/users'}>{isLang === "en" ? "users" : 'المستخدمين'}  </Link> },
    { label: <Link to={`/users/edit/${id}`} className='bg-orange-100 p-2 border-round'>   {isLang === "en" ? "Update users  " : '  تعديل مستخدم  '}</Link> }
  ];
  let { fetchBrandsAjex, brandsAjex, branchesAjex, fetchbranchesAjex } = useContext(FetchApi);

  const home = { icon: 'pi pi-home', url: '/' };
  const formik = useFormik({
    initialValues: {
      IDUser: id || '',
      UserName: data?.UserName || '',
      UserPhone: data?.UserPhone || '',
      UserPhoneFlag: data?.UserPhoneFlag || '',
      UserEmail: data?.UserEmail || '',
      IDBrand: data?.IDBrand || '',
      UserLanguage: data?.UserLanguage || '',
      IDRole: data?.IDRole || '',
      UserPassword: '',
      IDBranch: '',
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        setLoading(true);

        let { data } = await axios.post(urlUpdateData, values,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('tokenNagro'),
            },
          })

        if (data?.Success) {
          toast.current.show({ severity: 'success', summary: 'Success', detail: data?.ApiMsg, life: 3000 });
          setTimeout(() => {
            setLoading(false);
            navigate('/users')
            resetForm();
          }, 1000);
        } else if (data?.status === 400) {
          toast.current.show({ severity: 'warn', summary: 'Warn', detail: data?.ApiMsg, life: 3000 });
          resetForm();
          setLoading(false);
        } else {
          toast.current.show({ severity: 'error', summary: 'Error', detail: data?.ApiMsg, life: 3000 });
        }

      } catch ({ response }) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: response.data.message, life: 3000 });
        setLoading(false);

      }
    }
  });


  useEffect(() => {
    getdata()
  }, [id]);
  useEffect(() => {

    fetchBrandsAjex()


  }, [isLang])
  useEffect(() => {
    formik.setValues({
      IDUser: id || '',
      UserName: data?.UserName || '',
      UserPhone: data?.UserPhone || '',
      UserPhoneFlag: data?.UserPhoneFlag || '',
      UserEmail: data?.UserEmail || '',
      IDBrand: data?.IDBrand || '',
      UserLanguage: data?.UserLanguage || '',
      IDRole: data?.IDRole || '',
      IDBranch: data?.IDBranch || '',

    });
    fetchbranchesAjex(data?.IDBrand)
  }, [data, formik.setValues]);

  return (
    <>
      <Toast ref={toast} position={isLang === "en" ? 'top-right' : 'top-left'} />

      <BreadCrumb model={items} home={home} />
      <form onSubmit={formik.handleSubmit} className='mt-6 w-11  m-auto'>
        <div className="grid  mt-5  ">
          <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
            <label htmlFor="UserName" className="font-bold block mb-2">  {isLang === "en" ? "UserName" : 'الاسم'}    </label>

            <InputText
              name='UserName'
              id="UserName"
              type='text'
              className="w-full  p-inputtext-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.UserName}
            />
          </div>
          <div className="lg:col-6 md:col-12 sm:col-12   mt-2 input__Col" >
            <label htmlFor="UserEmail" className="font-bold block mb-2">{t('email')}   </label>
            <InputText value={formik.values.UserEmail} name='UserEmail' id="UserEmail" keyfilter="text" className="w-full  p-inputtext-sm" onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
          </div>
        </div>

        <div className="grid mt-3">
          <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
            <label htmlFor="UserPhone" className="font-bold block mb-2">{t('phone')}   </label>
            <InputText
              name='UserPhone'
              id="UserPhone"
              type='tel'
              className="w-full  p-inputtext-sm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.UserPhone}
            />
          </div>
          <div className="lg:col-6 md:col-12 sm:col-12   input__Col ">
            <label htmlFor="UserPassword" className="font-bold block mb-2">
              {isLang === "en" ? 'New password' : 'كلمة المرور الجديدة'}
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

          <div className="lg:col-6 md:col-12 sm:col-12   mt-2 input__Col" >
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
              <div className="lg:col-6 md:col-12 sm:col-12   mt-2">
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
              <div className="lg:col-6 md:col-12 sm:col-12   mt-2 input__Col" >
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
                  placeholder={isLang === "en" ? 'Select a Branch' : 'اختر '}
                  className="w-full p-inputtext-sm"
                />
              </div>
            </>
          }


        </div>




        <div className="btn_gapAr group flex justify-content-center gap-4 ">
          <Button severity="warning" raised icon="pi pi-check" loading={loading} label={t('submit')} type="submit" size='small' className='mt-3' />
          <Link to={'/users'}>
            <Button severity="warning" raised label={t('cancel')} type="reset" outlined size='small' className='mt-3' />
          </Link>
        </div>
      </form>

    </>
  )
}

export default UpdateUsers
