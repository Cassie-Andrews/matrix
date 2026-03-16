import styles from "./PunchCard.module.css";

export default function PunchCard({ punches, maxPunches, isFull }) {
    return (
        <div className={styles.card}>
            <div className={styles.grid}>
                {Array.from({ length: maxPunches }).map((_, i) => (
                    <div
                        key={i}
                        className={`${styles.punch} ${
                            i < punches ? styles.filled : ""
                        }`}
                    >
                        {i < punches ? "" : ""}
                    </div>
                ))}
            </div>

            <p className={styles.counter}>
                Punches used: {punches} / {maxPunches}
            </p>

            {isFull && (
                <p className={styles.full}>You did it!</p>
            )}

        </div>
    )
}