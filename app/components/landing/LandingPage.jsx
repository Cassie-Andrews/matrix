import Link from 'next/link';
import Image from 'next/image';
import styles from './LandingPage.module.css';

/* styles in global.css */

export default async function LandingPage() {  
  return (
    <>
      <div className={styles.contentContainer}>
        <h1 className={styles.heading}>Punch Card Study Companion</h1>
        <p className={styles.subheading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut labore et dolore magna aliqua.</p>
        
        <div className={styles.buttonContainer}>
          <button className={styles.primaryButton}>
            <Link href="/login">Log In</Link>
          </button>
          <button className={styles.primaryButton}>
            <Link href="/signup">Sign Up</Link>
          </button>
        </div>
        
        <div className={styles.contentContainer}>
          <h3 className={styles.keyFeaturesTitle}>Key Features</h3>
          <div className={styles.featuresContainer}>
            
            <div className={styles.feature}>
              <Image src="/feature1.png" alt="Feature 1" width={100} height={100} className={styles.featureIcon}/>
              <div className={styles.featureText}>
                <h4>Feature 1</h4>
                <p>Description for Feature 1</p>
              </div>
            </div>
            
            <div className={styles.feature}>
              <Image src="/feature2.png" alt="Feature 2" width={100} height={100} className={styles.featureIcon} />
              <div className={styles.featureText}>
                <h4>Feature 2</h4>
                <p>Description for Feature 2</p>
              </div>
            </div>
           
            <div className={styles.feature}>
              <Image src="/feature3.png" alt="Feature 3" width={100} height={100} className={styles.featureIcon} />
              <div className={styles.featureText}>
                <h4>Feature 3</h4>
                <p>Description for Feature 3</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}