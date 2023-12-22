
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

const Contributors = () => {
  let { isLang } = useContext(LocalizationContext);
  const dt = useRef(null);
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteContributorsDialog, setDeleteContributorsDialog] = useState(false);
  const [IdDeleteContributors, setIdDeleteContributors] = useState(null);
  const [Data, setData] = useState(null);
  const [deleteLoadind, setdeleteLoadind] = useState(false);

  // Add new Contributors
  const leftToolbarTemplate = () => {
    return (
      <div className="   btn_gapAr_header flex flex-wrap gap-2">
        <Link to="/contributors/add">
          <Button label={isLang === "en" ? "New contributor" : '  مساهم جديد'} icon="pi pi-plus" size='small' />
        </Link>
      </div>
    );
  };

  // handel image in tabel
  const imageBodyTemplate = (rowData) => {
    return <div className="flex justify-content-center align-items-center">
      <img src={rowData.image} alt={rowData.image} className="shadow-2 border-round" style={{ width: '150px' }} />
    </div>
  };


  const handelDescriptionAr = (rowData) => {
    return <div className="flex justify-content-center align-items-center"> 
      <div className='div_ul' dangerouslySetInnerHTML={{ __html: rowData?.description_ar }} />
    </div>
  };


  const handelDescriptionEn = (rowData) => {
    return <div className="flex justify-content-center align-items-center"> 
      <div className='div_ul' dangerouslySetInnerHTML={{ __html: rowData?.description_ar }} />
    </div>
  };

  // handel btn action in tabel 
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Link to={`/contributors/edit/${rowData.id}`}>
          <Button icon="pi pi-pencil" rounded outlined className="mr-2" />
        </Link>
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteContributors(rowData)} />
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
    const url = `${process.env.REACT_APP_API_URL}/contributors`;
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


  // delete Contributors
  const confirmDeleteContributors = async (Contributors) => {
    setDeleteContributorsDialog(true);
    setIdDeleteContributors(Contributors.id)
  };
  const deleteContributors = async () => {
    setdeleteLoadind(true)
    await axios.delete(`${process.env.REACT_APP_API_URL}/contributors/${IdDeleteContributors}`, {
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
          setDeleteContributorsDialog(false);
          fetchProfileData()
          setdeleteLoadind(false)
        }, 1000);
      }
    }).catch((error) => {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Data invalid', life: 3000 });
      setdeleteLoadind(false)
    })

  };
  const hideDeleteContributorsDialog = () => setDeleteContributorsDialog(false);
  const deleteContributorsDialogFooter = (
    <div className='btn_gapAr'>
      <Button label={isLang == "en" ? 'No' : 'لا'} icon="pi pi-times" outlined onClick={hideDeleteContributorsDialog} />
      <Button label={isLang == "en" ? 'Yes' : 'نــعم'} loading={deleteLoadind} icon="pi pi-check" severity="danger" onClick={deleteContributors} />
    </div>
  );
  return (
    <div className='mb-8'>
      <Toast ref={toast} position={isLang === "en" ? 'top-right' : 'top-left'} />
      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate}  ></Toolbar>

        <DataTable
          ref={dt}
          value={Data}
          dataKey="id" 
          size='small'
          columnResizeMode="expand" resizableColumns showGridlines
          globalFilter={globalFilter} 
          header={header}>
          <Column field="image" header={isLang === "en" ? "Images" : 'الصور'} body={imageBodyTemplate}></Column>
          <Column field="name" header={isLang === "en" ? "Name" : '  الاســـم'} style={{ minWidth: '6rem', textAlign: 'center' }}></Column>
          <Column field="experience" header={isLang === "en" ? "Experience" : 'خبرة'} style={{ minWidth: '6rem', textAlign: 'center' }}></Column>
          <Column field="description_en" body={handelDescriptionEn}  header={isLang === "en" ? "Description en" : '  وصف بالانجليزي'} style={{ minWidth: '16rem', textAlign: 'center' }}></Column>
          <Column field="description_ar" body={handelDescriptionAr} header={isLang === "en" ? "Description ar" : 'وصف بالعربي'} style={{ minWidth: '16rem', textAlign: 'center' }}></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>
      </div>

      <Dialog dir={isLang == "en" ? 'ltr' : 'rtl'} visible={deleteContributorsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header={isLang == "en" ? 'Confirm Delete' : 'تأكيد الحذف'} modal footer={deleteContributorsDialogFooter} onHide={hideDeleteContributorsDialog}  >
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


export default Contributors