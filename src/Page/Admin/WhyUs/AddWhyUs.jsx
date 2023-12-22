import axios from 'axios';
import Img from 'constants/Img';
import { LocalizationContext } from 'context/LangChange';
import { useFormik } from 'formik';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const AddWhyUs = () => {
  let { isLang } = useContext(LocalizationContext);
  const url = `${process.env.REACT_APP_API_URL}/why-us`;
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  let navigate = useNavigate()
  const items = [
    { label: <Link to={'/why-us'}>  {isLang === "en" ? "Why us" : "لماذا نحن"} </Link> },
    { label: <Link to={'/why-us/add'} className='bg-orange-100 p-2 border-round'>{isLang === "en" ? "Add Why us" : 'إضافه     لماذا نحن'}   </Link> }
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const [selectedIcon, setSelectedIcon] = useState(null);
  const handleIconSelect = (event) => {
    setSelectedIcon(event.target.files[0]);
  };
  const home = { icon: 'pi pi-home', url: '/' };
  const formik = useFormik({
    initialValues: {
      title_en: '',
      title_ar: '',
      description_en: '',
      description_ar: '',
      icon: null,
      image: null,
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {

        setLoading(true);
        let { data } = await axios.post(url, values, {
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('tokenNagro'),
          }
        });
        console.log(data);
        if (data?.status === 200) {
          toast.current.show({ severity: 'success', summary: 'Success', detail: data?.message, life: 3000 });
          setTimeout(() => {
            setLoading(false);
            navigate('/why-us')
            resetForm();
          }, 1000);
        } else if (data?.status === 400) {
          toast.current.show({ severity: 'warn', summary: 'Warn', detail: data?.message, life: 3000 });
          resetForm();
          setLoading(false);
        } else {
          toast.current.show({ severity: 'error', summary: 'Error', detail: data?.message, life: 3000 });
        }

      } catch ({ response }) {
        console.error(response.data.message);
        toast.current.show({ severity: 'error', summary: 'Error', detail: response.data.message, life: 3000 });
        setLoading(false);

      }
    }
  });
  useEffect(() => {
    formik.setFieldValue('image', selectedImage);
  }, [selectedImage]);

  useEffect(() => {
    formik.setFieldValue('icon', selectedIcon);
  }, [selectedIcon]);
  return (
    <div>
      <Toast ref={toast} position={isLang === "en" ? 'top-right' : 'top-left'} />

      <BreadCrumb model={items} home={home} />
      <form onSubmit={formik.handleSubmit} className='mt-6 w-11  m-auto my-8'>
   

        <div className="grid  mt-5  ">
          <div className='lg:col-6 md:col-12 sm:col-12 mt-2 flex justify-content-center align-items-center flex-column gap-4'>
            <div className="mt-3   flex justify-content-center m-auto " style={{ position: 'relative', marginBottom: '30px', width: 'fit-content' }}>
              {formik.values.image ? (
                <img
                  loading="lazy"
                  src={URL.createObjectURL(formik.values.image)}
                  alt={formik.values.image.name}
                  className=' rounded-circle mx-auto '
                  style={{ border: '6px solid #fff', width: '300px', height: '200' }}
                />
              ) :
                <>
                  <img
                    loading="lazy"
                    src={Img.DefaultImage}
                    alt={'default-image'}
                    className=' rounded-circle mx-auto '
                    style={{ border: '6px solid #fff', width: '300px', maxHeight: '172' }}
                  />
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
            <label htmlFor="image" className="font-bold text-xl block mb-2">{isLang==="en"?'Image':"صوره"}</label>
          </div>
          <div className='lg:col-6 md:col-12 sm:col-12 mt-2 flex justify-content-center align-items-center flex-column gap-4'>
            <div className="mt-3   flex justify-content-center m-auto " style={{ position: 'relative', marginBottom: '30px', width: 'fit-content' }}>
              {formik.values.icon ? (
                <img
                  loading="lazy"
                  src={URL.createObjectURL(formik.values.icon)}
                  alt={formik.values.icon.name}
                  className=' rounded-circle mx-auto '
                  style={{ border: '6px solid #fff', width: '300px', height: '200' }}
                />
              ) :
                <>
                  <img
                    loading="lazy"
                    src={Img.DefaultImage}
                    alt={'default-image'}
                    className=' rounded-circle mx-auto '
                    style={{ border: '6px solid #fff', width: '300px', maxHeight: '172' }}
                  />
                </>
              }
              <div style={{ position: 'absolute', right: '-5px', bottom: '0px' }}>
                <input
                  type="file"
                  id="file-input2"
                  accept="image/*"
                  onChange={handleIconSelect}
                  style={{ display: 'none' }}
                />
                <label htmlFor="file-input2" className="btn__porfile" style={{ pointerEvents: 'all' }}>
                  <i className='pi pi-image color-wight'></i>
                </label>
              </div>
            </div>
            <label htmlFor="image" className="font-bold text-xl block mb-2">{isLang==="en"?'Icon':"أيقونة"}</label>
            
          </div>  
        </div>
        <div className="grid  mt-5  ">
          <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
            <label htmlFor="title_en" className="font-bold block mb-2">   {isLang === "en" ? "Title en" : 'العنوان بالانجليزي'}      </label>
            <InputText name='title_en' id="title_en" type="text" className="w-full  p-inputtext-sm" onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
          </div>
          <div className="lg:col-6 md:col-12 sm:col-12   mt-2 input__Col" >
            <label htmlFor="title_ar" className="font-bold block mb-2">   {isLang === "en" ? "Title ar" : 'العنوان بالعربي '} </label>
            <InputText name='title_ar' id="title_ar" type="text" className="w-full  p-inputtext-sm" dir='rtl' onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
          </div>
        </div>

        <div className="grid  mt-2   ">
          <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
            <label htmlFor="description_en" className="font-bold block mb-2">   {isLang === "en" ? "Description en" : '  وصف بالانجليزي'}     </label>
            <Editor
              id="description_en"
              style={{ height: '320px' }}
              value={formik.values.description_en}
              dir='ltr'
              onTextChange={(e) => formik.setFieldValue("description_en", e.htmlValue)}
            />
          </div>
          <div className="lg:col-6 md:col-12 sm:col-12   mt-2 input__Col">
            <label htmlFor="description_ar" className="font-bold block mb-2">  {isLang === "en" ? "Description ar" : 'وصف بالعربي'}  </label>
            <Editor
              id="description_ar"
              style={{ height: '320px' }}
              dir='ltr'
              value={formik.values.description_ar}
              onTextChange={(e) => formik.setFieldValue("description_ar", e.htmlValue)}
            />
          </div>
        </div>

        <div className="btn_gapAr group flex justify-content-center gap-4 ">
          <Button icon="pi pi-check" loading={loading} label={isLang == "en" ? 'Submit' : 'إرسال  '} type="submit" size='small' className='mt-3' />
          <Link to={'/why-us'}>
            <Button label={isLang == "en" ? 'Cancel' : 'إلغاء  '} type="reset" outlined size='small' className='mt-3' />
          </Link>
        </div>
      </form>
    </div>
  )
}

export default AddWhyUs