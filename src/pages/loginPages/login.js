import NavBar from '../fixed/navBar';
import Title from '../fixed/title';
import style from './login.module.css';

function Login(){
    return (
        <>
            <div className={style.page_wrapper}>
                <Title/>
                <main className={style.container}>

                </main>
                <NavBar/>

            </div>
        </>
    )
}

export default Login;