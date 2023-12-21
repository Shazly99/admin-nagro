import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';

const ServicesLoading = ({ Data, globalFilter, header }) => {
    const numRows = 10; // عدد الصفوف
    const numColumns = 5; // عدد الأعمدة

    return (
        <div className="card">
            <DataTable
                value={Data}
                dataKey="id"
                globalFilter={globalFilter}
                header={header}
                className="p-datatable-loading"
                emptyMessage={null} // تعطيل رسالة "No results found"
            >
                {Array.from({ length: numColumns }).map((_, columnIndex) => (
                    <Column
                        key={`column-${columnIndex}`}
                        field={`field-${columnIndex}`}
                        header={`Header ${columnIndex+1}`}
                        body={() =>
                            <Skeleton 
                                width="100%"
                                height="30px"
                                style={{ marginBottom: '10px' }}
                            />
                        }
                    />
                ))}
            </DataTable>
        </div>
    );
}

export default ServicesLoading;
