import axios from "axios";
 
// Validate From handel Login
export const handelLogin = async (values, setLoadEmail, navigate) => {
    const url = `${process.env.REACT_APP_API_URL}/auth/login`;
    setLoadEmail(true);
    let { data } = await axios.post(url, values).catch((err) => {
        console.log(err);
        setLoadEmail(false);
    })
    if (data.status === 200) {
        localStorage.setItem('tokenNagro', data?.data?.token)
        localStorage.setItem('UserName', data?.data?.name)
        localStorage.setItem('UserEmail', data?.data?.email)
        localStorage.setItem('UserPhoto', data?.data?.image)
        setTimeout(() => {
            console.log('res');
            setLoadEmail(false); 
            navigate('/')
        }, 3000);
        return { severity: 'success', summary: 'Success', detail: 'Your login has been successful' };

    } else if (data.status === 401) {
        setLoadEmail(false);
        return { severity: 'error', summary: 'Error', detail: data?.message };

    }

};

export default { 
    handelLogin
};
