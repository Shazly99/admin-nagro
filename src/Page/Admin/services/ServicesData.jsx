import axios from 'axios';
import { LocalizationContext } from 'context/LangChange';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ServicesData = () => {
  let { isLang } = useContext(LocalizationContext);
  const dt = useRef(null);
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteWhyDialog, setDeleteWhyDialog] = useState(false);
  const [IdDeleteWhy, setIdDeleteWhy] = useState(null);
  const [Data, setData] = useState(null);
  const [deleteLoadind, setdeleteLoadind] = useState(false);

  // Add new Why
  const leftToolbarTemplate = () => {
    return (
      <div className="btn_gapAr_header flex flex-wrap gap-2">
        <Link to="/services/add">
          <Button label={isLang === "en" ? "New Services" : 'إضـــافة خدمة'} icon="pi pi-plus" size='small' />
        </Link>
      </div>
    );
  };

  // handel image in tabel
  const imageBodyTemplate = (rowData) => {
    return <div className="flex justify-content-center align-items-center">
      <img src={rowData.image} alt={'image Services'}  className="shadow-2" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'contain' }}  />
    </div>
  };


  // handel btn action in tabel 
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Link to={`/services/edit/${rowData.id}`}>
          <Button icon="pi pi-pencil" rounded outlined className="mr-2" />
        </Link>
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteWhy(rowData)} />
      </div>
    );
  };
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">{isLang === "en" ? "Search by title or description " : '   البحث حسب العنوان أو الوصف '} </h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder={isLang === "en" ? "Search..." : ' بحـــث... '} />
      </span>
    </div>
  );

  const fetchProfileData = async () => {
    const url = `${process.env.REACT_APP_API_URL}/services`;
    let data = await axios.get(url, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('tokenNagro'),
      }
    });
    setData(data?.data?.data?.data);
    console.log(data?.data?.data);
    if (data?.status === 200) {
      setTimeout(() => {
        // setIsLaoding(true)
      }, 200);
    }
  }
  useEffect(() => {
    fetchProfileData();
  }, [])


  // delete Why
  const confirmDeleteWhy = async (Why) => {
    setDeleteWhyDialog(true);
    setIdDeleteWhy(Why.id)
  };
  const deleteWhy = async () => {
    setdeleteLoadind(true)
    await axios.delete(`${process.env.REACT_APP_API_URL}/services/${IdDeleteWhy}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('tokenNagro'),
      }
    }).then(({ data }) => {
      console.log(data);
      if (data?.status) {
        toast.current.show({ severity: 'success', summary: 'Successful', detail: data?.message, life: 3000 });

        setTimeout(() => {
          setDeleteWhyDialog(false);
          fetchProfileData()
          setdeleteLoadind(false)
        }, 1000);
      }
    }).catch((error) => {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Data invalid', life: 3000 });
      setdeleteLoadind(false)
    })

  };
  const hideDeleteWhyDialog = () => setDeleteWhyDialog(false);
  const deleteWhyDialogFooter = (
    <div className='btn_gapAr'>
      <Button label={isLang == "en" ? 'No' : 'لا'} icon="pi pi-times" outlined onClick={hideDeleteWhyDialog} />
      <Button label={isLang == "en" ? 'Yes' : 'نــعم'} loading={deleteLoadind} icon="pi pi-check" severity="danger" onClick={deleteWhy} />
    </div>
  );
  return (
    <div className='mb-8'>
      <Toast ref={toast} position={isLang === "en" ? 'top-right' : 'top-left'} />
      <div className="card ">
        <Toolbar className="mb-4" left={leftToolbarTemplate}  ></Toolbar>

        <DataTable
          ref={dt}
          value={Data}
          dataKey="id"
          globalFilter={globalFilter}
          header={header}>
          <Column field="image" header={isLang === "en" ? "images" : 'الصور'} body={imageBodyTemplate}></Column>
          <Column field="short_title_en" header={isLang === "en" ? "short_title_en" : 'العنوان بالانجليزي'} style={{ minWidth: '6rem', textAlign: 'center' }}></Column>
          <Column field="short_title_ar" header={isLang === "en" ? "short_title_ar" : 'العنوان بالعربي '} style={{ minWidth: '6rem', textAlign: 'center' }}></Column>
          <Column field="short_description_en" header={isLang === "en" ? "short_description_en" : '  وصف بالانجليزي'} style={{ minWidth: '16rem', textAlign: 'center' }}></Column>
          <Column field="short_description_ar" header={isLang === "en" ? "short_description_ar" : 'وصف بالعربي'} style={{ minWidth: '16rem', textAlign: 'center' }}></Column>

          <Column field="title_en" header={isLang === "en" ? "title_en" : 'العنوان بالانجليزي'} style={{ minWidth: '6rem', textAlign: 'center' }}></Column>
          <Column field="title_ar" header={isLang === "en" ? "title_ar" : 'العنوان بالعربي '} style={{ minWidth: '6rem', textAlign: 'center' }}></Column>
          <Column field="description_en" header={isLang === "en" ? "description_en" : '  وصف بالانجليزي'} style={{ minWidth: '16rem', textAlign: 'center' }}></Column>
          <Column field="description_ar" header={isLang === "en" ? "description_ar" : 'وصف بالعربي'} style={{ minWidth: '16rem', textAlign: 'center' }}></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>
      </div>

      <Dialog dir={isLang == "en" ? 'ltr' : 'rtl'} visible={deleteWhyDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header={isLang == "en" ? 'Confirm Delete' : 'تأكيد الحذف'} modal footer={deleteWhyDialogFooter} onHide={hideDeleteWhyDialog}  >
        <div className="confirmation-content   flex justify-content-start align-items-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          <span>
            {isLang === "en" ? " Are you sure you want to delete   ?" : ' هل أنت متأكد أنك تريد حذف   ؟   '}

          </span>
        </div>
      </Dialog>
    </div>
  )
}


export default ServicesData