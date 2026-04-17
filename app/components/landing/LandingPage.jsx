import Link from 'next/link';
import Image from 'next/image';
import styles from './LandingPage.module.css';

/* styles in global.css */

export default async function LandingPage() {  
  return (
    <>
      <div className={styles.contentContainer}>
        
        {/* HERO CONTAINER */}
        <div className={styles.heroContainer}>
          <h1 className={styles.heading}>Punch Card Study Companion</h1>
          <p className={styles.subheading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut labore et dolore magna aliqua.</p>
          {/* BUTTONS */}
          <div className={styles.buttonContainer}>
            {/* Sign up button */}
            <a
              className={styles.secondaryButton}
              href="/signup"
            >
              Sign Up
            </a> 
            {/* Log in button */}
            <a 
              className={styles.primaryButton}
              href="/login"
            >
              Log In  
            </a>
          </div>
        </div>
        
        
        {/* KEY FEATURES */}
        <div className={styles.featuresContainer}>
          <h3 className={styles.keyFeaturesTitle}>Key Features</h3>
          <div className={styles.features}>
            {/* PUNCH CARDS */}
            <div className={styles.feature}>
              <Image src="/ICON_active_check_box.png" alt="Feature 3" width={80} height={80} className={styles.featureIcon} />
              <div className={styles.featureText}>
                <h4>Punch Cards</h4>
                <p>Track your progress and build positive study habits with intuitive punch cards.</p>
              </div>
            </div>
            
            {/* TIMER */}
            <div className={styles.feature}>
              <Image src="/ICON_active_timer.png" alt="Feature 2" width={80} height={80} className={styles.featureIcon} />
              <div className={styles.featureText}>
                <h4>Focus Timer</h4>
                <p>Stay focused and manage your study time effectively with our built-in timer.</p>
              </div>
            </div>

            {/* COMING SOON */}
            <div className={styles.feature}>
              <Image src="/ICON_active_add_reaction.png" alt="Feature 3" width={80} height={80} className={styles.featureIcon} />
              <div className={styles.featureText}>
                <h4>Coming Soon</h4>
                <p>Additional features coming soon! Let us know what you would like to see.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}