import Image from "next/image";
import styles from "./page.module.css";
import UserTable from "../../components/UserTable";

export default function Home() {
  return (
    <div className={styles.screen}>
      <h1>Users</h1>
      <UserTable />
    </div>
  );
}
