import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "../lib/session";
import { redirect } from "next/navigation";
import styles from './settings.module.css';
import AccordionMenu from "../components/settings/accordionMenu";


export default async function SettingsPage({ isOpen, onClose}) {
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, sessionOptions);
    
if (!session.isLoggedIn) {
    redirect("/login");
}

return (
    <>
        <div className={styles.container}>
            <h1 className={styles.title}>Settings</h1>
            <AccordionMenu />
        </div>
    </>
)
}