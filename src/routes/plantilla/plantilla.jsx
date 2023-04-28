import styles from './styles.module.css';

export default function App({id, diaSemana, img, dificultad}=props) {
    return (
        <>
            <div className={styles.plantilla}>
                <p>{id}</p>
                <p>{diaSemana}</p>
                <p>{img}</p>
                <p>{dificultad}</p>
            </div>
        </>
    )
}