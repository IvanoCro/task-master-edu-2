import styles from './CornerIllustration.module.css';

const CornerIllustration = () => {
    return (
        <img
            className={styles.cornerImg}
            src={`${import.meta.env.BASE_URL}img/corner-illustration.png`}
            alt="Illustration"
        />
    );
}

export default CornerIllustration;