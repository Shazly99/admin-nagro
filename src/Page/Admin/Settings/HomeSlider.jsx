import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import { useContext, useState } from 'react';
import axios from 'axios';
import { LocalizationContext } from 'context/LangChange';

const HomeSlider = ({ isLoading, data, section, setIsLoading, toast }) => {
  let { isLang } = useContext(LocalizationContext);
  const [disabled, setDisabled] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const urlUpdateData = `${process.env.REACT_APP_API_URL}/settings/update-data`;
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('section', 'home_slider');
    formData.append('settings[home_slider_file]', selectedImage);

    try {
      setBtnLoading(true);
      const response = await axios.post(urlUpdateData, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + localStorage.getItem('tokenNagro'),
        },
      });

      if (response.data?.status === 200) {
        toast.current.show({ severity: 'success', summary: 'Success', detail: response.data?.message, life: 3000 });
        setTimeout(() => {
          setBtnLoading(false);
          setDisabled(true);
        }, 1000);
      } else if (response.data?.status === 400) {
        toast.current.show({ severity: 'warn', summary: 'Warn', detail: response.data?.message, life: 3000 });
        setBtnLoading(false);
      } else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: response.data?.message, life: 3000 });
      }

    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: error.response?.data?.message || 'An error occurred.', life: 3000 });
      setBtnLoading(false);
    }
  };

  return (
    <div>
      <div className='grid btn_gapAr mt-5  w-11  m-auto'>
        <Button size='small' label={`${disabled ? `${isLang === "en" ? 'Edit' : '  تعديل'}` : `${isLang === "en" ? 'Show data' : '  عرض البيانات'}`}`} icon={`${disabled ? 'pi pi-file-edit' : 'pi pi-check-circle'}`} onClick={() => setDisabled(!disabled)} />
      </div>

      <form onSubmit={submit}>
        <div className="grid flex justify-content-center align-items-center  mt-5  w-11  m-auto">
          <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col flex justify-content-center align-items-center">
            {/*           {isLoading ? (
              <label htmlFor="settings[about_title_en]" className="font-bold block mb-2">
                {isLang === "en" ? 'Slider Home' : '  عنوان بالإنجليزية'}
              </label>
            ) : (
              <Skeleton width="5rem" className="mb-3"></Skeleton>
            )} */}


            <div className="  " style={{ position: 'relative', marginBottom: '30px', width: 'fit-content' }}>
              {selectedImage ? (
                <img
                  loading="lazy"
                  src={URL.createObjectURL(selectedImage)}
                  alt={'image slider'}
                  className='w-100 rounded-circle mx-auto '
                  width={500}
                  style={{ border: '6px solid #fff' }}
                />
              ) : (
                <>
                  <img
                    loading="lazy"
                    src={`https://naqro.rightclick.com.sa/public/images/home/${data?.home_slider_file}`}
                    alt={'default-image'}
                    className='w-100 rounded-circle mx-auto '
                    width={500}

                    style={{ border: '6px solid #fff' }}
                  />
                </>
              )}
              {
                !disabled &&
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
              }
            </div>
          </div>
        </div>

        {!disabled && (
          <div className="group  btn_gapAr flex justify-content-center gap-4 ">
            <Button size='small' icon="pi pi-check" loading={btnLoading} label={isLang == "en" ? 'Submit' : 'إرسال  '} type="submit" className='mt-3' />
          </div>
        )}
      </form>
    </div>
  );
};

export default HomeSlider;
