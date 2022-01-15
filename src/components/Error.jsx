const Error = ({children}) => {
    return (
        <div>
            <div className='bg-red-800 text-white text-center font-bold uppercase p-3 mt-2 rounded-md'>
                <p>{children}</p>
            </div>
        </div>
    )
}

export default Error
