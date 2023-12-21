import { Skeleton } from 'primereact/skeleton'
import React from 'react'

const LoadingUpdate = () => {
    return (
        <div className='card app__profile__picture my-5'>
            <div className="card flex justify-content-center gap-2 ">
                <div className="relative">
                    <Skeleton size="250px"></Skeleton> 
                </div>
            </div>
            <div className="grid  mt-5  w-11  m-auto">
                <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                    <Skeleton width="5rem" className="mb-3"></Skeleton>
                    <Skeleton width="100%" height="3rem"></Skeleton>
                </div>
                <div className="lg:col-6 md:col-12 sm:col-12   mt-2 input__Col">
                    <Skeleton width="5rem" className="mb-3"></Skeleton>
                    <Skeleton width="100%" height="3rem"></Skeleton> 
                </div>
            </div>

            <div className="grid  mt-5  w-11  m-auto">
                <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                    <Skeleton width="5rem" className="mb-3"></Skeleton>
                    <Skeleton width="100%" height="3rem"></Skeleton>
                </div>
                <div className="lg:col-6 md:col-12 sm:col-12   mt-2 input__Col">
                    <Skeleton width="5rem" className="mb-3"></Skeleton>
                    <Skeleton width="100%" height="3rem"></Skeleton> 
                </div>
            </div>
        </div>
    )
}

export default LoadingUpdate
