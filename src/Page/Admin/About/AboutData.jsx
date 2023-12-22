
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

const AboutData = () => {
    let { isLang } = useContext(LocalizationContext);
    const dt = useRef(null);
    const toast = useRef(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [deleteAboutDialog, setDeleteAboutDialog] = useState(false);
    const [IdDeleteAbout, setIdDeleteAbout] = useState(null);
    const [Data, setData] = useState(null);
    const [deleteLoadind, setdeleteLoadind] = useState(false);

    // Add new About
    const leftToolbarTemplate = () => {
        return (
            <div className="   btn_gapAr_header flex flex-wrap gap-2">
                <Link to="/about/add">
                    <Button label={isLang === "en" ? "New About" : '  أضف نبذة عنا '} icon="pi pi-plus" size='small' />
                </Link>
            </div>
        );
    };
    const handelDescriptionAr = (rowData) => {
        return <div className="flex justify-content-center align-items-center">
            <div className='div_ul0' dangerouslySetInnerHTML={{ __html: rowData?.description_ar }} />
        </div>
    };


    const handelDescriptionEn = (rowData) => {
        return <div className="flex justify-content-center align-items-center">
            <div className='div_ul' dangerouslySetInnerHTML={{ __html: rowData?.description_ar }} />
        </div>
    };
    // handel image in tabel
    const imageBodyTemplate = (rowData) => {
        return <div className="flex justify-content-center align-items-center">
            <img src={rowData.image} alt={rowData.image} className="shadow-2 border-round" style={{ width: '150px' }} />
        </div>
    };

    // handel btn action in tabel 
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Link to={`/about/edit/${rowData.id}`}>
                    <Button icon="pi pi-pencil" rounded outlined className="mr-2" />
                </Link>
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteAbout(rowData)} />
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
        const url = `${process.env.REACT_APP_API_URL}/about-us`;
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


    // delete About
    const confirmDeleteAbout = async (About) => {
        setDeleteAboutDialog(true);
        setIdDeleteAbout(About.id)
    };
    const deleteAbout = async () => {
        setdeleteLoadind(true)
        await axios.delete(`${process.env.REACT_APP_API_URL}/about-us/${IdDeleteAbout}`, {
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
                    setDeleteAboutDialog(false);
                    fetchProfileData()
                    setdeleteLoadind(false)
                }, 1000);
            }
        }).catch((error) => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Data invalid', life: 3000 });
            setdeleteLoadind(false)
        })

    };
    const hideDeleteAboutDialog = () => setDeleteAboutDialog(false);
    const deleteAboutDialogFooter = (
        <div className='btn_gapAr'>
            <Button label={isLang == "en" ? 'No' : 'لا'} icon="pi pi-times" outlined onClick={hideDeleteAboutDialog} />
            <Button label={isLang == "en" ? 'Yes' : 'نــعم'} loading={deleteLoadind} icon="pi pi-check" severity="danger" onClick={deleteAbout} />
        </div>
    );
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
                    header={header}>
                    <Column field="image" header={isLang === "en" ? "images" : 'الصور'} body={imageBodyTemplate}></Column>
                    <Column field="title_en" header={isLang === "en" ? "title_en" : 'العنوان بالانجليزي'} style={{ minWidth: '6rem', textAlign: 'center' }}></Column>
                    <Column field="title_ar" header={isLang === "en" ? "title_ar" : 'العنوان بالعربي '} style={{ minWidth: '6rem', textAlign: 'center' }}></Column>
                    <Column field="description_en" body={handelDescriptionEn} header={isLang === "en" ? "Description en" : '  وصف بالانجليزي'} style={{ maxWidth: '16rem', textAlign: 'center' }}></Column>
                    <Column field="description_ar" body={handelDescriptionAr} header={isLang === "en" ? "Description ar" : 'وصف بالعربي'} style={{ maxWidth: '16rem', textAlign: 'center' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog dir={isLang == "en" ? 'ltr' : 'rtl'} visible={deleteAboutDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header={isLang == "en" ? 'Confirm Delete' : 'تأكيد الحذف'} modal footer={deleteAboutDialogFooter} onHide={hideDeleteAboutDialog}  >
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

export default AboutData
