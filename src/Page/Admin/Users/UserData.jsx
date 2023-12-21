
import axios from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LocalizationContext } from 'context/LangChange';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { useTranslation } from 'react-i18next';


const UserData = () => {

  let { isLang } = useContext(LocalizationContext);
  let { t } = useTranslation()

  const dt = useRef(null);
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteusersDialog, setDeleteusersDialog] = useState(false);
  const [IdDeleteusers, setIdDeleteusers] = useState(null);
  const [Data, setData] = useState(null);
  const [deleteLoadind, setdeleteLoadind] = useState(false); 

  // Add new users
  const leftToolbarTemplate = () => {
    return (
      <div className="btn_gapAr flex flex-wrap gap-2 p-button-main">
        <Link to="/users/add"> 
          <Button severity="warning" label={isLang === "en" ? "New users" : 'إضافة    مستخدم '} icon="pi pi-plus" size='small' />
        </Link>
      </div>
    );
  }; 
  
  // handel btn action in tabel 
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2 justify-content-center align-content-center">
        <Link to={`/users/edit/${rowData.IDUser}`}>
          <Button icon="pi pi-pencil" rounded outlined className="mr-2" />
        </Link>
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteusers(rowData)} />
      </div>
    );
  };
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">{isLang === "en" ? "Search by name or mobile number or email " : 'بحث بالاسم او رقم جوال او بريد الالكتروني'} </h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder={isLang === "en" ? "Search..." : ' بحـــث... '} />
      </span>
    </div>
  );

  const fetchProfileData = async () => {
    setData([])
    const url = `${process.env.REACT_APP_API_URL}/users`;
    let data = await axios.post(url, {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('tokenNagro'),
        },
      })
    setData(data?.data?.Response?.Users);
  }
  useEffect(() => {
    fetchProfileData();
  }, [])


  // delete users
  const confirmDeleteusers = async (users) => {
    setDeleteusersDialog(true);
    setIdDeleteusers(users?.IDUser)
  };
  const deleteusers = async (rowData) => {
    setdeleteLoadind(true)
    await axios.post(`${process.env.REACT_APP_API_URL}/users/status`, {
      IDUser: IdDeleteusers,
      UserStatus: 'DELETED'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('tokenNagro'),
      },
    }).then(({ data }) => {
      console.log(data);
      if (data?.Success) {
        toast.current.show({ severity: 'success', summary: 'Successful', detail: data?.ApiMsg, life: 3000 });

        setTimeout(() => {
          setDeleteusersDialog(false);
          fetchProfileData()
          setdeleteLoadind(false)
        }, 1000);
      }
    }).catch((error) => {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Data invalid', life: 3000 });
      setdeleteLoadind(false)
    })

  };
  const hideDeleteusersDialog = () => setDeleteusersDialog(false);
  const deleteusersDialogFooter = (
    <div className='btn_gapAr'>
      <Button label={isLang == "en" ? 'No' : 'لا'} icon="pi pi-times" outlined onClick={hideDeleteusersDialog} />
      <Button label={isLang == "en" ? 'Yes' : 'نــعم'} loading={deleteLoadind} icon="pi pi-check" severity="danger" onClick={deleteusers} />
    </div>
  );
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [editingRow, setEditingRow] = useState(null);

  const statusOptions = [
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' },
    { label: 'Pending', value: 'PENDING' }, 
  ];

  const onStatusChange =async (rowData, e) => {  
    setEditingRow(null);  
    await axios.post(`${process.env.REACT_APP_API_URL}/users/status`, {
      IDUser: rowData?.IDUser,
      UserStatus: e.value
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('tokenNagro'),
      },
    }).then(({ data }) => {
      console.log(data);
      if (data?.Success) {
        toast.current.show({ severity: 'success', summary: 'Successful', detail: data?.ApiMsg, life: 3000 });
        fetchProfileData() 
      }
    }).catch((error) => {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Data invalid', life: 3000 });
      
    })
  };

  const statusBodyTemplate = (rowData) => {
    return editingRow === rowData?.IDUser ? (
      <Dropdown
        value={selectedStatus}
        options={statusOptions}
        onChange={(e) => onStatusChange(rowData, e)}
        placeholder={`${rowData?.UserStatus}`}
        className="p-inputtext-sm "
      />
    ) : (
      <Tag
        value={rowData.UserStatus}
        severity={getSeverity(rowData.UserStatus)}
        onClick={() => setEditingRow(rowData?.IDUser)}
      />
    );
  };
  
  const getSeverity = (status) => {
    switch (status) {
      case 'INACTIVE':
        return 'danger';

      case 'ACTIVE':
        return 'success';

      case 'PENDING':
        return 'warning';

      case '':
        return 'info';
    }
  };

  return (
    <div>
      <Toast ref={toast} position={isLang === "en" ? 'top-right' : 'top-left'} />
      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate}  ></Toolbar>

        <DataTable
          ref={dt}
          value={Data}
          dataKey="id"
          globalFilter={globalFilter}
          paginator rows={10}   
          header={header}>
          <Column field="UserName" header={t('name')} style={{ minWidth: '12rem', textAlign: 'center' }}></Column>
          <Column field="UserEmail" header={t('email')}  style={{ minWidth: '12rem', textAlign: 'center' }}></Column>
          <Column field="UserPhone" header={t('phone')}  style={{ minWidth: '12rem', textAlign: 'center' }}></Column>
          <Column field="UserStatus" header={t('status')}  body={statusBodyTemplate} style={{ minWidth: '12rem', textAlign: 'center' }}></Column>
          <Column field="RoleName" header={t('role')}  style={{ minWidth: '12rem', textAlign: 'center' }}></Column>
          {/* <Column field="UserRank" header={isLang === "en" ? "User Rank" : 'العنوان بالعربي '} style={{ minWidth: '12rem', textAlign: 'center' }}></Column> */}
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>

      </div>

      <Dialog dir={isLang == "en" ? 'ltr' : 'rtl'} visible={deleteusersDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header={isLang == "en" ? 'Confirm Delete' : 'تأكيد الحذف'} modal footer={deleteusersDialogFooter} onHide={hideDeleteusersDialog}>
        <div className="confirmation-content   flex justify-content-start  gap-3 align-items-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          <span>
            {isLang === "en" ? " Are you sure you want to delete   ?" : ' هل أنت متأكد أنك تريد حذف   ؟   '}
          </span>
        </div>
      </Dialog>
    </div>
  );
};

export default UserData;
