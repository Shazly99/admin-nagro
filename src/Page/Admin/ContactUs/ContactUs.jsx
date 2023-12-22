
import axios from 'axios';
import { LocalizationContext } from 'context/LangChange';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import { Toast } from 'primereact/toast';
import { useContext, useEffect, useRef, useState } from 'react';
import Mail from './Mail';

const ContactUs = () => {
    let { isLang } = useContext(LocalizationContext);

    const dt = useRef(null);
    const toast = useRef(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [deleteContactusDialog, setDeleteContactusDialog] = useState(false);
    const [IdDeleteContactus, setIdDeleteContactus] = useState(null);
    const [Data, setData] = useState(null);
    const [totalPage, settotalPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // State to keep track of the current page
    const [rows, setRows] = useState(1);

    // handel btn action in tabel 
    const actionBodyTemplate = (rowData) => {
        return (
            <div className='btn_gapAr'>
                <Button icon="pi pi-send" size='small' label={isLang==="en"?'send mail':'أرسل رسالة'} outlined onClick={() => confirmDeleteContactus(rowData)} />
            </div>
        );
    };
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">{isLang === "en" ? " Search by name or email or phone or reason or message " : " البحث بالاسم أو البريد الإلكتروني أو الهاتف أو السبب أو الرسالة"} </h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder={isLang === "en" ? "Search..." : ' بحـــث... '} />
            </span>
        </div>
    );

    const fetchProfileData = async () => {
        const url = `${process.env.REACT_APP_API_URL}/contact-us`;
        let data = await axios.get(url, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('tokenNagro'),
            }
        }); 
        setData(data?.data?.data?.data);

        settotalPage(data?.data?.data?.total / data?.data?.data?.perPage);
         
        if (data?.status === 200) {
            setTimeout(() => {
                // setIsLaoding(true)
            }, 200);
        }
    }
    useEffect(() => {
        fetchProfileData(currentPage);
    }, [currentPage])


    // Modal Send mail Contactus
    const confirmDeleteContactus = async (Contactus) => {
        setDeleteContactusDialog(true);
        setIdDeleteContactus(Contactus.id)
    };

    const onPageChange = (event) => {
        // setCurrentPage(event.first + 1);
        // setRows(event.rows);

        const newPage = event.first / event.rows + 1;
        console.log(newPage);
        setCurrentPage(newPage);
        setRows(event.rows);
    };
    return (
        <div>
            <Toast ref={toast} position={isLang==="en"?'top-right':'top-left'} />
            <div className="card">
                <DataTable
                    ref={dt}
                    value={Data}
                    dataKey="id"
                    globalFilter={globalFilter}
                    header={header} 

                >
                    <Column field="name" header={isLang==="en"?'name':'الاسم'}   style={{ minWidth: '11rem', textAlign: 'center' }} ></Column>
                    <Column field="email" header={isLang==="en"?'email':'الاسم'}  style={{ minWidth: '11rem', textAlign: 'center' }}></Column>
                    <Column field="phone" header={isLang==="en"?'phone':'رقم الهاتف'}   style={{ minWidth: '11rem', textAlign: 'center' }}></Column>
                    <Column field="reason"  header={isLang==="en"?'reason':'السبب'}  style={{ minWidth: '11rem', textAlign: 'center' }}></Column>
                    <Column field="message"  header={isLang==="en"?'message':'  الرساله'}  style={{ minWidth: '11rem', textAlign: 'center' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

                </DataTable>
                <div className="card">
                    {/* <Paginator  first={currentPage} rows={rows} totalRecords={totalPage * rows} onPageChange={onPageChange} /> */}
                    <Paginator first={(currentPage - 1) * rows} rows={rows} totalRecords={totalPage * rows} onPageChange={onPageChange} />

                </div>
            </div>

            <Mail isLang={isLang} confirmDeleteContactus={confirmDeleteContactus} toast={toast} IdDeleteContactus={IdDeleteContactus} deleteContactusDialog={deleteContactusDialog} setDeleteContactusDialog={setDeleteContactusDialog} />
        </div>
    )
}


export default ContactUs 